import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, Modal, Linking, SafeAreaView
} from 'react-native';

const faixas = [
  {
    cor: '#FFFFFF',
    nome: 'Faixa Branca',
    requisitos: ['Conhecer regras básicas', 'Cumprimento correto'],
    videoUrl: 'https://www.youtube.com/watch?v=video1',
  },
  {
    cor: '#9b9494ff',
    nome: 'Faixa Cinza',
    requisitos: ['Conhecer regras básicas', 'Cumprimento correto'],
    videoUrl: 'https://www.youtube.com/watch?v=video1',
  },
  {
    cor: '#416ecfff',
    nome: 'Faixa Azul',
    requisitos: ['Quedas básicas', 'Postura e deslocamento'],
    videoUrl: 'https://www.youtube.com/watch?v=video2',
  },
  {
    cor: '#e0de3bff',
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
  {
    cor: '#50226eff',
    nome: 'Faixa Roxa',
    requisitos: ['Movimentação lateral', 'Técnicas de projeção'],
    videoUrl: 'https://www.youtube.com/watch?v=video3',
  },
  {
    cor: '#423830ff',
    nome: 'Faixa Marrom',
    requisitos: ['Movimentação lateral', 'Técnicas de projeção'],
    videoUrl: 'https://www.youtube.com/watch?v=video3',
  },
  {
    cor: '#000000ff',
    nome: 'Faixa Preta',
    requisitos: ['Movimentação lateral', 'Técnicas de projeção'],
    videoUrl: 'https://www.youtube.com/watch?v=video3',
  },
];

export default function Graduacao() {
  const [modalVisible, setModalVisible] = useState(false);
  const [faixaSelecionada, setFaixaSelecionada] = useState<any>(null);

  const abrirModal = (faixa: any) => {
    setFaixaSelecionada(faixa);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {faixas.map((faixa, index) => (
          <View key={index} style={styles.card}>
            <TouchableOpacity onPress={() => abrirModal(faixa)}>
              <View style={[styles.faixa, { backgroundColor: faixa.cor }]} />
              <Text style={styles.titulo}>{faixa.nome}</Text>
              <Text style={styles.subtitulo}>Requisitos:</Text>
              {faixa.requisitos.map((item, idx) => (
                <Text key={idx} style={styles.item}>• {item}</Text>
              ))}
              <Text style={styles.link}> [ Mais + ] </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Modal para conteúdo extra */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {faixaSelecionada && (
              <>
                <Text style={styles.modalTitulo}>{faixaSelecionada.nome}</Text>
                {/* 🔽 Aqui você pode colocar conteúdo adicional */}
                <Text style={styles.modalConteudo}>
                  Aqui você pode adicionar informações extras como:
                  {'\n'}• História da faixa
                  {'\n'}• Orientações para exames
                  {'\n'}• Duração mínima
                  {'\n'}• Curiosidades sobre a graduação
                  {'\n\n'}Este conteúdo pode ser personalizado faixa por faixa.
                </Text>

                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.botaoFechar}>
                  <Text style={styles.botaoFecharTexto}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#d6dde0ff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 45,
    paddingBottom: 55,
    padding: 20,
  },
  card: {
    backgroundColor: '#eeededff',
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

  // MODAL
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '85%',
    borderRadius: 12,
    padding: 20,
    elevation: 10,
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalConteudo: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  botaoFechar: {
    marginTop: 20,
    alignSelf: 'flex-end',
    padding: 8,
    backgroundColor: '#A81412',
    borderRadius: 6,
  },
  botaoFecharTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
