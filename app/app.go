package main

import (
	"context"
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
	go app.client.initializeData()
	go startFIDOServer(app.client)
}
