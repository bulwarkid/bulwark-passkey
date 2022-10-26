package main

import (
	"encoding/json"
	"os"
	"path/filepath"
)

var localVaultType string = "local"
var accountVaultType string = "account"

type VaultFile struct {
	VaultType string `json:"type"`
	Data      []byte `json:"data"`
}

func configDir() string {
	configDirRoot, err := os.UserConfigDir()
	checkErr(err, "Could not get user config directory")
	return filepath.Join(configDirRoot, "BulwarkPasskey")
}

func vaultFilename() string {
	configDir := configDir()
	return filepath.Join(configDir, "vault.json")
}

func saveVaultToFile(vaultFile VaultFile) {
	data, err := json.Marshal(vaultFile)
	checkErr(err, "Could not serialize JSON")
	configDir := configDir()
	err = os.Mkdir(configDir, 0700)
	if !os.IsExist(err) {
		checkErr(err, "Could not create config directory")
	}
	vaultFilename := vaultFilename()
	err = os.WriteFile(vaultFilename, data, 0700)
	checkErr(err, "Could not write vault file")
}

func readVaultFromFile() *VaultFile {
	data, err := os.ReadFile(vaultFilename())
	if os.IsNotExist(err) {
		return nil
	}
	checkErr(err, "Could not read vault data")
	var vaultFile VaultFile
	err = json.Unmarshal(data, &vaultFile)
	checkErr(err, "Could not deserialize vault file")
	return &vaultFile
}
