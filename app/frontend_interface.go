package main

import (
	"crypto/elliptic"
	"crypto/x509"
	"encoding/base64"

	pb "github.com/bulwarkid/bulwark-passkey/app/proto"
	"github.com/bulwarkid/virtual-fido/virtual_fido"
	vfido "github.com/bulwarkid/virtual-fido/virtual_fido"
	"google.golang.org/protobuf/proto"
)

func updateData() {
	callRPC(app.ctx, "update")
}

func approveClientAction(action string, relyingParty string, userName string) bool {
	response := callRPC(app.ctx, "approveClientAction", action, relyingParty, userName)
	return response.(bool)
}

func logIn(vaultType string) bool {
	response := callRPC(app.ctx, "logIn", vaultType)
	return response.(bool)
}

func createNewVault() string {
	response := callRPC(app.ctx, "createNewVault")
	return response.(string)
}

func getPassphrase() string {
	response := callRPC(app.ctx, "getPassphrase")
	return response.(string)
}

func getVaultData() []byte {
	// TODO: Get vault data from backend
	return nil
}

func loadFrontendHandlers() {
	registerHandler(app.ctx, "getIdentities", handleIdentities)
	registerHandler(app.ctx, "deleteIdentity", handleDeleteIdentity)
	registerHandler(app.ctx, "passphraseChanged", handlePassphraseChanged)
	registerHandler(app.ctx, "tryPassphrase", handleTryPassphrase)
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

func credentialSourceToIdentity(source *virtual_fido.CredentialSource) *pb.Identity {
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
	app.client.save()
	return nil
}

func handleTryPassphrase(args ...interface{}) interface{} {
	passphrase := args[0].(string)
	data := readVaultFromFile()
	if data == nil {
		return true
	}
	_, err := vfido.DecryptWithPassphrase(data.Data, passphrase)
	return err == nil
}
