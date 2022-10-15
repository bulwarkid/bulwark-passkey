
Remove-Item .\output -Recurse -ErrorAction Continue
Remove-Item .\frontend\build -Recurse -ErrorAction Continue
Remove-Item -Path .\app\build\bin -Recurse -ErrorAction Continue
Remove-Item -Path .\app\frontend_dist -Recurse -ErrorAction Continue