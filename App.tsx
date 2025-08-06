// App.tsx - Versão para testar no Expo Go
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import TabNavigator from './src/navigation/TabNavigator';
import AnimatedSplash from './src/components/AnimatedSplash';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [showAnimatedSplash, setShowAnimatedSplash] = useState(true);
  const [appIsReady, setAppIsReady] = useState(false);
  
  const [fontsLoaded, fontError] = useFonts({
    'DMSans-Regular': require('./assets/fonts/DMSans-Regular.ttf'),
    'DMSans-Medium': require('./assets/fonts/DMSans-Medium.ttf'),
    'DMSans-Bold': require('./assets/fonts/DMSans-Bold.ttf'),
    'DMSans-ExtraBold': require('./assets/fonts/DMSans-ExtraBold.ttf'),
    'BitcountPropSingle': require('./assets/fonts/BitcountPropSingle-Medium.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        await SplashScreen.hideAsync();
        
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    if (fontsLoaded || fontError) {
      prepare();
    }
  }, [fontsLoaded, fontError]);

  const handleSplashFinish = useCallback(() => {
    setShowAnimatedSplash(false);
  }, []);


  if (!appIsReady) {
    return null;
  }

  // Mostra splash animada customizada
  if (showAnimatedSplash) {
    return <AnimatedSplash onFinish={handleSplashFinish} />;
  }

  // App principal
  return (
    <SafeAreaProvider>
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
    height: 70,
    backgroundColor: '#6D0F0F',
    zIndex: -1,
  },
});