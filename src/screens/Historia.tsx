import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Historia() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>História do Judô: Jigoro Kano, origens, evolução...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 16 },
});
