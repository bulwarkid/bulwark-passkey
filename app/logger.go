package main

import (
	"fmt"
	"log"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func debugf(format string, args ...interface{}) {
	runtime.LogDebugf(app.ctx, format, args)
}

func fatalf(format string, args ...interface{}) {
	runtime.LogFatalf(app.ctx, format, args)
}

type Logger struct {
	log *log.Logger
}

func (logger *Logger) printInternal(format string, args ...interface{}) {
	fmt.Println(fmt.Sprintf(format, args...))
	logger.log.Printf(format, args...)
}

func (logger *Logger) Print(message string) {
	logger.printInternal("[PRINT] %s", message)
}
func (logger *Logger) Trace(message string) {
	logger.printInternal("[TRACE] %s", message)
}
func (logger *Logger) Debug(message string) {
	logger.printInternal("[DEBUG] %s", message)
}
func (logger *Logger) Info(message string) {
	logger.printInternal("[INFO] %s", message)
}
func (logger *Logger) Warning(message string) {
	logger.printInternal("[WARN] %s", message)
}
func (logger *Logger) Error(message string) {
	logger.printInternal("[ERROR] %s", message)
}
func (logger *Logger) Fatal(message string) {
	errorMsg := fmt.Sprintf("[FATAL %s", message)
	fmt.Println(errorMsg)
	logger.log.Fatalf(errorMsg)
}
