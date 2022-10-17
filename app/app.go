package main

import (
	"context"
)

type App struct {
	ctx    context.Context
	client *Client
}

func newApp() *App {
	return &App{}
}

func (app *App) startup(ctx context.Context) {
	app.ctx = ctx
	app.client = newClient(app.ctx)
	loadFrontendHandlers(app)
}

func (app *App) onDomReady(ctx context.Context) {
	go app.client.loadDataFromFile()
	go startFIDOServer(app.ctx, app.client)
}
