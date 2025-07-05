// src/navigation/StackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Graduacao from '../screens/Graduacao';
import Historia from '../screens/Historia';
import Noticias from '../screens/Noticias';
import Perfil from '../screens/Perfil';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{ title: 'Início' }} />
      <Stack.Screen name="Graduacao" component={Graduacao} options={{ title: 'Graduação' }} />
      <Stack.Screen name="Historia" component={Historia} options={{ title: 'História do Judô' }} />
      <Stack.Screen name="Noticias" component={Noticias} options={{ title: 'Notícias' }} />
      <Stack.Screen name="Perfil" component={Perfil} options={{ title: 'Meu Perfil' }} />
    </Stack.Navigator>
  );
}
