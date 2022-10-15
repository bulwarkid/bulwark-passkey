package main

import (
	"context"
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	"crypto/sha256"
	"crypto/x509"
	"crypto/x509/pkix"
	"fmt"
	"math/big"
	"os"
	"os/exec"
	"runtime"
	"time"

	"github.com/bulwarkid/virtual-fido/virtual_fido"
	wails_runtime "github.com/wailsapp/wails/v2/pkg/runtime"
)

func startFIDOServer(ctx context.Context, helper *ClientHelper) {

	log_fd, _ := os.Create("test.log")
	log_fd.Write([]byte{63})
	defer log_fd.Close()
	virtual_fido.SetLogOutput(log_fd)

	// TODO: Load actual, persistent cert for signing identities
	// TODO: Persist encryption key across startups
	// ALL OF THIS IS INSECURE, FOR TESTING PURPOSES ONLY
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
	encryptionKey := sha256.Sum256([]byte("test"))
	client := virtual_fido.NewClient(authorityCertBytes, privateKey, encryptionKey, helper, helper)
	helper.client = client

	go attachUSBIPServer(ctx)
	virtual_fido.Start(client)
}

func attachUSBIPServer(ctx context.Context) {
	time.Sleep(250 * time.Millisecond)
	if runtime.GOOS == "windows" {
		attachUSBIPWindows()
	} else if runtime.GOOS == "linux" {
		attachUSBIPLinux()
	} else {
		wails_runtime.LogErrorf(ctx, "Could not find USBIP command for OS %s\n", runtime.GOOS)
		return
	}
}

func attachUSBIPLinux() {
	commandList := []string{"sudo", "usbip", "attach", "-r", "127.0.0.1", "-b", "2-2"}

	prog := exec.Command(commandList[0], commandList[1:]...)
	prog.Stdin = os.Stdin
	prog.Stdout = os.Stdout
	prog.Stderr = os.Stderr
	err := prog.Run()
	if err != nil {
		fmt.Printf("Error: %s\n", err)
	}
}

func attachUSBIPWindows() {
	commandList := []string{"./usbip/usbip.exe", "attach", "-r", "127.0.0.1", "-b", "2-2"}

	prog := exec.Command(commandList[0], commandList[1:]...)
	prog.Stdin = os.Stdin
	prog.Stdout = os.Stdout
	prog.Stderr = os.Stderr
	err := prog.Run()
	if err != nil {
		fmt.Printf("Error: %s\n", err)
	}
}
