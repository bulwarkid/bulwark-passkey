package main

import (
	"log"
)

type ConsoleLogger struct {
	log *log.Logger
}

func (logger *ConsoleLogger) Print(message string) {
	logger.log.Printf("[PRINT] %s", message)
}
func (logger *ConsoleLogger) Trace(message string) {
	logger.log.Printf("[TRACE] %s", message)
}
func (logger *ConsoleLogger) Debug(message string) {
	logger.log.Printf("[DEBUG] %s", message)
}
func (logger *ConsoleLogger) Info(message string) {
	logger.log.Printf("[INFO] %s", message)
}
func (logger *ConsoleLogger) Warning(message string) {
	logger.log.Printf("[WARN] %s", message)
}
func (logger *ConsoleLogger) Error(message string) {
	logger.log.Printf("[ERROR] %s", message)
}
func (logger *ConsoleLogger) Fatal(message string) {
	logger.log.Fatalf("[FATAL] %s", message)
}
