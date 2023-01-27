package main

import (
	"crypto/elliptic"
	"crypto/x509"
	"encoding/base64"

	pb "github.com/bulwarkid/bulwark-passkey/app/proto"
	"github.com/bulwarkid/virtual-fido/fido_client"
	"google.golang.org/protobuf/proto"
)

func updateFrontend() {
	callRPC(app.ctx, "update")
}

func approveClientAction(action string, relyingParty string, userName string) bool {
	response := callRPC(app.ctx, "approveClientAction", action, relyingParty, userName)
	return response.(bool)
}

func logIn(vaultType string, vaultData string, email string) bool {
	response := callRPC(app.ctx, "logIn", vaultType, vaultData, email)
	return response.(bool)
}

func createNewVault() (string, bool) {
	// 1st arg: vault type of new vault
	// 2nd arg: if true, logged into remote vault instead of creating new one
	response := callRPC(app.ctx, "createNewVault").([]interface{})
	return response[0].(string), response[1].(bool)
}

func getPassphrase() string {
	response := callRPC(app.ctx, "getPassphrase")
	return response.(string)
}

func fetchRemoteVaultJSON() (string, string) {
	response := callRPC(app.ctx, "fetchRemoteVault").([]interface{})
	return response[0].(string), response[1].(string)
}

func storeRemoteVaultJSON(vaultJSON string, lastUpdated string) {
	callRPC(app.ctx, "storeRemoteVault", vaultJSON, lastUpdated)
}

func getUserEmail() string {
	response := callRPC(app.ctx, "getUserEmail")
	return response.(string)
}

func loadFrontendHandlers() {
	registerHandler(app.ctx, "getIdentities", handleIdentities)
	registerHandler(app.ctx, "deleteIdentity", handleDeleteIdentity)
	registerHandler(app.ctx, "passphraseChanged", handlePassphraseChanged)
	registerHandler(app.ctx, "tryPassphrase", handleTryPassphrase)
	registerHandler(app.ctx, "remoteVaultUpdated", handleRemoteVaultUpdated)
	registerHandler(app.ctx, "getFavicon", handleGetFavicon)
}

func demoIdentities() [][]byte {
	websites := []string{"Apple", "Facebook", "Github", "Amazon", "Quip"}
	names := []string{"Chris de la Iglesia", "Chris", "Bob", "Alice", "Terry"}
	ids := make([][]byte, 0)
	for i := 0; i < len(websites) && i < len(names); i++ {
		var val int32 = 0
		id := pb.Identity{
			Id: randomBytes(16),
			Website: &pb.RelyingParty{
				Id:   &websites[i],
				Name: &websites[i],
			},
			User: &pb.User{
				Id:          randomBytes(16),
				DisplayName: &names[i],
				Name:        &names[i],
			},
			PrivateKey:       randomBytes(16),
			PublicKey:        randomBytes(16),
			SignatureCounter: &val,
		}
		idBytes, err := proto.Marshal(&id)
		checkErr(err, "Could not marshal identity")
		ids = append(ids, idBytes)
	}
	return ids
}

func credentialSourceToIdentity(source *fido_client.CredentialSource) *pb.Identity {
	publicKeyBytes := elliptic.Marshal(elliptic.P256(), source.PrivateKey.PublicKey.X, source.PrivateKey.PublicKey.Y)
	privateKeyBytes, err := x509.MarshalECPrivateKey(source.PrivateKey)
	checkErr(err, "Could not marshal private key")
	return &pb.Identity{
		Id: source.ID,
		Website: &pb.RelyingParty{
			Id:   &source.RelyingParty.Id,
			Name: &source.RelyingParty.Name,
		},
		User: &pb.User{
			Id:          source.User.Id,
			Name:        &source.User.Name,
			DisplayName: &source.User.DisplayName,
		},
		PublicKey:        publicKeyBytes,
		PrivateKey:       privateKeyBytes,
		SignatureCounter: &source.SignatureCounter,
	}
}

func handleIdentities(data ...interface{}) interface{} {
	if DEBUG {
		return demoIdentities()
	}
	if app.client == nil {
		return [][]byte{}
	}
	sources := app.client.identities()
	protos := make([][]byte, 0)
	for _, source := range sources {
		identity := credentialSourceToIdentity(source)
		idBytes, err := proto.Marshal(identity)
		checkErr(err, "Could not marshall protobuf identity")
		protos = append(protos, idBytes)
	}
	return protos
}

func handleDeleteIdentity(data ...interface{}) interface{} {
	id, err := base64.StdEncoding.DecodeString(data[0].(string))
	checkErr(err, "Could not decode identity ID to delete")
	return app.client.deleteIdentity(id)
}

func handlePassphraseChanged(data ...interface{}) interface{} {
	app.client.passphraseChanged()
	return nil
}

func handleTryPassphrase(args ...interface{}) interface{} {
	passphrase := args[0].(string)
	data := args[1].(string)
	_, err := fido_client.DecryptWithPassphrase(passphrase, []byte(data))
	return err == nil
}

func handleRemoteVaultUpdated(args ...interface{}) interface{} {
	vaultData := args[0].(string)
	lastUpdated := args[1].(string)
	app.client.updateData([]byte(vaultData), lastUpdated)
	return nil
}

func handleGetFavicon(args ...interface{}) interface{} {
	domain := args[0].(string)
	favicon, err := getFavicon(domain)
	if err != nil {
		return nil
	}
	return favicon
}
