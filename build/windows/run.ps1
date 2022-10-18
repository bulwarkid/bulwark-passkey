
Push-Location .\output
if (-not (Test-Path -Path .\log.txt)) {
    New-Item -Path .\log.txt -ItemType File
}
Start-Process .\bulwark_passkey.exe
Get-Content -Path .\log.txt -Wait
Pop-Location