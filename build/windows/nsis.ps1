Push-Location .\app
wails build -nsis -s -skipbindings -debug
if (-not $?) {
    throw "App build failure"
}
Pop-Location