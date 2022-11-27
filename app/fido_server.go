package main

import (
	"os"
	"os/exec"
	"runtime"
	"strings"
	"time"

	"github.com/bulwarkid/virtual-fido/virtual_fido"
)

func startFIDOServer(client *Client) {
	logFile, err := os.OpenFile(configFilePath("device.log"), os.O_RDWR | os.O_CREATE | os.O_TRUNC, 0755)
	checkErr(err, "Could not open device log")
	defer logFile.Close()
	virtual_fido.SetLogOutput(logFile)

	go attachUSBIPServer()
	virtual_fido.Start(client)
}

func attachUSBIPServer() {
	time.Sleep(250 * time.Millisecond)
	if runtime.GOOS == "windows" {
		attachUSBIPWindows()
	} else if runtime.GOOS == "linux" {
		attachUSBIPLinux()
	} else {
		debugf("Could not find USBIP command for OS %s\n", runtime.GOOS)
		return
	}
}

func runCommand(commandList []string) {
	debugf(strings.Join(commandList, " "))
	prog := exec.Command(commandList[0], commandList[1:]...)
	prog.Stdin = os.Stdin
	prog.Stdout = os.Stdout
	prog.Stderr = os.Stderr
	err := prog.Run()
	if err != nil {
		fatalf("Error: %s\n", err)
	}
}

func attachUSBIPLinux() {
	runCommand([]string{"pkexec", "bash", "-c", "modprobe vhci-hcd && usbip attach -r 127.0.0.1 -b 2-2"})
}

func attachUSBIPWindows() {
	runCommand([]string{"./usbip/usbip.exe", "install", "-u"})
	runCommand([]string{"./usbip/usbip.exe", "attach", "-r", "127.0.0.1", "-b", "2-2"})
}
