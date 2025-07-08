import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export default function Home({ navigation }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>

      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo ao App de Judô</Text>

        <Button title="Ver Graduação" onPress={() => navigation.navigate('Graduação')} />
        <Button title="História do Judô" onPress={() => navigation.navigate('História')} />
        <Button title="Notícias" onPress={() => navigation.navigate('Notícias')} />
        <Button title="Meu Perfil" onPress={() => navigation.navigate('Perfil')} />

      </View>

    </ScrollView>



  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
});
