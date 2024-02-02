# Bulwark Passkey

This is the repo for the frontend of [Bulwark Passkey](https://bulwark.id).

## Build Linux

### Requirement

You need to install before :
* go stack
* npm stack
* [protobuf binary](https://github.com/protocolbuffers/protobuf)

### Generic

To build generic packages
```
make build
```
Binary is build in output/ directory

### Debian Sid

```
#Defaut package ecosystem
sudo apt install golang-go npm
#Wails and its requirements
sudo apt install golang-github-gotk3-gotk3-dev libwebkit2gtk-4.0-dev
go install github.com/wailsapp/wails/v2/cmd/wails@latest
export PATH=$PATH:~/go/bin

#Protocol Buffers and its requirements
sudo apt install protobuf-compiler protoc-gen-go

#Building process
git clone https://github.com/bulwarkid/bulwark-passkey
cd bulwark-passkey/frontend
npm install
cd ..
```
To build only the binary
```
make build
```
Binary is available at output/bulwark-passkey.deb

To package in a compliant package Debian
```
make build dpkg
```

Package is available at output/bulwark-passkey.deb
