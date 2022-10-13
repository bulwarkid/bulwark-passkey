package main

import (
	"context"
	"crypto/elliptic"
	"crypto/x509"
	"encoding/base64"

	pb "github.com/bulwarkid/bulwark-passkey/app/proto"
	"github.com/bulwarkid/virtual-fido/virtual_fido"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"google.golang.org/protobuf/proto"
)

type ClientHelper struct {
	app    *App
	client virtual_fido.Client
}

func (helper *ClientHelper) SaveData(data []byte) {
	callRPC(helper.app.ctx, "update")
}

func (helper *ClientHelper) RetrieveData() []byte {
	return nil
}

func (helper *ClientHelper) Passphrase() string {
	passphrase := callRPC(helper.app.ctx, "get_passphrase")
	return passphrase[0].(string)
}

func actionToString(action virtual_fido.ClientAction) string {
	switch action {
	case virtual_fido.CLIENT_ACTION_FIDO_GET_ASSERTION:
		return "fido_get_assertion"
	case virtual_fido.CLIENT_ACTION_FIDO_MAKE_CREDENTIAL:
		return "fido_make_credential"
	case virtual_fido.CLIENT_ACTION_U2F_AUTHENTICATE:
		return "u2f_authenticate"
	case virtual_fido.CLIENT_ACTION_U2F_REGISTER:
		return "u2f_register"
	default:
		panic("Unhandled action name!")
	}
}

func (helper *ClientHelper) ApproveClientAction(action virtual_fido.ClientAction, params virtual_fido.ClientActionRequestParams) bool {
	response := callRPC(helper.app.ctx, "fido-approveClientAction", actionToString(action), params.RelyingParty, params.UserName)
	return response[0].(bool)
}

func demoIdentities() [][]byte {
	websites := []string{"Apple", "Facebook", "Github", "Amazon", "Quip"}
	names := []string{"Chris de la Iglesia", "Chris", "Bob", "Alice", "Terry"}
	ids := make([][]byte, 0)
	for i := 0; i < len(websites) && i < len(names); i++ {
		var val int32 = 0
		id := pb.Identity{
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

func HandleIdentities(client *ClientHelper) func(...interface{}) interface{} {
	return func(data ...interface{}) interface{} {
		if DEBUG {
			return demoIdentities()
		}
		sources := client.client.Identities()
		protos := make([][]byte, 0)
		for _, source := range sources {
			identity := credentialSourceToIdentity(&source)
			idBytes, err := proto.Marshal(identity)
			checkErr(err, "Could not marshall protobuf identity")
			protos = append(protos, idBytes)
		}
		return protos
	}
}

func HandleDeleteIdentity(client *ClientHelper) func(...interface{}) interface{} {
	return func(data ...interface{}) interface{} {
		id, err := base64.StdEncoding.DecodeString(data[0].(string))
		checkErr(err, "Could not decode identity ID to delete")
		return client.client.DeleteIdentity(id)
	}
}

type App struct {
	ctx    context.Context
	helper *ClientHelper
}

func NewApp() *App {
	app := &App{helper: &ClientHelper{}}
	app.helper.app = app
	return app
}

func (app *App) startup(ctx context.Context) {
	app.ctx = ctx
	registerHandler(ctx, "get_identities", HandleIdentities(app.helper))
	registerHandler(ctx, "delete_identity", HandleDeleteIdentity(app.helper))
	runtime.LogSetLogLevel(ctx, 1)
}

func (app *App) onDomReady(ctx context.Context) {
	go startFIDOServer(app.helper)
}

