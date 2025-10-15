import subprocess
import time
import csv
import re

# Configurações
PACKAGE_NAME = "com.rncpu"
MAIN_ACTIVITY = ".MainActivity"
TEMPO_EXEC = 30    
N_EXPERIMENTOS = 30   
CSV_OUTPUT = "jankyFramesRN.csv"


def run_cmd(cmd):
    #Executa comando no shell 
    result = subprocess.run(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    return result.stdout.decode("utf-8", errors="ignore")

def reset_gfxinfo():
    #Reseta métricas de gfxinfo do app
    run_cmd(f"adb shell dumpsys gfxinfo {PACKAGE_NAME} reset")

def start_app():
    #Inicia o app no dispositivo (hot start)
    run_cmd(f"adb shell am start -W {PACKAGE_NAME}/{MAIN_ACTIVITY}")

def send_home():
    #Simula tecla HOME para parar o app (parar renderização de frames do app)
    run_cmd("adb shell input keyevent 3")

def get_janky_frames():
    #Retorna número de janky frames
    output = run_cmd(f"adb shell dumpsys gfxinfo {PACKAGE_NAME}")
    match_janky = re.search(r"Janky frames:\s+(\d+)", output)
    if match_janky:
        return int(match_janky.group(1))
    return 0


def main():
    resultados = []

    for i in range(1, N_EXPERIMENTOS + 1):
        print(f"\nIniciando experimento {i}...")
        
        reset_gfxinfo()
        start_app()
        
        print(f"Executando por {TEMPO_EXEC} segundos...")
        time.sleep(TEMPO_EXEC)
        
        send_home()
        janky = get_janky_frames()
        
        print(f"✅ Experimento {i} -> Janky frames: {janky}")
        resultados.append([i, janky])

    # Salvar em CSV
    with open(CSV_OUTPUT, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["experimento", "janky_frames"])
        writer.writerows(resultados)

    print(f"\nResultados salvos em {CSV_OUTPUT}")


if __name__ == "__main__":
    main()
