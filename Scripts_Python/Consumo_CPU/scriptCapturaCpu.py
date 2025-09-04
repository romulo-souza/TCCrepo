import subprocess
import time
import pandas as pd
import os

# VARIÁVEIS GLOBAIS
DURATION = 30 # segundos por experimento
SAMPLE_INTERVAL = 0.5 # intervalo entre coletas (s)
EXPERIMENTS = 30
PID = input("Digite o PID do processo: ").strip()

todas_amostras = []

def get_cpu_usage(pid):
    #Coleta o uso de CPU do PID via adb top
    result = subprocess.run(
        ["adb", "shell", "top", "-p", str(pid), "-n", "1"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )
    output = result.stdout.splitlines()
    for line in output:
        if str(pid) in line:
            parts = line.split()
            print(parts[8])
            try:
                return float(parts[8]) # Coluna de CPU no "top"
            except (IndexError, ValueError):
                return None
    return None

def main():
    for exp in range(1, EXPERIMENTS + 1):
        print(f"Iniciando experimento {exp}...")
        start_time = time.perf_counter() 
        
        # Executa o loop enquanto o tempo decorrido desde o início for menor que a duração definida
        while time.perf_counter() - start_time < DURATION:
            loop_start = time.perf_counter()
            cpu = get_cpu_usage(PID)
            elapsed_time = time.perf_counter() - start_time
            
            if cpu is not None:
                # Arredonda o tempo para múltiplos de SAMPLE_INTERVAL para possibilitar agrupamento por tempo (calcular uso médio de cpu por tempo)
                rounded_time = round(elapsed_time / SAMPLE_INTERVAL) * SAMPLE_INTERVAL
                todas_amostras.append({
                    "experimento": exp,
                    "tempo": rounded_time,
                    "cpu": round(cpu, 2)
                })

            # garantir que as capturas ocorram em intervalos regulares de aproximadamente 0.5s
            loop_duration = time.perf_counter() - loop_start
            remaining_time = SAMPLE_INTERVAL - loop_duration
            if remaining_time > 0:
                time.sleep(remaining_time)
        
        amostras_exp = len([a for a in todas_amostras if a["experimento"] == exp])
        print(f"✅ Experimento {exp} finalizado. Amostras coletadas: {amostras_exp}")

    #transformar os dados coletados em um dataframe e exportar para csv (para análise posterior)
    df = pd.DataFrame(todas_amostras)
    output_file = "cpu_experimentos.csv"
    df.to_csv(output_file, index=False)
    print("CSV salvo em:", os.path.abspath(output_file))
    print(f"Total de amostras coletadas: {len(todas_amostras)}")

if __name__ == "__main__":
    main()
