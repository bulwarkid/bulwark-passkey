#!/bin/bash

cd frontend
npm run build
cd ..

cp -r frontend/build app/frontend_dist
cd app
wails build -s -skipbindings -debug
cd ..
mkdir output
mv app/build/bin/Bulwark\ Passkey.app output/