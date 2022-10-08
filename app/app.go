package main

import (
	"context"
	"fmt"

	"github.com/bulwarkid/virtual-fido/virtual_fido"
)


type ClientHelper struct {
	app *App
}

func (helper *ClientHelper) SaveData(data []byte) {

}

func (helper *ClientHelper) RetrieveData() []byte {
	return nil
}

func (helper *ClientHelper) Passphrase() string {
	return "test_passphrase"
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

// App struct
type App struct {
	ctx context.Context
	helper *ClientHelper
}

// NewApp creates a new App application struct
func NewApp() *App {
	app := &App{helper: &ClientHelper{}}
	app.helper.app = app
	return app
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}
