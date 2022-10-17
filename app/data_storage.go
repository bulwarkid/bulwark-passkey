package main

import (
	"os"
	"path/filepath"
)

func configDir() string {
	configDirRoot, err := os.UserConfigDir()
	checkErr(err, "Could not get user config directory")
	return filepath.Join(configDirRoot, "BulwarkPasskey")
}

func vaultFilename() string {
	configDir := configDir()
	return filepath.Join(configDir, "vault.json")
}

func saveVaultToFile(data []byte) {
	configDir := configDir()
	err := os.Mkdir(configDir, 0700)
	if !os.IsExist(err) {
		checkErr(err, "Could not create config directory")
	}
	vaultFilename := vaultFilename()
	err = os.WriteFile(vaultFilename, data, 0700)
	checkErr(err, "Could not write vault file")
}

func readVaultFromFile() []byte {
	data, err := os.ReadFile(vaultFilename())
	if os.IsNotExist(err) {
		return nil
	}
	checkErr(err, "Could not read vault data")
	return data
}
