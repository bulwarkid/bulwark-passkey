package main

import (
	"context"
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	"crypto/x509"
	"crypto/x509/pkix"
	"math/big"
	"time"

	vfido "github.com/bulwarkid/virtual-fido/virtual_fido"
)

type Client struct {
	ctx                   context.Context
	passphrase            *string
	vault                 *vfido.IdentityVault
	certificateAuthority  *x509.Certificate
	certPrivateKey        *ecdsa.PrivateKey
	encryptionKey         []byte
	authenticationCounter uint32
}

func newClient(helper *ClientHelper) *Client {
	authority := &x509.Certificate{
		SerialNumber: big.NewInt(0),
		Subject: pkix.Name{
			Organization: []string{"Bulwark Passkey"},
			Country:      []string{"US"},
		},
		NotBefore:             time.Now(),
		NotAfter:              time.Now().AddDate(10, 0, 0),
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
	vault := vfido.NewIdentityVault()
	return &Client{
		ctx:                   helper.app.ctx,
		passphrase:            nil,
		encryptionKey:         encryptionKey[:],
		certificateAuthority:  certificateAuthority,
		vault:                 vault,
		certPrivateKey:        privateKey,
		authenticationCounter: 0,
	}
}

func (client *Client) NewCredentialSource(relyingParty vfido.PublicKeyCredentialRpEntity, user vfido.PublicKeyCrendentialUserEntity) *vfido.CredentialSource {
	id := client.vault.NewIdentity(relyingParty, user)
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
		NotBefore:   time.Now(),
		NotAfter:    time.Now().AddDate(10, 0, 0),
		ExtKeyUsage: []x509.ExtKeyUsage{x509.ExtKeyUsageClientAuth, x509.ExtKeyUsageServerAuth},
		KeyUsage:    x509.KeyUsageDigitalSignature,
	}
	certBytes, err := x509.CreateCertificate(rand.Reader, templateCert, client.certificateAuthority, &privateKey.PublicKey, client.certPrivateKey)
	checkErr(err, "Could not generate attestation certificate")
	return certBytes
}

func (client *Client) ApproveAccountCreation(relyingParty string) bool {
	return approveClientAction(client.ctx, "fido_make_credential", relyingParty, "")
}

func (client *Client) ApproveAccountLogin(credentialSource *vfido.CredentialSource) bool {
	return approveClientAction(client.ctx, "fido_get_assertion", credentialSource.RelyingParty.Name, credentialSource.User.DisplayName)
}

func (client *Client) ApproveU2FRegistration(keyHandle *vfido.KeyHandle) bool {
	return approveClientAction(client.ctx, "u2f_register", "", "")
}

func (client *Client) ApproveU2FAuthentication(keyHandle *vfido.KeyHandle) bool {
	return approveClientAction(client.ctx, "u2f_authenticate", "", "")
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

func (client *Client) save() {
	if client.passphrase == nil {
		passphrase := getPassphrase(client.ctx)
		client.passphrase = &passphrase
	}
	privateKey, err := x509.MarshalECPrivateKey(client.certPrivateKey)
	checkErr(err, "Could not encode private key")
	config := vfido.FIDODeviceConfig{
		AuthenticationCounter:  client.authenticationCounter,
		AttestationCertificate: client.certificateAuthority.Raw,
		AttestationPrivateKey:  privateKey,
		EncryptionKey:          client.encryptionKey,
		Sources:                client.vault.Export(),
	}
	stateBytes, err := vfido.EncryptWithPassphrase(config, *client.passphrase)
	checkErr(err, "Could not encode device state")
	saveVaultToFile(stateBytes)
	updateData(client.ctx)
}
