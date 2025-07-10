import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function Historia() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Image
        source={require('../../assets/jigoro-kano.jpg')}
        style={styles.imagem}
        resizeMode="cover"
      /> */}

      <Text style={styles.titulo}>Jigoro Kano — Fundador do Judô</Text>

      <Text style={styles.texto}>
        O Judô foi criado em 1882 por Jigoro Kano, um educador japonês que
        buscava desenvolver não apenas a técnica marcial, mas também o caráter
        e a disciplina dos praticantes. Ele fundou o Instituto Kodokan para
        ensinar sua arte.
      </Text>

      <Text style={styles.subtitulo}>🕰️ Linha do Tempo do Judô</Text>

      <View style={styles.linhaDoTempo}>
        <Text style={styles.evento}>
          <Text style={styles.ano}>1882:</Text> Fundação do Judô no Japão.
        </Text>
        <Text style={styles.evento}>
          <Text style={styles.ano}>1909:</Text> Jigoro Kano entra no Comitê Olímpico Internacional.
        </Text>
        <Text style={styles.evento}>
          <Text style={styles.ano}>1964:</Text> Judô se torna esporte olímpico nos Jogos de Tóquio.
        </Text>
        <Text style={styles.evento}>
          <Text style={styles.ano}>1992:</Text> Judô feminino incluído nas Olimpíadas.
        </Text>
        <Text style={styles.evento}>
          <Text style={styles.ano}>Atualidade:</Text> Judô é praticado em mais de 200 países.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFF',
  },
  imagem: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#A81412',
    marginBottom: 10,
  },
  texto: {
    fontSize: 15,
    color: '#333',
    marginBottom: 20,
    lineHeight: 22,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#6D0F0F',
  },
  linhaDoTempo: {
    paddingLeft: 10,
  },
  evento: {
    fontSize: 14,
    marginBottom: 10,
    color: '#444',
  },
  ano: {
    fontWeight: 'bold',
    color: '#A81412',
  },
});
