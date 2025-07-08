// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/TabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Updates from 'expo-updates';


useEffect(() => {
  async function checkForUpdates() {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync(); // reinicia com o novo bundle
      }
    } catch (e) {
      console.log('Erro ao buscar atualização:', e);
    }
  }

  checkForUpdates();
}, []);

SplashScreen.preventAutoHideAsync(); // evita ocultar automaticamente

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(async () => {
      setIsReady(true);
      await SplashScreen.hideAsync(); // esconde manualmente
    }, 3000); // 3 segundos de delay
  }, []);

  if (!isReady) return null;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
