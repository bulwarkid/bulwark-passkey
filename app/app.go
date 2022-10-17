package main

import (
	"context"
)

type ClientHelper struct {
	app    *App
	client *Client
}

func NewClientHelper() *ClientHelper {
	return &ClientHelper{app: nil, client: nil}
}

type App struct {
	ctx    context.Context
	client *Client
}

func NewApp() *App {
	return &App{}
}

func (app *App) startup(ctx context.Context) {
	app.ctx = ctx
	app.client = newClient(app.ctx)
	registerHandler(ctx, "get_identities", HandleIdentities(app))
	registerHandler(ctx, "delete_identity", HandleDeleteIdentity(app))
}

func (app *App) onDomReady(ctx context.Context) {
	go startFIDOServer(app.ctx, app.client)
}
