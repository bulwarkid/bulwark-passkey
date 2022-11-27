package main

import (
	"fmt"
	"log"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func nocommitf(format string, args ...interface{}) {
	runtime.LogDebugf(app.ctx, format, args...)
}

func debugf(format string, args ...interface{}) {
	runtime.LogDebugf(app.ctx, format, args...)
}

func fatalf(format string, args ...interface{}) {
	runtime.LogFatalf(app.ctx, format, args...)
}

type Logger struct {
	log *log.Logger
}

func (logger *Logger) printInternal(format string, args ...interface{}) {
	fmt.Printf(fmt.Sprintf(format, args...))
	logger.log.Printf(format, args...)
}

func (logger *Logger) Print(message string) {
	logger.printInternal("[PRINT] %s\n", message)
}
func (logger *Logger) Trace(message string) {
	logger.printInternal("[TRACE] %s\n", message)
}
func (logger *Logger) Debug(message string) {
	logger.printInternal("[DEBUG] %s\n", message)
}
func (logger *Logger) Info(message string) {
	logger.printInternal("[INFO] %s\n", message)
}
func (logger *Logger) Warning(message string) {
	logger.printInternal("[WARN] %s\n", message)
}
func (logger *Logger) Error(message string) {
	logger.printInternal("[ERROR] %s\n", message)
}
func (logger *Logger) Fatal(message string) {
	errorMsg := fmt.Sprintf("[FATAL] %s\n", message)
	fmt.Printf(errorMsg)
	logger.log.Fatalf(errorMsg)
}
