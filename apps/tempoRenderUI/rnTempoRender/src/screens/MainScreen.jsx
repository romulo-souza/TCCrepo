import GridLotties from '../components/GridLotties';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

//Medir tempo de renderização
const onRenderCallback = (
  id,
  phase, // 'mount' ou 'update'
  actualDuration, // Tempo gasto renderizando
) => {
  if (phase === 'mount') {
    console.log(
      `Tempo de renderização (${phase}, ${id}): ${actualDuration.toFixed(
        2,
      )} ms`,
    );
  }
};

const MainScreen = () => {
  const animations = [
    require('../../assets/animations/lottie1.json'),
    require('../../assets/animations/lottie2.json'),
    require('../../assets/animations/lottie3.json'),
    require('../../assets/animations/lottie4.json'),
    require('../../assets/animations/lottie5.json'),
    require('../../assets/animations/lottie6.json'),
    require('../../assets/animations/lottie7.json'),
    require('../../assets/animations/lottie8.json'),
    require('../../assets/animations/lottie9.json'),
    require('../../assets/animations/lottie10.json'),
    require('../../assets/animations/lottie1.json'),
    require('../../assets/animations/lottie2.json'),
    require('../../assets/animations/lottie3.json'),
    require('../../assets/animations/lottie4.json'),
    require('../../assets/animations/lottie5.json'),
    require('../../assets/animations/lottie9.json'),
    require('../../assets/animations/lottie7.json'),
    require('../../assets/animations/lottie8.json'),
  ];

  return (
    <React.Profiler id="MainScreen" onRender={onRenderCallback}>
      <SafeAreaView style={styles.container}>
        <GridLotties animations={animations} />
      </SafeAreaView>
    </React.Profiler>
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
export default MainScreen;
