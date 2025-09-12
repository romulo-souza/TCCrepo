# Configurações
$Package = "com.example.flutter_cpu"
$Activity = ".MainActivity"

# Função para iniciar o app (warm start)
function Start-App {
    Write-Host "Iniciando app..."
    adb shell am start -W "$Package/$Activity"
}

# Iniciar app
Start-App

Write-Host "App iniciado. Aguardando 30 segundos..."
Start-Sleep -Seconds 30

# Pressionar tecla Home
Write-Host "Voltando para a tela inicial..."
adb shell input keyevent 3   # KEYCODE_HOME

Write-Host "Finalizado!"
