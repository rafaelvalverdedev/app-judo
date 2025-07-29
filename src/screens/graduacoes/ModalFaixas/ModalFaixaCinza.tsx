import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function FaixaCinza() {
  return (
    <View>

      <Text style={styles.title}>Faixa</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  ContainerFaixaBranca: {
    backgroundColor: 'blue',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 18,
    marginBottom: 15,
    fontStyle: 'italic',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 5,
  },

  text: {
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 22,
  },

  footer: {
    marginTop: 30,
    fontStyle: 'italic',
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});
