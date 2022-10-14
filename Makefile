
ifeq ($(OS), Windows_NT)
	OS_NAME = Windows
	OUTPUT = Bulwark\ Passkey.exe
	RUN_COMMAND = bulwark_passkey.exe
	RM = del
else
	UNAME := $(shell uname -s)
	ifeq ($(UNAME), Darwin)
		OS_NAME = Darwin
		OUTPUT_NAME = Bulwark\ Passkey.app
		RUN_COMMAND = Bulwark\ Passkey.app/Contents/MacOS/Bulwark\ Passkey
		RM = rm -r
	endif
endif

run: run-$(OS_NAME)

run-Windows:
	PowerShell.exe -ExecutionPolicy Unrestricted -command ".\build\run.ps1"

run-Darwin:
	./output/$(RUN_COMMAND)

build: clean output

output: output-$(OS_NAME)

frontend/build:
	cd frontend && npm run build

output-Darwin: frontend/build
	cp -r frontend/build app/frontend_dist
	cd app && wails build -s -skipbindings
	mkdir output || true
	mv app/build/bin/$(OUTPUT) output

output-Windows:
	PowerShell.exe -ExecutionPolicy Unrestricted -command ".\build\build.ps1"

clean: clean-$(OS_NAME)

clean-Darwin:
	rm -r output || true
	rm -r frontend/build || true
	rm -r app/build/bin || true
	rm -r app/frontend_dist || true

clean-Windows:
	PowerShell.exe -ExecutionPolicy Unrestricted -command ".\build\clean.ps1"