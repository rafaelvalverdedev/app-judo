// src/components/FaixaModal.tsx
import React from 'react';
import { View, Text, ScrollView, Image, Modal, StyleSheet, StatusBar } from 'react-native';

import { imagensFaixas } from '../../components/imagensFaixas';

import FaixaBranca from './ModalFaixas/ModalFaixaBranca';
import FaixaBrancaCinza from './ModalFaixas/ModalFaixaBrancaCinza';
import FaixaCinza from './ModalFaixas/ModalFaixaCinza';
import FaixaCinzaAzul from './ModalFaixas/ModalFaixaCinzaAzul';
import FaixaAzul from './ModalFaixas/ModalFaixaAzul';
import FaixaAzulAmarela from './ModalFaixas/ModalFaixaAzulAmarela';
import FaixaAmarela from './ModalFaixas/ModalFaixaAmarela';
import FaixaAmarelaLaranja from './ModalFaixas/ModalFaixaAmarelaLaranja';
import FaixaLaranja from './ModalFaixas/ModalFaixaLaranja';
import FaixaVerde from './ModalFaixas/ModalFaixaVerde';
import FaixaRoxa from './ModalFaixas/ModalFaixaRoxa';
import FaixaMarrom from './ModalFaixas/ModalFaixaMarrom';
import FaixaPreta from './ModalFaixas/ModalFaixaPreta';

import { Texto } from '../../components/Texto';

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
  'Branca / Cinza': FaixaBrancaCinza,
  'Faixa Cinza': FaixaCinza,
  'Cinza / Azul': FaixaCinzaAzul,
  'Faixa Azul': FaixaAzul,
  'Azul / Amarela': FaixaAzulAmarela,
  'Amarela': FaixaAmarela,
  'Amarela / Laranja': FaixaAmarelaLaranja,
  'Faixa Laranja': FaixaLaranja,
  'Faixa Verde': FaixaVerde,
  'Faixa Roxa': FaixaRoxa,
  'Faixa Marrom': FaixaMarrom,
  'Faixa Preta': FaixaPreta,
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

        <View style={styles.Container}>

          <Image source={imagem} style={styles.imagemFaixa} resizeMode='contain' />

          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.modalScrollContent}>
            {/* Renderiza componente específico da faixa */}
            {ConteudoComponente ? (<ConteudoComponente />) : (
              <Texto>
                Conteúdo indisponível para esta faixa.
              </Texto>
            )}
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(56, 22, 22, 0.7)',
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


  modalScrollContent: {
    top: 10,
  },

  modalTitulo: {
    textAlign: 'center',
    marginBottom: 6,
    fontSize: 21,
    fontWeight: 'bold',
    color: '#555555',
  },

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