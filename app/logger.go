package main

import (
	"log"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func debugf(format string, args ...interface{}) {
	runtime.LogDebugf(app.ctx, format, args)
}

type Logger struct {
	log *log.Logger
}

func (logger *Logger) Print(message string) {
	logger.log.Printf("[PRINT] %s", message)
}
func (logger *Logger) Trace(message string) {
	logger.log.Printf("[TRACE] %s", message)
}
func (logger *Logger) Debug(message string) {
	logger.log.Printf("[DEBUG] %s", message)
}
func (logger *Logger) Info(message string) {
	logger.log.Printf("[INFO] %s", message)
}
func (logger *Logger) Warning(message string) {
	logger.log.Printf("[WARN] %s", message)
}
func (logger *Logger) Error(message string) {
	logger.log.Printf("[ERROR] %s", message)
}
func (logger *Logger) Fatal(message string) {
	logger.log.Fatalf("[FATAL] %s", message)
}
