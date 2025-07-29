import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function FaixaBranca() {
  return (
    <View>

      <Text style={styles.title}>Faixa Branca - Shiro Obi</Text>
      <Text style={styles.subtitle}>🌱 O começo da jornada no Judô</Text>

      <Text style={styles.text}>
        A faixa branca representa a pureza, a humildade e a vontade de aprender.
        É o primeiro passo na caminhada do judoca, onde cada movimento é uma nova descoberta.
      </Text>

      <Text style={styles.sectionTitle}>🤝 Saudação no Judô (Rei)</Text>
      <Text style={styles.text}>
        A saudação é sinal de respeito. Sempre que iniciar ou encerrar uma prática, cumprimente seu parceiro e seu mestre.
      </Text>

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
