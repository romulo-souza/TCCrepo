import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuxScreen from './src/screens/AuxScreen';
import MainScreen from './src/screens/MainScreen';
import {
  PaperProvider,
  MD3DarkTheme as DefaultTheme,
} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1E88E5',
    onPrimary: '#FFFFFF',
  },
};
const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="AuxScreen"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="AuxScreen" component={AuxScreen} />
            <Stack.Screen name="MainScreen" component={MainScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
