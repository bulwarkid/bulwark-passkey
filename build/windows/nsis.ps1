Push-Location .\app
wails build -nsis -s -skipbindings -webview2 embed
if (-not $?) {
    throw "App build failure"
}
Pop-Location