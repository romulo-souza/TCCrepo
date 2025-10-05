import subprocess
import time
import pandas as pd
import os

# VARIÁVEIS GLOBAIS
DURATION = 30          # duração de cada experimento (s)
SAMPLE_INTERVAL = 0.5  # intervalo entre coletas (s)
EXPERIMENTS = 30       # número de experimentos
PACKAGE_NAME = input("Digite o nome do pacote do app (ex: com.instagram.android): ").strip()

todas_amostras = []


def get_pss_memory(package_name):

    #Executa adb dumpsys meminfo e retorna o PSS TOTAL em MB
    command = ["adb", "shell", "dumpsys", "meminfo", package_name]
    result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

    output = result.stdout.splitlines()
    for line in output:
        if "TOTAL PSS" in line:
            parts = line.split()
            try:
                pss_memory = float(parts[2]) / 1024  # KB → MB
                #print(line) #debug
                print(f"PSS capturado: {pss_memory:.2f} MB")
                return pss_memory
            except (IndexError, ValueError):
                return None
    return None


def main():
    for exp in range(1, EXPERIMENTS + 1):
        print(f"\nIniciando experimento {exp}...")
        start_time = time.perf_counter()

        # calcular os tempos de coleta: 0.5, 1.0, 1.5 ... até DURATION
        sample_times = [round(i * SAMPLE_INTERVAL, 2) for i in range(1, int(DURATION / SAMPLE_INTERVAL) + 1)]

        for target_time in sample_times:
            # esperar até o momento exato da próxima amostra
            while (time.perf_counter() - start_time) < target_time:
                time.sleep(0.01) 

            # coleta memória
            pss = get_pss_memory(PACKAGE_NAME)
            if pss is not None:
                todas_amostras.append({
                    "experimento": exp,
                    "tempo": target_time,
                    "consumo_memoria": round(pss, 2)
                })

        amostras_exp = len([a for a in todas_amostras if a["experimento"] == exp])
        print(f"✅ Experimento {exp} finalizado. Amostras coletadas: {amostras_exp}")

    # salvar CSV
    df = pd.DataFrame(todas_amostras)
    output_file = "mem_experimentos.csv"
    df.to_csv(output_file, index=False)
    print("\nCSV salvo em:", os.path.abspath(output_file))
    print(f"Total de amostras coletadas: {len(todas_amostras)}")


if __name__ == "__main__":
    main()
