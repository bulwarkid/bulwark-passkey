package main

import (
	"crypto/rand"
	"fmt"
	"runtime/debug"
	"time"
)

const DEBUG = false

func assert(test bool, message string) {
	if !test {
		fatalf("Assertion Failure: %s", message)
	}
}

func randomBytes(length int) []byte {
	bytes := make([]byte, length)
	rand.Read(bytes)
	return bytes
}

func checkErr(err error, msg string) {
	if err != nil {
		errorMsg := fmt.Sprintf("Error - %v - %s", err, msg)
		debug.PrintStack()
		fatalf(errorMsg)
	}
}

func parseTimestamp(timestamp string) *time.Time {
	t := time.Now()
	err := (&t).UnmarshalText([]byte(timestamp))
	checkErr(err, "Could not parse timestamp")
	return &t
}

func toTimestamp(t time.Time) string {
	timestamp, err := t.MarshalText()
	checkErr(err, "Could not convert time to timestamp")
	return string(timestamp)
}

func now() time.Time {
	return time.Now().UTC()
}
