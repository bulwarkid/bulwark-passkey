
JS_PLUGIN=../external/protobuf-javascript/bazel-bin/generator/protoc-gen-js
JS_OUT=../frontend/src/proto
GO_OUT=../app

all: clean js go

clean:
	rm -rf $(JS_OUT) || true

js:
	mkdir $(JS_OUT)
	protoc --plugin=$(JS_PLUGIN) --js_out=$(JS_OUT) src/*.proto

go:
	protoc --go_out=$(GO_OUT) src/*.proto