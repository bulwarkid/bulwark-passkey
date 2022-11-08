package main

import (
	"embed"
	"log"
	"os"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/logger"
	"github.com/wailsapp/wails/v2/pkg/options"
)

//go:embed all:frontend_dist
var assets embed.FS

func main() {
	app = newApp()
	logFile, err := os.OpenFile("main.log", os.O_CREATE|os.O_TRUNC, 0755)
	defer logFile.Close()
	consoleLogger := &Logger{log: log.New(logFile, "", 0)}

	// Create application with options
	err = wails.Run(&options.App{
		Title:              "Bulwark Passkey",
		Width:              400,
		Height:             600,
		DisableResize:      true,
		Assets:             assets,
		BackgroundColour:   &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:          app.startup,
		OnDomReady:         app.onDomReady,
		LogLevel:           logger.DEBUG,
		LogLevelProduction: logger.WARNING,
		Logger:             consoleLogger,
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
