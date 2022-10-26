package main

import (
	"context"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func callRPC(ctx context.Context, name string, data ...interface{}) interface{} {
	responseChan := make(chan interface{})
	responseHandler := func(data ...interface{}) {
		responseChan <- data[0]
	}
	runtime.EventsOnce(ctx, name+"-response", responseHandler)
	runtime.EventsEmit(ctx, name+"-request", data...)
	response := <-responseChan
	runtime.LogDebugf(ctx, "GO -> JS: %s(%v) -> %v\n", name, data, response)
	return response
}

func registerHandler(ctx context.Context, name string, handler func(...interface{}) interface{}) {
	runtime.EventsOn(ctx, name+"-request", func(optionalData ...interface{}) {
		response := handler(optionalData...)
		runtime.LogDebugf(ctx, "JS -> GO: %s(%v) -> %v\n", name, optionalData, response)
		runtime.EventsEmit(ctx, name+"-response", response)
	})
}
