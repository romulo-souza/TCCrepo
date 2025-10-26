import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const IP_API = '192.168.15.3'; // IP (IPv4) do servidor
const PORTA = 3000;

const App = () => {
  const fetchData = async tamanhoKB => {
    const url = `http://${IP_API}:${PORTA}/data/${tamanhoKB}`;
    try {
      const start = performance.now();
      const response = await fetch(url);
      const end = performance.now();

      const data = await response.json();

      console.log(`=== Requisição ${tamanhoKB} KB ===`);
      console.log(`Tempo de resposta: ${(end - start).toFixed(2)} ms`);
      console.log(`Tamanho da string: ${data.data.length} chars`);
      console.log('------------------------------------');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>
          Escolha o tamanho do JSON retornado pela API
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => fetchData(1)}>
          <Text style={styles.buttonText}>1 KB</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => fetchData(10)}>
          <Text style={styles.buttonText}>10 KB</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => fetchData(100)}>
          <Text style={styles.buttonText}>100 KB</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232324',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  button: {
    backgroundColor: '#1E88E5',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 16,
    marginVertical: 10,
    width: '55%',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 13,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
