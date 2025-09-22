$repeticoes = 30  

for ($i = 1; $i -le $repeticoes; $i++) {
    adb shell input tap 950 2082
    Start-Sleep -Seconds 1
}
