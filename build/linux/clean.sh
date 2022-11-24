#!/bin/bash

set -e

rm -rf ./output
rm -rf ./app/build/bin
rm -rf ./app/frontend_dist
rm -rf ./frontend/build
rm -rf ./linux_pkg/bulwark-passkey.deb
rm -rf ./linux_pkg/bulwark-passkey/usr/bin/bulwark_passkey