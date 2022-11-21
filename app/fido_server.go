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
	log_fd, _ := os.Create("device.log")
	defer log_fd.Close()
	virtual_fido.SetLogOutput(log_fd)

	go attachUSBIPServer()
	virtual_fido.Start(client)
}

func attachUSBIPServer() {
	time.Sleep(250 * time.Millisecond)
	if runtime.GOOS == "windows" {
		installUSBIPWindows()
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
	commandList := []string{"sudo", "usbip", "attach", "-r", "127.0.0.1", "-b", "2-2"}
	runCommand(commandList)
}

func installUSBIPWindows() {
	runCommand([]string{"./usbip/usbip.exe", "install", "-u"})
}

func attachUSBIPWindows() {
	runCommand([]string{"./usbip/usbip.exe", "attach", "-r", "127.0.0.1", "-b", "2-2"})
}
