// src/screens/Graduacao.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

const faixas = [
  {
    cor: '#FFFFFF',
    nome: 'Faixa Branca',
    requisitos: ['Conhecer regras básicas', 'Cumprimento correto'],
    videoUrl: 'https://www.youtube.com/watch?v=video1',
  },
  {
    cor: '#FFFF00',
    nome: 'Faixa Amarela',
    requisitos: ['Quedas básicas', 'Postura e deslocamento'],
    videoUrl: 'https://www.youtube.com/watch?v=video2',
  },
  {
    cor: '#FF8C00',
    nome: 'Faixa Laranja',
    requisitos: ['Movimentação lateral', 'Técnicas de projeção'],
    videoUrl: 'https://www.youtube.com/watch?v=video3',
  },
  // Continue com outras faixas...
];

export default function Graduacao() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {faixas.map((faixa, index) => (
        <View key={index} style={styles.card}>
          <View style={[styles.faixa, { backgroundColor: faixa.cor }]} />
          <Text style={styles.titulo}>{faixa.nome}</Text>
          <Text style={styles.subtitulo}>Requisitos:</Text>
          {faixa.requisitos.map((item, idx) => (
            <Text key={idx} style={styles.item}>• {item}</Text>
          ))}
          <TouchableOpacity onPress={() => Linking.openURL(faixa.videoUrl)}>
            <Text style={styles.link}>Ver vídeo demonstrativo</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: {
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
  },
  faixa: {
    width: '100%',
    height: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
  titulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  subtitulo: { fontSize: 14, fontWeight: '600', marginTop: 10 },
  item: { fontSize: 13, marginLeft: 10, marginTop: 2 },
  link: { color: '#A81412', marginTop: 10, fontWeight: 'bold' },
});
