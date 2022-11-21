Push-Location .\app
wails build -nsis -s -skipbindings
if (-not $?) {
    throw "App build failure"
}
Pop-Location