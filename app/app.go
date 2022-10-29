package main

import (
	"context"
	"time"
)

var app *App

type App struct {
	ctx         context.Context
	client      *Client
	fidoStarted bool
}

func newApp() *App {
	return &App{fidoStarted: false}
}

func (app *App) startup(ctx context.Context) {
	app.ctx = ctx
	app.client = newClient()
	loadFrontendHandlers()
}

func (app *App) onDomReady(ctx context.Context) {
	go func() {
		// Wait 200ms for all the JS to load before making requests to it
		// TODO: Get rid of this hack
		// IF 200MS IS NOT ENOUGH THIS REQUIRES A REFACTOR, DON'T INCREASE
		time.Sleep(200 * time.Millisecond)
		app.initializeData()
	}()
}

func (app *App) initializeData() {
	vaultFile := readVaultFromFile()
	if vaultFile == nil {
		// Create new vault
		app.createNewVault()
	} else {
		// Existing vault
		eject := logIn(vaultFile.VaultType)
		if !eject {
			// 1. Logged in locally or remotely
			app.client.loadData(vaultFile.VaultType, vaultFile.Data)
		} else {
			// 2. Eject and create new vault
			deleteVaultFile()
			app.createNewVault()
		}
	}
	go startFIDOServer(app.client)
}

func (app *App) createNewVault() {
	vaultType, loggedIn := createNewVault()
	if loggedIn {
		// Fetch remote vault
		jsonData := fetchRemoteVaultJSON()
		app.client.loadData(accountVaultType, []byte(jsonData))
	} else {
		app.client.configureNewDevice(vaultType)
	}
}
