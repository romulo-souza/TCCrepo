# Configurações
$Package = "com.rncpu"
$Activity = ".MainActivity"

# Função para iniciar o app (warm start)
function Start-App {
    Write-Host "Iniciando app..."
    adb shell am start -W "$Package/$Activity"
    Start-Sleep -Seconds 2
}

# Função para swipe na tela
function Swipe-Screen {
    param (
        [string]$Direction = "down"
    )

    if ($Direction -eq "down") {
        # Swipe de cima para baixo
        adb shell input swipe 500 1500 500 500 210
    } elseif ($Direction -eq "up") {
        # Swipe de baixo para cima
        adb shell input swipe 500 500 500 1500 210
    }
}

# Iniciar app
Start-App

Write-Host "Loop infinito de swipe iniciado. Use Ctrl+C para parar."

# Loop infinito alternando entre descer e subir
while ($true) {
    # Descer
    for ($i = 0; $i -lt 6; $i++) {  # ajuste 10 conforme o tamanho da lista
        Swipe-Screen -Direction "down"
        Start-Sleep -Milliseconds 60
    }

    # Subir
    for ($i = 0; $i -lt 6; $i++) {
        Swipe-Screen -Direction "up"
        Start-Sleep -Milliseconds 60
    }
}
