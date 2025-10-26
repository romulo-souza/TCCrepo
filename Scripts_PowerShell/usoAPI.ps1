# Coordenadas dos pontos
$pontos = @(
    @{x=528; y=960},
    @{x=540; y=1160},
    @{x=529; y=1360}
)

# Quantidade de toques em cada ponto
$toquesPorPonto = 30

# Delay em segundos
$delay = 0.6

# Loop principal
foreach ($ponto in $pontos) {
    for ($i = 1; $i -le $toquesPorPonto; $i++) {
        Write-Host "Toque $i em ($($ponto.x), $($ponto.y))"
        adb shell input tap $($ponto.x) $($ponto.y)
        Start-Sleep -Seconds $delay
    }
}

Write-Host "Todos os toques foram executados com sucesso!"
