import subprocess
import time
import pandas as pd
import os

# VARIÁVEIS GLOBAIS
DURATION = 30  # duração de cada experimento (s)
SAMPLE_INTERVAL = 0.5  # intervalo entre coletas (s)
EXPERIMENTS = 30  # número de experimentos
PACKAGE_NAME = input("Digite o nome do pacote do app (ex: com.instagram.android): ").strip()

todas_amostras = []


def get_pss_memory(package_name):
    #Executa o comando adb dumpsys meminfo e retorna o PSS TOTAL em MB
    command = ["adb", "shell", "dumpsys", "meminfo", package_name]
    result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

    output = result.stdout.splitlines()
    for line in output:
        if "TOTAL PSS" in line:
            parts = line.split()
            try:
                pss_memory = float(parts[2]) / 1000  # KB → MB
                print(parts)  # debug
                print(f"PSS capturado: {pss_memory:.2f} MB\n")
                return pss_memory
            except (IndexError, ValueError):
                return None
    return None


def main():
    for exp in range(1, EXPERIMENTS + 1):
        print(f"\nIniciando experimento {exp}...")
        start_time = time.perf_counter()

        while time.perf_counter() - start_time < DURATION:
            loop_start = time.perf_counter()
            pss = get_pss_memory(PACKAGE_NAME)
            elapsed_time = time.perf_counter() - start_time
            print(elapsed_time)

            if pss is not None:
                # arredonda tempo para múltiplos do SAMPLE_INTERVAL (facilitar agrupamentos)
                rounded_time = round(elapsed_time / SAMPLE_INTERVAL) * SAMPLE_INTERVAL
                todas_amostras.append({
                    "experimento": exp,
                    "tempo": rounded_time,
                    "consumo_memoria": round(pss, 2)
                })

            # garante captura em intervalos fixos
            loop_duration = time.perf_counter() - loop_start
            remaining_time = SAMPLE_INTERVAL - loop_duration
            if remaining_time > 0:
                time.sleep(remaining_time)

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
