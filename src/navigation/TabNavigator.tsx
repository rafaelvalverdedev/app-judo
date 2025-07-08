// src/navigation/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Home from '../screens/Home';
import Graduacao from '../screens/Graduacao';
import Historia from '../screens/Historia';
import Noticias from '../screens/Noticias';
import Perfil from '../screens/Perfil';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Início"
      screenOptions={({ route, navigation }) => ({
        // Header personalizado
        header: () => {
          const insets = useSafeAreaInsets();
          return (
            <LinearGradient
              colors={['#DF221E', '#A81412']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.header, { paddingTop: insets.top }]}
            >
              <Text style={styles.headerTitle}>
                {route.name.toUpperCase()}
              </Text>
            </LinearGradient>
          );
        },


        headerStyle: {
          backgroundColor: '#DF221E', // fundo do topo
          elevation: 1,                // sem sombra no Android
          shadowOpacity: 5,            // sem sombra no iOS
        },
        headerTintColor: '#FFFFFF',    // cor do texto e ícones no header
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          color: '#FFFFFF',
        },

        headerTitleAlign: 'center',

        // Tab bar inferior personalizada
        tabBarStyle: {
          position: 'absolute',
          height: 65,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 5,
          paddingTop: 5,
          backgroundColor: '#DF221E',
          elevation: 10, // sombra no Android
          shadowColor: '#000', // sombra no iOS
          shadowOpacity: 0.15,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 6,
          overflow: 'hidden',
        },

        tabBarActiveTintColor: '#6D0F0F',
        tabBarInactiveTintColor: '#ffffff',

        tabBarLabelStyle: {
          fontSize: 14,
        },

        tabBarShowLabel: true,

        tabBarItemStyle: {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 0,
        },

        // Ícones personalizados
        tabBarIcon: ({ focused, color, size }) => {
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

          return (
            <Ionicons
              name={iconName}
              style={focused ? styles.iconFocused : styles.iconUnfocused}
            />
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
  );
}


const styles = StyleSheet.create({
  header: {
    height: 100,
    justifyContent: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1.8,
    left: 30,
    top: -5,
  },

  iconFocused: {
    color: '#6D0F0F',
    fontSize: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,
  },

  iconUnfocused: {
    fontSize: 20,
    color: '#ffffff',
  },

});