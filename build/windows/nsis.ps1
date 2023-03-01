Push-Location .\app
makensis.exe /DARG_WAILS_AMD64_BINARY=..\..\bin\bulwark_passkey.exe build/windows/installer/project.nsi
if (-not $?) {
    throw "App build failure"
}
Pop-Location