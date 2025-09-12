import GridLotties from './src/components/GridLotties';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  PaperProvider,
  MD3DarkTheme as DefaultTheme,
} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

const App = () => {
  const animations = [
    require('./assets/animations/lottie1.json'),
    require('./assets/animations/lottie2.json'),
    require('./assets/animations/lottie3.json'),
    require('./assets/animations/lottie4.json'),
    require('./assets/animations/lottie5.json'),
    require('./assets/animations/lottie6.json'),
    require('./assets/animations/lottie7.json'),
    require('./assets/animations/lottie8.json'),
    require('./assets/animations/lottie9.json'),
    require('./assets/animations/lottie10.json'),
    require('./assets/animations/lottie1.json'),
    require('./assets/animations/lottie2.json'),
    require('./assets/animations/lottie3.json'),
    require('./assets/animations/lottie4.json'),
    require('./assets/animations/lottie5.json'),
    require('./assets/animations/lottie9.json'),
    require('./assets/animations/lottie7.json'),
    require('./assets/animations/lottie8.json'),
  ];

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <GridLotties animations={animations} />
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
    marginBottom: 5,
  },
});
export default App;
