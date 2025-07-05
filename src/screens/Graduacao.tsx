import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Graduacao() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Aqui você verá as faixas, requisitos e orientações.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 16 },
});
