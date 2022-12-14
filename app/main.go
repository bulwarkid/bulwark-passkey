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
	err := os.MkdirAll(configDir(), 0755)
	checkErr(err, "Could not create config directory")
	logFile, err := os.OpenFile(configFilePath("main.log"), os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0755)
	checkErr(err, "Could not create main log file")
	defer logFile.Close()
	consoleLogger := &Logger{log: log.New(logFile, "", 0)}

	// Create application with options
	err = wails.Run(&options.App{
		Title:              "Bulwark Passkey",
		Width:              400,
		MinWidth:           400,
		Height:             600,
		MinHeight:          600,
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
