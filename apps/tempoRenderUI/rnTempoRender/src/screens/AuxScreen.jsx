import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const AuxScreen = () => {
  const navigation = useNavigation();
  const goToMain = () => {
    navigation.navigate('MainScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button mode="contained" onPress={goToMain}>
        Navegar para Tela Principal
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232324',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default AuxScreen;
