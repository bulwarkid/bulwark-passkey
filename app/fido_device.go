package main

import (
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	"crypto/sha256"
	"crypto/x509"
	"crypto/x509/pkix"
	"math/big"
	"os"
	"time"

	"github.com/bulwarkid/virtual-fido/virtual_fido"
)

func checkErr(err error, msg string) {
	if err != nil {
		panic(msg)
	}
}

type ClientHelper struct {}

func (helper *ClientHelper) SaveData(data []byte) {

}

func (helper *ClientHelper) RetrieveData() []byte {
	return nil
}

func (helper *ClientHelper) Passphrase() string {
	return "test_passphrase"
}

func (helper *ClientHelper) ApproveClientAction(action virtual_fido.ClientAction, params virtual_fido.ClientActionRequestParams) bool {
	return true
}

func startFIDOServer() {
	// TODO: Load actual, persistent cert for signing identities
	// TODO: Persist encryption key across startups
	// ALL OF THIS IS INSECURE, FOR TESTING PURPOSES ONLY
	authority := &x509.Certificate{
			SerialNumber: big.NewInt(0),
			Subject: pkix.Name{
					Organization: []string{"Self-Signed Virtual FIDO"},
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
	encryptionKey := sha256.Sum256([]byte("test"))
	helper := ClientHelper{}

	virtual_fido.SetLogOutput(os.Stdout)
	virtual_fido.Start(virtual_fido.NewClient(authorityCertBytes, privateKey, encryptionKey, &helper, &helper))
}