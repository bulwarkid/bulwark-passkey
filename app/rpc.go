package main

import (
	"context"
	"fmt"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func callRPC(ctx context.Context, name string, data ...interface{}) []interface{} {
	fmt.Printf("Starting RPC %s\n", name)
	responseChan := make(chan []interface{})
	responseHandler := func(data ...interface{}) {
		fmt.Printf("Received callback for %s\n", name)
		responseChan <- data
	}
	runtime.EventsOnce(ctx, name+"-response", responseHandler)
	runtime.EventsEmit(ctx, name+"-request", data...)
	response := <-responseChan
	fmt.Printf("Received response: %v\n", response)
	return response
}
