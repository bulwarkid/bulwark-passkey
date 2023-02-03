#!/bin/bash

set -e


cd frontend
npm run build
cd ..
cp -r frontend/build app/frontend_dist

cd app
CONFIG_DIR="build/darwin"
APP_PATH="build/bin/Bulwark Passkey.app"
# TODO: Don't just use local app certificate in keychain for signing
APP_CERTIFICATE_NAME="E191A2286FBE73BD20E7417959C7A4F429B0C4C5" 
wails build -s -skipbindings -debug
mkdir -p "$APP_PATH/Contents/Library/SystemExtensions" && cp -r "$CONFIG_DIR/id.bulwark.VirtualUSBDriver.driver.dext" "$APP_PATH/Contents/Library/SystemExtensions"
mkdir -p "$APP_PATH/Contents/Frameworks" && cp "mac/installer/libinstaller.dylib" "$APP_PATH/Contents/Frameworks"
cp "$CONFIG_DIR/profile.provisionprofile" "$APP_PATH/Contents/embedded.provisionprofile"
# TODO: See if we can fix the libinstaller.dylib load path before this step
install_name_tool -change libinstaller.dylib @rpath/libinstaller.dylib "$APP_PATH/Contents/MacOS/Bulwark Passkey"
install_name_tool -add_rpath @loader_path/../Frameworks "$APP_PATH/Contents/MacOS/Bulwark Passkey"
codesign --force --sign "$APP_CERTIFICATE_NAME" --options=runtime --entitlements "$CONFIG_DIR/app.entitlements" --timestamp=none --verbose --generate-entitlement-der "$APP_PATH"
cd ..

mkdir -p output && mv "app/$APP_PATH" output/