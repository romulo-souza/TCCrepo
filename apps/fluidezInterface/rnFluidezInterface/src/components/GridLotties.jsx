// GridLotties.js
import React from 'react';
import { FlatList, View, StyleSheet, useWindowDimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const COLUMNS = 3;

const GridLotties = ({ animations = [] }) => {
  const { width } = useWindowDimensions();
  const ITEM_SIZE = Math.floor(width / COLUMNS);

  return (
    <FlatList
      data={animations}
      keyExtractor={(_, index) => String(index)}
      numColumns={COLUMNS}
      scrollEnabled={false} // sem scroll
      renderItem={({ item }) => (
        <View style={[styles.item, { width: ITEM_SIZE, height: ITEM_SIZE }]}>
          <LottieView
            source={item}
            autoPlay
            loop
            style={{ width: '100%', height: '100%' }}
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 4,
  },
});

export default GridLotties;
