//go:build darwin

package mac

//#cgo LDFLAGS: -linstaller -Linstaller/
//#include <stdlib.h>
// void install();
import "C"

func InstallVirtualUSBDriver() {
	C.install()
}