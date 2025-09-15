for ($i = 1; $i -le 30; $i++) {
    Write-Host "Execução $i de 30..."

    adb shell input tap 534 1145

    # Aguardar alguns segundos para a tela renderizar
    Start-Sleep -Seconds 2

    # Pressionar botão voltar
    adb shell input keyevent 4

    # Aguardar antes da próxima iteração
    Start-Sleep -Seconds 2
}
