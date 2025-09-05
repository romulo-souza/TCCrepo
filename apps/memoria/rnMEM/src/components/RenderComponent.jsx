import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RenderComponent = ({ images, resolution, index }) => {
  // índice da imagem 
  const imageIndex = index % images.length;

  const iconOptions = ['camera', 'star', 'favorite'];

  return (
    <Card style={styles.card}>
      <Text style={styles.texto} variant="titleMedium">
        {resolution}
      </Text>
      <Image source={images[imageIndex]} style={styles.image} />
      <View style={styles.iconContainer}>
        {iconOptions.map((name, i) => (
          <Icon
            key={i}
            name={name}
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
