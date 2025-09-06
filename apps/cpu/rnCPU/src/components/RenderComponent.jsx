import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RenderComponent = ({ images, resolution }) => {
  // Começa de um índice aleatório
  const [imageIndex, setImageIndex] = useState(
    Math.floor(Math.random() * images.length),
  );

  // Ícones disponíveis
  const iconOptions = [
    'camera',
    'star',
    'favorite',
    'home',
    'settings',
    'email',
    'delete',
  ];
  // Índices dos 3 ícones, começam aleatórios
  const [iconIndexes, setIconIndexes] = useState([
    Math.floor(Math.random() * iconOptions.length),
    Math.floor(Math.random() * iconOptions.length),
    Math.floor(Math.random() * iconOptions.length),
  ]);

  // Troca a imagem e os ícones a cada 600ms (variar tempo)
  useEffect(() => {
    const interval = setInterval(() => {
      //Avança de forma circular pelas imagens
      setImageIndex(prev => (prev + 1) % images.length);
      setIconIndexes(
        iconIndexes.map(() => Math.floor(Math.random() * iconOptions.length)),
      );
    }, 600);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <Card style={styles.card}>
      <Text style={styles.texto} variant="titleMedium">
        {resolution}
      </Text>
      <Image source={images[imageIndex]} style={styles.image} />
      <View style={styles.iconContainer}>
        {iconIndexes.map((idx, i) => (
          <Icon
            key={i}
            name={iconOptions[idx]}
            size={24}
            color="#47aa33ff"
            style={{ marginHorizontal: 5 }}
          />
        ))}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 7,
    borderRadius: 12,
    elevation: 6,
    alignItems: 'center',
    backgroundColor: '#22222f',
  },
  image: {
    width: 155,
    height: 170,
    borderRadius: 8,
    marginVertical: 5,
    resizeMode: 'cover',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  texto: {
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});

export default RenderComponent;
