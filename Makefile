
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
	else ifeq ($(UNAME), Linux)
		OS_NAME = Linux
		OUTPUT_NAME = bulwark_passkey
		RUN_COMMAND = bulwark_passkey
		RM = rm -r
	endif
endif

run: run-$(OS_NAME)

run-Windows:
	PowerShell.exe -ExecutionPolicy Unrestricted -command ".\build\windows\run.ps1"

run-Darwin:
	bash -x ./build/mac/run.sh

run-Linux:
	bash -x ./build/linux/run.sh

nsis:
	PowerShell.exe -ExecutionPolicy Unrestricted -command ".\build\windows\nsis.ps1"

build: clean output

output: output-$(OS_NAME)

output-Darwin:
	bash -x ./build/mac/build.sh

output-Windows:
	PowerShell.exe -ExecutionPolicy Unrestricted -command ".\build\windows\build.ps1"

output-Linux:
	bash -x ./build/linux/build.sh

clean: clean-$(OS_NAME)

clean-Darwin:
	bash -x ./build/mac/clean.sh

clean-Windows:
	PowerShell.exe -ExecutionPolicy Unrestricted -command ".\build\windows\clean.ps1"

clean-Linux:
	bash -x ./build/linux/clean.sh

dpkg: build
	cp ./output/bulwark_passkey ./linux_pkg/bulwark-passkey/usr/bin/
	dpkg-deb --build ./linux_pkg/bulwark-passkey
	mv ./linux_pkg/bulwark-passkey.deb ./output/