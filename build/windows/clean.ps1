
$files = ".\output",".\frontend\build",".\app\build\bin",".\app\frontend_dist"
foreach($file in $files) {
    if (Test-Path $file) {
        Remove-Item -Path $file -Recurse
    }
}