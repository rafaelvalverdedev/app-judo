// src/navigation/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Text, StyleSheet, Image, Pressable, StatusBar, SafeAreaView } from 'react-native'; // Importe StatusBar e SafeAreaView
import { LinearGradient } from 'expo-linear-gradient';

import * as Animatable from 'react-native-animatable';

import Home from '../screens/Home';
import Graduacao from '../screens/Graduacao';
import Historia from '../screens/Historia';
import Noticias from '../screens/Noticias';
import Perfil from '../screens/Perfil';

const Tab = createBottomTabNavigator();

const TITULOS: Record<string, string> = {
  Início: "CONDE KOMA",
  Perfil: "Meu Perfil",
  Notícias: "Notícias",
  Graduação: "Graduação",
  História: "História do Judô",
};

export default function TabNavigator() {
  return (
    <>
      {/* Configuração da Barra de Status para combinar com o header */}
      <StatusBar backgroundColor="#6D0F0F" barStyle="light-content" />

      <Tab.Navigator
        initialRouteName="Início"
        screenOptions={({ route, navigation }) => ({
          // Header personalizado
          header: () => {
            return (
              // SafeAreaView para garantir que o cabeçalho esteja abaixo da barra de status
              <SafeAreaView style={styles.safeArea}>
                <LinearGradient
                  colors={['#6D0F0F', '#A81412']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                  style={styles.header}
                >
                  {route.name === 'Início' && (
                    <Image style={styles.headerLogo}
                      source={require('../../assets/logo/logo.png')}
                      resizeMode="cover"
                    />
                  )}
                  <Text style={styles.headerTitle}>
                    {TITULOS[route.name] || route.name.toUpperCase()}
                  </Text>
                </LinearGradient>
              </SafeAreaView>
            );
          },

          // Tab bar inferior personalizada
          tabBarStyle: {
            position: 'absolute',
            height: 65,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            backgroundColor: '#EDF2F4',
            elevation: 10, // sombra no Android
            overflow: 'hidden',
          },

          tabBarButton: (props) => (
            <Pressable
              {...props}
              android_ripple={{ color: '#8D99AE' }} // desativa o ripple nativo
            />
          ),

          tabBarLabel: ({ focused }) => (
            <Text style={focused ? styles.textFocused : styles.textUnfocused}>
              {route.name}
            </Text>
          ),

          // Ícones personalizados
          tabBarIcon: ({ focused }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'home';

            switch (route.name) {
              case 'Início':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'Graduação':
                iconName = focused ? 'medal' : 'medal-outline';
                break;
              case 'História':
                iconName = focused ? 'heart' : 'heart-outline';
                break;
              case 'Notícias':
                iconName = focused ? 'newspaper' : 'newspaper-outline';
                break;
              case 'Perfil':
                iconName = focused ? 'person' : 'person-outline';
                break;
            }

            const iconStyle = focused ? styles.iconFocused : styles.iconUnfocused;

            return (
              <Animatable.View

                key={focused.toString() + route.name} // força recriação para bounceIn
                animation={focused
                  ? {
                    0: { transform: [{ scale: 1 }] },
                    0.5: { transform: [{ scale: 1.25 }] }, // Ajustado para 1.25 para um salto mais sutil
                    1: { transform: [{ scale: 1 }] },
                  }
                  : undefined
                }
                iterationCount={focused ? 'infinite' : 1} // 'infinite' para focado, 1 para desfocado
                duration={1000} // <-- **MUDE AQUI: Duração de 1 segundo (1000ms)**
                useNativeDriver // <-- **ADICIONE AQUI: Para melhor desempenho da animação**
              >
                <Ionicons name={iconName} style={iconStyle} />
              </Animatable.View>
            );
          },
        })}
      >
        <Tab.Screen name="Início" component={Home} />
        <Tab.Screen name="Graduação" component={Graduacao} />
        <Tab.Screen name="História" component={Historia} />
        <Tab.Screen name="Notícias" component={Noticias} />
        <Tab.Screen name="Perfil" component={Perfil} />
      </Tab.Navigator >
    </>
  );
}

const styles = StyleSheet.create({
  // Estilo para a SafeAreaView que envolve o cabeçalho
  safeArea: {
    backgroundColor: '#6D0F0F', // Garante que a área segura tenha a cor do cabeçalho
    borderBottomRightRadius: 50, // Mantém o border radius na parte inferior direita da safeArea
    top: 0,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    height: 80, // Altura ajustada para compensar o padding da SafeAreaView
    // paddingTop foi removido aqui, pois a SafeAreaView lida com isso
  },

  headerTitle: {
    position: 'relative',
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  headerLogo: {
    position: 'relative',
    width: 50,
    height: 50,
    margin: 10,
  },

  iconFocused: {
    color: '#A81412',
    fontSize: 22,
  },

  iconUnfocused: {
    fontSize: 20,
    color: '#8D99AE',
  },

  textFocused: {
    color: '#A81412',
    fontSize: 14,
  },

  textUnfocused: {
    color: '#8D99AE',
    fontSize: 14,
  },
});