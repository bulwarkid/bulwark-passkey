
Remove-Item .\output -Recurse -ErrorAction Ignore
Remove-Item .\frontend\build -Recurse -ErrorAction Ignore
Remove-Item -Path .\app\build\bin -Recurse -ErrorAction Ignore
Remove-Item -Path .\app\frontend_dist -Recurse -ErrorAction Ignore