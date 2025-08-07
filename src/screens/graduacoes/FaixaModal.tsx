// src/components/FaixaModal.tsx
import React from 'react';
import { View, Image, Modal, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { imagensFaixas } from '../../components/configFaixas';
import { Texto } from '../../components/Texto';
import ModalFaixaGenerica from './ModalFaixas/ModalFaixaGenerica';

interface Faixa {
  cor: string;
  ponteira: string;
  nome: string;
  requisitos: string[];
  videoUrl: string;
  descricao: string;
}

interface FaixaModalProps {
  visible: boolean;
  faixa: Faixa | null;
  onClose: () => void;
}

const FaixaModal = ({ visible, faixa, onClose }: FaixaModalProps) => {
  if (!faixa) return null;

  const imagem = imagensFaixas[faixa.nome];

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" barStyle="light-content" />
      <View style={styles.modalOverlay}>
        <View style={styles.Container}>
          <Image source={imagem} style={styles.imagemFaixa} resizeMode='contain' />

          <ScrollView contentContainerStyle={styles.modalScrollContent}>
            <ModalFaixaGenerica nome={faixa.nome} />
          </ScrollView>

          <Texto style={styles.botaoFecharTexto} onPress={onClose}>
            Fechar
          </Texto>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(56, 22, 22, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Container: {
    backgroundColor: '#ffffff',
    width: '95%',
    maxHeight: '90%',
    borderRadius: 16,
    padding: 10,
  },
  imagemFaixa: {
    position: 'absolute',
    width: 80,
    height: 80,
    top: -40,
    left: 10,
  },
  modalScrollContent: { top: 10 },
  botaoFecharTexto: {
    margin: 10,
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#b41414ff',
    color: '#ffffff',
    borderRadius: 8,
    elevation: 2,
    fontSize: 12,
  },
});

export default FaixaModal;
