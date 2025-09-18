import subprocess
import csv
import time

# Configurações
PACOTE = " com.example.flutter_cpu"  
ATIVIDADE = ".MainActivity"  
NUM_EXPERIMENTOS = 3
CSV_OUTPUT = "resultados_inicializacao.csv"

def executar_comando(cmd):
    #Executa um comando no terminal e retorna a saída
    resultado = subprocess.run(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    return resultado.stdout.decode("utf-8")

def extrair_total_time(saida):
    #Extrai o valor de TotalTime da saída do adb
    for linha in saida.splitlines():
        if "TotalTime" in linha:
            valor = linha.split(":")[1].strip()
            return int(valor)
    return None

def executar_cold_start():
    cmd = f"adb shell am start -S -W {PACOTE}/{ATIVIDADE}"
    saida = executar_comando(cmd)
    return extrair_total_time(saida)

def executar_warm_start():
    cmd = f"adb shell am start -W {PACOTE}/{ATIVIDADE}"
    saida = executar_comando(cmd)
    return extrair_total_time(saida)

def executar_hot_start():
    cmd = f"adb shell am start -W {PACOTE}/{ATIVIDADE}"
    saida = executar_comando(cmd)
    return extrair_total_time(saida)

def pressionar_botao(codigo):
    #Simula pressionar um botão de navegação no dispositivo
    executar_comando(f"adb shell input keyevent {codigo}")

def main():
    resultados = []

    for i in range(1, NUM_EXPERIMENTOS + 1):
        # Cold Start
        tempo = executar_cold_start()
        resultados.append((i, "cold", tempo))
        # Fecha o app (botão voltar)
        pressionar_botao(4)
        time.sleep(2)

        # Warm Start
        tempo = executar_warm_start()
        resultados.append((i, "warm", tempo))
        pressionar_botao(4)
        time.sleep(2)

        # Hot Start
        executar_warm_start()  # abre o app
        pressionar_botao(3)    # botão Home (vai pra segundo plano)
        time.sleep(1)
        tempo = executar_hot_start()
        resultados.append((i, "hot", tempo))
        pressionar_botao(4)    # fecha o app
        time.sleep(2)

        print(f"Experimento {i} concluído.")

    # Salva resultados em CSV
    with open(CSV_OUTPUT, "w", newline="", encoding="utf-8") as f:
        escritor = csv.writer(f)
        escritor.writerow(["experimento", "tipo_inicializacao", "tempo"])
        escritor.writerows(resultados)

    print(f"\nColeta finalizada! Resultados salvos em {CSV_OUTPUT}")

if __name__ == "__main__":
    main()
