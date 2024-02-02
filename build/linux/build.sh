#!/bin/bash

set -e

cd frontend
mkdir -p src/proto || true
npm run build
cd ..

cp -r frontend/build app/frontend_dist
cd app
wails build -s -skipbindings -debug
cd ..
mkdir output
mv app/build/bin/bulwark_passkey output/