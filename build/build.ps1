
Push-Location .\frontend
npm run build
Pop-Location

Copy-Item -Path .\frontend\build -Destination .\app\frontend_dist -Recurse

Push-Location .\app
wails build -s -skipbindings -debug
Pop-Location

New-Item .\output -ItemType Directory
Copy-Item ".\app\build\bin\bulwark_passkey.exe" -Destination .\output
Copy-Item ".\external\usbip" -Destination .\output -Recurse