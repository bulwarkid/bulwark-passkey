# Bulwark Passkey

This is the repo for the frontend of [Bulwark Passkey](https://bulwark.id).

## Build Linux

### Generic

To build generic packages
```
make build
```
Binary is build in output/ directory

### Debian

To provide a package compliant to Debian Like
```
make build dpkg
```

Package is available as output/bulwark-passkey.deb
