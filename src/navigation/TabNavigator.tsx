// src/navigation/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import Home from '../screens/Home';
import Graduacao from '../screens/Graduacao';
import Historia from '../screens/Historia';
import Noticias from '../screens/Noticias';
import Perfil from '../screens/Perfil';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route, navigation }) => ({
        // Header personalizado
        headerStyle: {
          backgroundColor: '#ff6b6b',
          height: 100,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: 'bold',
          color: '#fff',
        },
        headerTitleAlign: 'center',

        // Tab bar personalizada
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 8,
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 80,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          paddingBottom: 10,
          paddingTop: 10,
        },

        tabBarActiveTintColor: '#ff6b6b',
        tabBarInactiveTintColor: '#999',

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 5,
        },

        tabBarItemStyle: {
          borderRadius: 10,
          marginHorizontal: 5,
        },

        // Ícones personalizados
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Graduacao':
              iconName = focused ? 'medal' : 'medal-outline';
              break;
            case 'Historia':
              iconName = focused ? 'heart' : 'heart-outline';
              break;
            case 'Noticias':
              iconName = focused ? 'newspaper' : 'newspaper-outline';
              break;
            case 'Perfil':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return (
            <Ionicons
              name={iconName}
              size={28}
              color={focused ? '#ff7f50' : '#ccc'}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Graduacao" component={Graduacao} />
      <Tab.Screen name="Historia" component={Historia} />
      <Tab.Screen name="Noticias" component={Noticias} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator >
  );
}
