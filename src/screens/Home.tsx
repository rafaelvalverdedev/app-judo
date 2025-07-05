import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export default function Home({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao App de Judô</Text>
      
      {/* <Button title="Ver Graduação" onPress={() => navigation.navigate('Graduacao')} />
      <Button title="História do Judô" onPress={() => navigation.navigate('Historia')} />
      <Button title="Notícias" onPress={() => navigation.navigate('Noticias')} />
      <Button title="Meu Perfil" onPress={() => navigation.navigate('Perfil')} /> */}
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
});
