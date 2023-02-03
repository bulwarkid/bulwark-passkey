//go:build !darwin
package mac

func InstallVirtualUSBDriver() {
	// No-op since we aren't on MacOS
}