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
    width: '100%',
    height: 6,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 2,
  },

  faixaParte: {
    height: '100%',
  },

});

export default FaixaVisualizacao;