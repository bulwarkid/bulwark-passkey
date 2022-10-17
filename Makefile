
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
	PowerShell.exe -ExecutionPolicy Unrestricted -command ".\build\windows\run.ps1"

run-Darwin:
	bash -x ./build/mac/run.sh

build: clean output

output: output-$(OS_NAME)

output-Darwin:
	bash -x ./build/mac/build.sh

output-Windows:
	PowerShell.exe -ExecutionPolicy Unrestricted -command ".\build\windows\build.ps1"

clean: clean-$(OS_NAME)

clean-Darwin:
	bash -x ./build/mac/clean.sh

clean-Windows:
	PowerShell.exe -ExecutionPolicy Unrestricted -command ".\build\windows\clean.ps1"