package main

import (
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	"crypto/x509"
	"crypto/x509/pkix"
	"math/big"

	"github.com/bulwarkid/virtual-fido/virtual_fido"
	vfido "github.com/bulwarkid/virtual-fido/virtual_fido"
)

type FIDOClientDelegate interface {
	FIDOUpdated()
}

type FIDOClient struct {
	delegate FIDOClientDelegate

	vault                 *vfido.IdentityVault
	certificateAuthority  *x509.Certificate
	certPrivateKey        *ecdsa.PrivateKey
	encryptionKey         []byte
	authenticationCounter uint32

	pinHash []byte
	pinRetries int32
	pinKeyAgreement *virtual_fido.ECDHKey
	pinToken []byte
}


func newFIDOClient(delegate FIDOClientDelegate) *FIDOClient {
	return &FIDOClient{
		delegate: delegate,
		pinToken: randomBytes(16),
		pinRetries: 8,
		pinHash: nil,
		pinKeyAgreement: virtual_fido.GenerateECDHKey(),
		vault: vfido.NewIdentityVault(),
	}
}

func (client *FIDOClient) configureNewClient() {
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
	client.authenticationCounter = 0
	client.certificateAuthority = certificateAuthority
	client.certPrivateKey = privateKey
	client.encryptionKey = encryptionKey
	client.vault = vfido.NewIdentityVault()
}

func (client *FIDOClient) loadConfig(config *vfido.FIDODeviceConfig) {
	cert, err := x509.ParseCertificate(config.AttestationCertificate)
	checkErr(err, "Could not parse x509 cert")
	privateKey, err := x509.ParseECPrivateKey(config.AttestationPrivateKey)
	checkErr(err, "Could not parse private key")
	client.authenticationCounter = config.AuthenticationCounter
	client.certificateAuthority = cert
	client.certPrivateKey = privateKey
	client.encryptionKey = config.EncryptionKey
	client.pinHash = config.PINHash
	client.vault = vfido.NewIdentityVault()
	client.vault.Import(config.Sources)
}

func (client *FIDOClient) exportConfig() *vfido.FIDODeviceConfig {
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
	return &config
}


func (client *FIDOClient) NewCredentialSource(relyingParty vfido.PublicKeyCredentialRpEntity, user vfido.PublicKeyCrendentialUserEntity) *vfido.CredentialSource {
	id := client.vault.NewIdentity(relyingParty, user)
	client.delegate.FIDOUpdated()
	return id
}

func (client *FIDOClient) GetAssertionSource(relyingPartyID string, allowList []vfido.PublicKeyCredentialDescriptor) *vfido.CredentialSource {
	sources := client.vault.GetMatchingCredentialSources(relyingPartyID, allowList)
	if len(sources) == 0 {
		return nil
	}

	// TODO: Allow user to choose credential source
	credentialSource := sources[0]
	credentialSource.SignatureCounter++
	client.delegate.FIDOUpdated()
	return credentialSource
}

func (client *FIDOClient) SealingEncryptionKey() []byte {
	return client.encryptionKey
}

func (client *FIDOClient) NewPrivateKey() *ecdsa.PrivateKey {
	privateKey, err := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
	checkErr(err, "Could not generate private key")
	return privateKey
}

func (client *FIDOClient) NewAuthenticationCounterId() uint32 {
	num := client.authenticationCounter
	client.authenticationCounter++
	client.delegate.FIDOUpdated()
	return num
}

func (client *FIDOClient) CreateAttestationCertificiate(privateKey *ecdsa.PrivateKey) []byte {
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

func (client *FIDOClient) ApproveAccountCreation(relyingParty string) bool {
	return approveClientAction("fido_make_credential", relyingParty, "")
}

func (client *FIDOClient) ApproveAccountLogin(credentialSource *vfido.CredentialSource) bool {
	return approveClientAction("fido_get_assertion", credentialSource.RelyingParty.Name, credentialSource.User.DisplayName)
}

func (client *FIDOClient) ApproveU2FRegistration(keyHandle *vfido.KeyHandle) bool {
	return approveClientAction("u2f_register", "", "")
}

func (client *FIDOClient) ApproveU2FAuthentication(keyHandle *vfido.KeyHandle) bool {
	return approveClientAction("u2f_authenticate", "", "")
}

func (client *FIDOClient) PINHash() []byte {
	return client.pinHash
}

func (client *FIDOClient) SetPINHash(pin []byte) {
	client.pinHash = pin
	client.delegate.FIDOUpdated()
}

func (client *FIDOClient) PINRetries() int32 {
	return client.pinRetries
}

func (client *FIDOClient) SetPINRetries(retries int32) {
	// No need to notify updates as retries aren't saved between sessions
	client.pinRetries = retries
}

func (client *FIDOClient) PINKeyAgreement() *virtual_fido.ECDHKey {
	return client.pinKeyAgreement
}

func (client *FIDOClient) PINToken() []byte {
	return client.pinToken
}