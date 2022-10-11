package main

import "crypto/rand"

const DEBUG = true

func randomBytes(length int) []byte {
	bytes := make([]byte, length)
	rand.Read(bytes)
	return bytes
}

func checkErr(err error, msg string) {
	if err != nil {
		panic(msg)
	}
}
