// src/components/FaixaCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FaixaVisualizacao from './FaixaVisualizacao'; // Import the new component
import { COLORS } from '../../layout'; // Adjust path as needed

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

interface FaixaCardProps {
  faixa: Faixa;
  onPress: (faixa: Faixa) => void;
  estiloExtra?: any;
}

const FaixaCard = ({ faixa, onPress, estiloExtra }: FaixaCardProps) => (
  <View style={[styles.card, estiloExtra]} >
    <TouchableOpacity
      onPress={() => onPress(faixa)}
      style={styles.cardTouchable}
      accessibilityLabel={`Abrir detalhes da faixa ${faixa.nome}`}
      accessibilityHint="Toque para ver mais informações sobre esta graduação"
      activeOpacity={0.7}
    >
      <FaixaVisualizacao cor={faixa.cor} ponteira={faixa.ponteira} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitulo}>{faixa.nome}</Text>
        <Text style={styles.subtitulo}>Requisitos:</Text>
        {faixa.requisitos.map((item, idx) => (
          <Text key={idx} style={styles.item}>• {item}</Text>
        ))}
        <Text style={styles.link}> [ Mais + ] </Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8dcdcff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    width: '48%', // This can be moved to the parent or passed as prop if dynamic
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTouchable: {
    flex: 1,

  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardTitulo: {
    fontSize: 18,
    color: COLORS.text,
  },
  subtitulo: {
    fontSize: 16,
    color: COLORS.text,
  },
  item: {
    fontSize: 13,
    marginLeft: 10,
    color: COLORS.text,
  },
  link: {
    color: COLORS.black,
    fontSize: 11,
    textAlign: 'right',
  },
});

export default FaixaCard;