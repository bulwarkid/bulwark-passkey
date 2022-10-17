package main

import (
	"context"

	"github.com/bulwarkid/virtual-fido/virtual_fido"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type ClientHelper struct {
	app    *App
	client *Client
}

func NewClientHelper() *ClientHelper {
	return &ClientHelper{app: nil, client: nil}
}

func (helper *ClientHelper) fidoClient() *Client {
	for helper.client == nil {
		// Wait for client to be populated
	}
	return helper.client
}

func (helper *ClientHelper) SaveData(data []byte) {
	callRPC(helper.app.ctx, "update")
	saveVaultToFile(data)
}

func (helper *ClientHelper) RetrieveData() []byte {
	return readVaultFromFile()
}

func (helper *ClientHelper) Passphrase() string {
	passphrase := callRPC(helper.app.ctx, "get_passphrase")
	return passphrase[0].(string)
}

func actionToString(action virtual_fido.ClientAction) string {
	switch action {
	case virtual_fido.ClientActionFIDOGetAssertion:
		return "fido_get_assertion"
	case virtual_fido.ClientActionFIDOMakeCredential:
		return "fido_make_credential"
	case virtual_fido.ClientActionU2FAuthenticate:
		return "u2f_authenticate"
	case virtual_fido.ClientActionU2FRegister:
		return "u2f_register"
	default:
		panic("Unhandled action name!")
	}
}

func (helper *ClientHelper) ApproveClientAction(action virtual_fido.ClientAction, params virtual_fido.ClientActionRequestParams) bool {
	response := callRPC(helper.app.ctx, "fido-approveClientAction", actionToString(action), params.RelyingParty, params.UserName)
	return response[0].(bool)
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
	go startFIDOServer(ctx, app.helper)
}
