import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  PaperProvider,
  MD3DarkTheme as DefaultTheme,
} from 'react-native-paper';
import RenderComponent from './src/components/RenderComponent';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

// Imagens separadas por resolução
const resolutions = {
  '640x960': [
    require('./assets/imagens/640x960/img1.jpg'),
    require('./assets/imagens/640x960/img2.jpg'),
    require('./assets/imagens/640x960/img3.jpg'),
    require('./assets/imagens/640x960/img4.jpg'),
    require('./assets/imagens/640x960/img5.jpg'),
    require('./assets/imagens/640x960/img6.jpg'),
    require('./assets/imagens/640x960/img7.jpg'),
    require('./assets/imagens/640x960/img8.jpg'),
    require('./assets/imagens/640x960/img9.jpg'),
    require('./assets/imagens/640x960/img10.jpg'),
  ],
  '1280x1920': [
    require('./assets/imagens/1280x1920/img1.jpg'),
    require('./assets/imagens/1280x1920/img2.jpg'),
    require('./assets/imagens/1280x1920/img3.jpg'),
    require('./assets/imagens/1280x1920/img4.jpg'),
    require('./assets/imagens/1280x1920/img5.jpg'),
    require('./assets/imagens/1280x1920/img6.jpg'),
    require('./assets/imagens/1280x1920/img7.jpg'),
    require('./assets/imagens/1280x1920/img8.jpg'),
    require('./assets/imagens/1280x1920/img9.jpg'),
    require('./assets/imagens/1280x1920/img10.jpg'),
  ],
  '1920x2880': [
    require('./assets/imagens/1920x2880/img1.jpg'),
    require('./assets/imagens/1920x2880/img2.jpg'),
    require('./assets/imagens/1920x2880/img3.jpg'),
    require('./assets/imagens/1920x2880/img4.jpg'),
    require('./assets/imagens/1920x2880/img5.jpg'),
    require('./assets/imagens/1920x2880/img6.jpg'),
    require('./assets/imagens/1920x2880/img7.jpg'),
    require('./assets/imagens/1920x2880/img8.jpg'),
    require('./assets/imagens/1920x2880/img9.jpg'),
    require('./assets/imagens/1920x2880/img10.jpg'),
  ],
};

// Gera 30 cards → 10 de cada resolução, cada card recebe seu próprio array
const data = Array.from({ length: 30 }, (_, i) => {
  if (i < 10)
    return {
      id: i.toString(),
      resolution: '640x960',
      images: resolutions['640x960'],
    };
  if (i < 20)
    return {
      id: i.toString(),
      resolution: '1280x1920',
      images: resolutions['1280x1920'],
    };
  return {
    id: i.toString(),
    resolution: '1920x2880',
    images: resolutions['1920x2880'],
  };
});

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <RenderComponent
                resolution={item.resolution}
                images={item.images}
              />
            )}
            keyExtractor={item => item.id}
            numColumns={2} // opcional, 1 card por linha
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 8,
    backgroundColor: '#4c4c4f',
  },
});
