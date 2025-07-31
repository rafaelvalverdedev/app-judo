// App.tsx
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import TabNavigator from './src/navigation/TabNavigator';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
   
    'DMSans-Regular': require('./assets/fonts/DMSans-Regular.ttf'),
    'DMSans-Medium': require('./assets/fonts/DMSans-Medium.ttf'),
    'DMSans-Bold': require('./assets/fonts/DMSans-Bold.ttf'),
    'DMSans-ExtraBold': require('./assets/fonts/DMSans-ExtraBold.ttf'),
    
    'BitcountPropSingle': require('./assets/fonts/BitcountPropSingle-Medium.ttf'),
  });

  //Tratamento de erro de fonte
  useEffect(() => {
    if (fontError) {
      console.error('Erro ao carregar fontes:', fontError);
      // Mesmo com erro, esconde a splash screen para não travar o app
      SplashScreen.hideAsync();
    }
  }, [fontError]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Não renderiza se nem fontes carregaram nem houve erro
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <StatusBar style="light" />
      
      <View style={styles.statusBarBackground} />
      
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  statusBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 70, // Altura aproximada da status bar
    backgroundColor: '#6D0F0F',
    zIndex: -1,
  },
});
