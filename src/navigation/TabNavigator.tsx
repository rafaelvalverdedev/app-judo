// src/navigation/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Text, StyleSheet, Image, Pressable, StatusBar, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Texto } from '../components/Texto';
import { COLORS, FONT_SIZE, FONT_FAMILY } from '../theme/theme';

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
                <Texto style={styles.headerTitle}>
                  {TITULOS[route.name] || route.name.toUpperCase()}
                </Texto>
              </LinearGradient>

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
              android_ripple={{ color: '#8D99AE' }}
              onPress={props.onPress}
              style={props.style}
            >
              {props.children}
            </Pressable>
          ),

          tabBarLabel: ({ focused }: { focused: boolean }) => (
            <Texto style={focused ? styles.textFocused : styles.textUnfocused}>
              {route.name}
            </Texto>
          ),

          // Ícones personalizados
          tabBarIcon: ({ focused }: { focused: boolean }) => {
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
                key={`${focused ? 'focused' : 'unfocused'}-${route.name}`}
                animation={focused
                  ? {
                    0: { transform: [{ scale: 1 }] },
                    0.5: { transform: [{ scale: 1.25 }] },
                    1: { transform: [{ scale: 1 }] },
                  }
                  : undefined
                }
                iterationCount={focused ? 'infinite' : 1}
                duration={1000}
                useNativeDriver
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    height: 80,
  },

  headerTitle: {
    fontSize: FONT_SIZE.xlarge,
    position: 'relative',
    color: '#FFFFFF',
  },

  headerLogo: {
    position: 'relative',
    width: 60,
    height: 60,
    margin: 10,
  },

  iconFocused: {
    fontSize: 22,
    color: '#A81412',
  },

  iconUnfocused: {
    fontSize: 20,
    color: '#8D99AE',
  },

  textFocused: {
    fontSize: 16,
    color: '#A81412',
  },

  textUnfocused: {
    color: '#8D99AE',
    fontSize: 14,
  },

});