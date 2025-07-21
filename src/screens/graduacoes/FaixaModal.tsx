// src/components/FaixaModal.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { COLORS } from '../../layout'; // Adjust path as needed
import FaixaVisualizacao from './FaixaVisualizacao';

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

// Map of specific content components for each belt
const faixaComponents: { [nome: string]: React.ComponentType } = {
  'Faixa Branca': FaixaBranca,
  'Faixa Cinza': FaixaCinza,
  // Add other specific belt components here
  // 'Amarela': FaixaAmarela,
};

const FaixaModal = ({ visible, faixa, onClose }: FaixaModalProps) => {
  if (!faixa) return null;

  const ConteudoComponente = faixaComponents[faixa.nome] || null;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.faixaContainer}>
            <FaixaVisualizacao cor={faixa.cor} ponteira={faixa.ponteira} />
          </View>
          <Text style={styles.modalTitulo}>{faixa.nome}</Text>
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
            style={styles.botaoFechar}
            activeOpacity={0.8}
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
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    backgroundColor: COLORS.white,
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
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    elevation: 2,
  },
  botaoFecharTexto: {
    color: COLORS.white,
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