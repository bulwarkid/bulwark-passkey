package main

import (
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	"crypto/x509"
	"crypto/x509/pkix"
	"encoding/json"
	"math/big"
	"time"

	"github.com/bulwarkid/virtual-fido/virtual_fido"
	vfido "github.com/bulwarkid/virtual-fido/virtual_fido"
)

type Client struct {
	vaultType             string
	email                 string
	lastUpdated           time.Time
	vault                 *vfido.IdentityVault
	deletedSources [][]byte
	certificateAuthority  *x509.Certificate
	certPrivateKey        *ecdsa.PrivateKey
	encryptionKey         []byte
	authenticationCounter uint32

	pinHash []byte
	pinRetries int32
	pinKeyAgreement *virtual_fido.ECDHKey
	pinToken []byte
}

func newClient() *Client {
	return &Client{
		pinToken: randomBytes(16),
		pinRetries: 8,
		pinHash: nil,
		pinKeyAgreement: virtual_fido.GenerateECDHKey(),
		deletedSources: make([][]byte,0),
		vault: vfido.NewIdentityVault(),
	}
}

func (client *Client) NewCredentialSource(relyingParty vfido.PublicKeyCredentialRpEntity, user vfido.PublicKeyCrendentialUserEntity) *vfido.CredentialSource {
	id := client.vault.NewIdentity(relyingParty, user)
	client.lastUpdated = now()
	client.save()
	return id
}

func (client *Client) GetAssertionSource(relyingPartyID string, allowList []vfido.PublicKeyCredentialDescriptor) *vfido.CredentialSource {
	sources := client.vault.GetMatchingCredentialSources(relyingPartyID, allowList)
	if len(sources) == 0 {
		return nil
	}

	// TODO: Allow user to choose credential source
	credentialSource := sources[0]
	credentialSource.SignatureCounter++
	client.lastUpdated = now()
	client.save()
	return credentialSource
}

func (client *Client) SealingEncryptionKey() []byte {
	return client.encryptionKey
}

func (client *Client) NewPrivateKey() *ecdsa.PrivateKey {
	privateKey, err := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
	checkErr(err, "Could not generate private key")
	return privateKey
}

func (client *Client) NewAuthenticationCounterId() uint32 {
	num := client.authenticationCounter
	client.authenticationCounter++
	client.lastUpdated = now()
	return num
}

func (client *Client) CreateAttestationCertificiate(privateKey *ecdsa.PrivateKey) []byte {
	// TODO: Fill in fields like SerialNumber and SubjectKeyIdentifier
	templateCert := &x509.Certificate{
		SerialNumber: big.NewInt(0),
		Subject: pkix.Name{
			Organization: []string{"Self-Signed Virtual FIDO"},
			Country:      []string{"US"},
		},
		NotBefore:   now(),
		NotAfter:    now().AddDate(10, 0, 0),
		ExtKeyUsage: []x509.ExtKeyUsage{x509.ExtKeyUsageClientAuth, x509.ExtKeyUsageServerAuth},
		KeyUsage:    x509.KeyUsageDigitalSignature,
	}
	certBytes, err := x509.CreateCertificate(rand.Reader, templateCert, client.certificateAuthority, &privateKey.PublicKey, client.certPrivateKey)
	checkErr(err, "Could not generate attestation certificate")
	return certBytes
}

func (client *Client) ApproveAccountCreation(relyingParty string) bool {
	return approveClientAction("fido_make_credential", relyingParty, "")
}

func (client *Client) ApproveAccountLogin(credentialSource *vfido.CredentialSource) bool {
	return approveClientAction("fido_get_assertion", credentialSource.RelyingParty.Name, credentialSource.User.DisplayName)
}

func (client *Client) ApproveU2FRegistration(keyHandle *vfido.KeyHandle) bool {
	return approveClientAction("u2f_register", "", "")
}

func (client *Client) ApproveU2FAuthentication(keyHandle *vfido.KeyHandle) bool {
	return approveClientAction("u2f_authenticate", "", "")
}

func (client *Client) PINHash() []byte {
	return client.pinHash
}

func (client *Client) SetPINHash(pin []byte) {
	client.pinHash = pin
}

func (client *Client) PINRetries() int32 {
	return client.pinRetries
}

func (client *Client) SetPINRetries(retries int32) {
	client.pinRetries = retries
}

func (client *Client) PINKeyAgreement() *virtual_fido.ECDHKey {
	return client.pinKeyAgreement
}

func (client *Client) PINToken() []byte {
	return client.pinToken
}

func (client *Client) deleteIdentity(id []byte) bool {
	success := client.vault.DeleteIdentity(id)
	if success {
		client.save()
	}
	return success
}

func (client *Client) identities() []*vfido.CredentialSource {
	return client.vault.CredentialSources
}

func (client *Client) passphrase() string {
	passphrase := getPassphrase()
	assert(passphrase != "", "Passphrase cannot be empty")
	return passphrase
}

func (client *Client) passphraseChanged() {
	client.lastUpdated = now()
	client.save()
}

func (client *Client) configureNewDevice(vaultType string) {
	authority := &x509.Certificate{
		SerialNumber: big.NewInt(0),
		Subject: pkix.Name{
			Organization: []string{"Bulwark Passkey"},
			Country:      []string{"US"},
		},
		NotBefore:             now(),
		NotAfter:              now().AddDate(10, 0, 0),
		IsCA:                  true,
		ExtKeyUsage:           []x509.ExtKeyUsage{x509.ExtKeyUsageClientAuth, x509.ExtKeyUsageServerAuth},
		KeyUsage:              x509.KeyUsageDigitalSignature | x509.KeyUsageCertSign,
		BasicConstraintsValid: true,
	}
	privateKey, err := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
	checkErr(err, "Could not generate attestation CA private key")
	authorityCertBytes, err := x509.CreateCertificate(rand.Reader, authority, authority, &privateKey.PublicKey, privateKey)
	checkErr(err, "Could not generate attestation CA cert bytes")
	certificateAuthority, err := x509.ParseCertificate(authorityCertBytes)
	checkErr(err, "Could not parse cert authority")
	encryptionKey := randomBytes(32)
	client.vaultType = vaultType
	client.lastUpdated = now()
	client.authenticationCounter = 0
	client.certificateAuthority = certificateAuthority
	client.certPrivateKey = privateKey
	client.encryptionKey = encryptionKey
	client.vault = vfido.NewIdentityVault()
	client.save()
}

func (client *Client) loadData(vaultType string, data []byte, lastUpdated string, email string) {
	testState, err := vfido.DecryptFIDOState(data, client.passphrase())
	if err == nil && testState.EncryptionKey != nil{
		client.deprecatedLoadData(vaultType, data, lastUpdated, email)
		return
	}
	savedState, err := decryptSavedState(data, client.passphrase())
	checkErr(err, "Could not load saved state data")
	config, err := vfido.DecryptFIDOState(savedState.VirtualFIDOConfig, client.passphrase())
	checkErr(err, "Could not decrypt saved FIDO state")
	lastUpdatedTime := now()
	err = (&lastUpdatedTime).UnmarshalText([]byte(lastUpdated))
	checkErr(err, "Could not parse time")
	cert, err := x509.ParseCertificate(config.AttestationCertificate)
	checkErr(err, "Could not parse x509 cert")
	privateKey, err := x509.ParseECPrivateKey(config.AttestationPrivateKey)
	checkErr(err, "Could not parse private key")
	client.vault = vfido.NewIdentityVault()
	client.vaultType = vaultType
	client.email = email
	client.lastUpdated = lastUpdatedTime
	client.authenticationCounter = config.AuthenticationCounter
	client.certificateAuthority = cert
	client.certPrivateKey = privateKey
	client.encryptionKey = config.EncryptionKey
	client.pinHash = config.PINHash
	client.vault.Import(config.Sources)
	client.save()
}

func (client *Client) updateData(data []byte, lastUpdated string) {
	// Check if the data received is the old version
	// TODO (Chris): remove this after a few months, perhaps 06/2023?
	// Will have to check if anybody is using the old version of the app
	testState, err := vfido.DecryptFIDOState(data, client.passphrase())
	if err == nil && testState.EncryptionKey != nil {
		client.deprecatedUpdateData(data, lastUpdated)
		return
	}
	savedStateBytes, err := vfido.DecryptWithPassphrase(client.passphrase(), data)
	if err != nil {
		errorf("Invalid state data provided: %w", err)
		return
	}
	savedState := ClientSavedState{}
	err = json.Unmarshal(savedStateBytes, &savedState)
	if err != nil {
		errorf("Invalid state json data provided: %w", err)
		return
	}
	config, err := vfido.DecryptFIDOState(savedState.VirtualFIDOConfig, client.passphrase())
	if err != nil {
		errorf("Invalid FIDO state in data: %w", err)
		return
	}
	lastUpdatedTime := now()
	err = (&lastUpdatedTime).UnmarshalText([]byte(lastUpdated))
	checkErr(err, "Could not parse time")
	cert, err := x509.ParseCertificate(config.AttestationCertificate)
	checkErr(err, "Could not parse x509 cert")
	privateKey, err := x509.ParseECPrivateKey(config.AttestationPrivateKey)
	checkErr(err, "Could not parse private key")
	client.lastUpdated = lastUpdatedTime
	client.authenticationCounter = config.AuthenticationCounter
	client.authenticationCounter = config.AuthenticationCounter
	client.certificateAuthority = cert
	client.certPrivateKey = privateKey
	client.encryptionKey = config.EncryptionKey
	client.pinHash = config.PINHash
	for _, sourceId := range savedState.DeletedSources {
		if !containsArray(sourceId, client.deletedSources) {
			client.deletedSources = append(client.deletedSources, sourceId)
			client.vault.DeleteIdentity(sourceId)
		}
	}
	newSources := make([]vfido.SavedCredentialSource, 0)
	for _, source := range config.Sources {
		if !containsArray(source.ID, client.deletedSources) {
			newSources = append(newSources, source)
		}
	}
	if len(newSources) > 0 {
		client.vault.Import(newSources)
	}
}

type ClientSavedState struct {
	VirtualFIDOConfig []byte
	DeletedSources [][]byte
}

func decryptSavedState(data []byte, passphrase string) (*ClientSavedState, error) {
	savedStateBytes, err := vfido.DecryptWithPassphrase(passphrase, data)
	if err != nil {
		return nil, err
	}
	savedState := ClientSavedState{}
	err = json.Unmarshal(savedStateBytes, &savedState)
	if err != nil {
		return nil, err
	}
	return &savedState, nil
}

func (client *Client) exportSavedState() []byte {
	privateKey, err := x509.MarshalECPrivateKey(client.certPrivateKey)
	checkErr(err, "Could not encode private key")
	config := vfido.FIDODeviceConfig{
		AuthenticationCounter:  client.authenticationCounter,
		AttestationCertificate: client.certificateAuthority.Raw,
		AttestationPrivateKey:  privateKey,
		EncryptionKey:          client.encryptionKey,
		PINHash: client.pinHash,
		Sources:                client.vault.Export(),
	}
	encryptedConfig, err := vfido.EncryptFIDOState(config, client.passphrase())
	state := ClientSavedState{
		VirtualFIDOConfig: encryptedConfig,
		DeletedSources: client.deletedSources,
	}
	stateBytes, err := json.Marshal(state)
	checkErr(err, "Could not marshal JSON")
	encryptedState, err := vfido.EncryptWithPassphrase(client.passphrase(), stateBytes)
	checkErr(err, "Could not encrypt state")
	return encryptedState
}

func (client *Client) save() {
	config := client.exportSavedState()
	vaultFile := VaultFile{VaultType: client.vaultType, Email: client.email, Data: config, LastUpdated: toTimestamp(client.lastUpdated)}
	favicons, err := exportFaviconCache()
	if err == nil {
		vaultFile.Favicons = favicons
	}
	saveVaultToFile(vaultFile)
	updateFrontend()
	storeRemoteVaultJSON(string(config), toTimestamp(client.lastUpdated))
}

// --------------------------
// Deprecated Methods
// --------------------------

func (client *Client) deprecatedLoadData(vaultType string, data []byte, lastUpdated string, email string) {
	lastUpdatedTime := now()
	err := (&lastUpdatedTime).UnmarshalText([]byte(lastUpdated))
	checkErr(err, "Could not parse time")
	config, err := vfido.DecryptFIDOState(data, client.passphrase())
	checkErr(err, "Could not decrypt vault file")
	cert, err := x509.ParseCertificate(config.AttestationCertificate)
	checkErr(err, "Could not parse x509 cert")
	privateKey, err := x509.ParseECPrivateKey(config.AttestationPrivateKey)
	checkErr(err, "Could not parse private key")
	client.vaultType = vaultType
	client.email = email
	client.lastUpdated = lastUpdatedTime
	client.authenticationCounter = config.AuthenticationCounter
	client.certificateAuthority = cert
	client.certPrivateKey = privateKey
	client.encryptionKey = config.EncryptionKey
	client.pinHash = config.PINHash
	client.vault = vfido.NewIdentityVault()
	client.vault.Import(config.Sources)
	client.save()
}

func (client *Client) deprecatedUpdateData(data []byte, lastUpdated string) {
	newLastUpdated := parseTimestamp(lastUpdated)
	if !client.lastUpdated.Before(*newLastUpdated) {
		return
	}
	_, err := vfido.DecryptFIDOState(data, client.passphrase())
	if err != nil {
		// Passphrase might have changed, get user to log in again
		eject := logIn(accountVaultType, string(data), client.email)
		if eject {
			deleteVaultFile()
			app.createNewVault()
		} else {
			_, err = vfido.DecryptFIDOState(data, client.passphrase())
			checkErr(err, "Could not decrypt new vault")
		}
	}
	client.deprecatedLoadData(accountVaultType, data, lastUpdated, client.email)
}