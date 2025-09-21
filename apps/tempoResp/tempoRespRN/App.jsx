import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  PaperProvider,
  MD3DarkTheme as DefaultTheme,
  FAB,
  Text,
} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1E88E5',
  },
};

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Text variant="headlineLarge" style={styles.counter}>
            {counter}
          </Text>
          <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => {
              //capturar a latencia de entrada
              const startTime = performance.now();
              setCounter(counter + 1);
              const endTime = performance.now();
              const inputLag = endTime - startTime;
              console.log(`Latência de entrada: ${inputLag.toFixed(2)} ms`);
            }}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232324',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counter: {
    color: '#1E88E5',
    fontSize: 45,
    fontWeight: 'bold',
  },
  fab: {
    borderRadius: 16,
    position: 'absolute',
    right: 20,
    bottom: 70,
    backgroundColor: '#1E88E5',
  },
});

export default App;
