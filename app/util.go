package main

import (
	"crypto/rand"
	"fmt"
)

const DEBUG = false

func randomBytes(length int) []byte {
	bytes := make([]byte, length)
	rand.Read(bytes)
	return bytes
}

func checkErr(err error, msg string) {
	if err != nil {
		errorMsg := fmt.Sprintf("Error - %v - %s", err, msg)
		fatalf(errorMsg)
	}
}
