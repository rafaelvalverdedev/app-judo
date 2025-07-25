// src/components/FaixaModal.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, StyleSheet, StatusBar } from 'react-native';
import FaixaVisualizacao from './FaixaVisualizacao';

import { imagensFaixas } from '../../components/imagensFaixas';

import FaixaBranca from './ModalFaixaBranca'; // Adjust path as needed
import FaixaCinza from './ModalFaixaCinza'; // Adjust path as needed

// Tipos (assuming Faixa is defined elsewhere or imported)
interface Faixa {
  cor: string;
  ponteira: string;
  nome: string;
  requisitos: string[];
  videoUrl: string;
  imagem?: string;
  descricao: string;
}

interface FaixaModalProps {
  visible: boolean;
  faixa: Faixa | null;
  onClose: () => void;
}

const faixaComponents: { [nome: string]: React.ComponentType } = {
  'Faixa Branca': FaixaBranca,
  'Faixa Cinza': FaixaCinza,
  // Add other specific belt components here
  // 'Amarela': FaixaAmarela,
};

const FaixaModal = ({ visible, faixa, onClose }: FaixaModalProps) => {
  if (!faixa) return null;
  
  const ConteudoComponente = faixaComponents[faixa.nome] || null;
  const imagem = imagensFaixas[faixa.nome];

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
    >
      <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" barStyle="light-content" />

      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.faixaContainer}>
            
            <Image source={imagem} style={{ width: 60, height: 60 }} resizeMode='contain' />
            <FaixaVisualizacao cor={faixa.cor} ponteira={faixa.ponteira} />

          </View>
          <Text style={styles.modalTitulo}>{faixa.nome} - {faixa.imagem} </Text>
          <ScrollView contentContainerStyle={styles.modalScrollContent}>
            {/* Renderiza componente específico da faixa */}
            {ConteudoComponente ? (<ConteudoComponente />) : (
              <Text style={styles.modalConteudo}>
                Conteúdo indisponível para esta faixa.
              </Text>
            )}
          </ScrollView>

          {/* Botão "Fechar" fica fora do componente */}
          <TouchableOpacity
            onPress={onClose}
          >
            <Text style={styles.botaoFecharTexto}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    backgroundColor: '#ffffff',
    width: '90%',
    maxHeight: '90%',
    borderRadius: 16,
    padding: 16,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },

  modalScrollContent: {
    paddingBottom: 20,
  },

  modalTitulo: {
    textAlign: 'center',
    marginBottom: 6,
    fontSize: 21,
    fontWeight: 'bold',
    color: '#333333',
  },

  modalConteudo: {
    fontSize: 18,
    lineHeight: 24,
    color: "#333333",
    textAlign: 'justify',
  },

  botaoFechar: {
    marginTop: 24,
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    elevation: 2,
  },
  botaoFecharTexto: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 14,
  },

  faixaContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FaixaModal;