// src/components/FaixaVisualizacao.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface FaixaVisualizacaoProps {
  cor: string;
  ponteira: string;
}

const FaixaVisualizacao = ({ cor, ponteira }: FaixaVisualizacaoProps) => (
  <View style={styles.faixaContainer}>
    <View style={[styles.faixaParte, { flex: 1, backgroundColor: ponteira }]} />
    <View style={[styles.faixaParte, { flex: 2, backgroundColor: cor }]} />
    <View style={[styles.faixaParte, { flex: 1, backgroundColor: ponteira }]} />
  </View>
);

const styles = StyleSheet.create({
  faixaContainer: {
    flexDirection: 'row',
    width: '80%',
    height: 8,
    borderRadius: 6,
    overflow: 'hidden',
    elevation: 2,
  },

  faixaParte: {
    height: '100%',
  },

});

export default FaixaVisualizacao;