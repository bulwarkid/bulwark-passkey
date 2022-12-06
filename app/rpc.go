package main

import (
	"context"
	"strconv"
	"sync/atomic"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

var rpcResponseId int32 = 0

func callRPC(ctx context.Context, name string, args ...interface{}) interface{} {
	responseId := strconv.Itoa(int(atomic.AddInt32(&rpcResponseId, 1)))
	responseChan := make(chan interface{})
	responseHandler := func(data ...interface{}) {
		responseChan <- data[0]
	}
	runtime.EventsOnce(ctx, "response-backend-"+responseId, responseHandler)
	data := append([]interface{}{responseId}, args...)
	runtime.EventsEmit(ctx, name+"-request", data)
	response := <-responseChan
	debugf("GO -> JS: %s(%v) -> %v\n", name, args, response)
	return response
}

func registerHandler(ctx context.Context, name string, handler func(...interface{}) interface{}) {
	runtime.EventsOn(ctx, name+"-request", func(data ...interface{}) {
		responseId := data[0].(string)
		response := handler(data[1:]...)
		debugf("JS -> GO: %s(%v) -> %v\n", name, data[1:], response)
		runtime.EventsEmit(ctx, "response-frontend-"+responseId, response)
	})
}
