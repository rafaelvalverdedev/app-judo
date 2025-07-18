import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FaixaVisualizacao from './FaixaVisualizacao';

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
  index: number;
  estiloExtra?: any;
}

const gradientes: [string, string][] = [
  ['#ffffff', '#a79393ff'],
  ['#ffffff', '#a79393ff'],
  ['#ffffff', '#a79393ff'],
  ['#4facfe', '#00f2fe'],
  ['#fddb92', '#fceabb'],
  ['#a8e063', '#56ab2f'],
  ['#f77062', '#fe5196'],
  ['#7F00FF', '#E100FF'],
  ['#434343', '#000000'],
  ['#603813', '#b29f94'],
  ['#d3d3d3', '#a9a9a9'],
];

const FaixaCard: React.FC<FaixaCardProps> = ({ faixa, onPress, index }) => {
  const gradiente = gradientes[index % gradientes.length];

  return (
    <View style={styles.cardContainer}>
      <LinearGradient
        style={styles.card}
        colors={gradiente as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity
          onPress={() => onPress(faixa)}
          style={styles.cardTouchable}
          accessibilityLabel={`Abrir detalhes da faixa ${faixa.nome}`}
          accessibilityHint="Toque para ver mais informações sobre esta graduação"
          activeOpacity={0.7}
        >
          <View style={styles.faixaContainer}>
            <FaixaVisualizacao cor={faixa.cor} ponteira={faixa.ponteira} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitulo}>{faixa.nome}</Text>
            <Text style={styles.subtitulo}>Requisitos:</Text>
            {faixa.requisitos && faixa.requisitos.map((item, idx) => (
              <Text key={idx} style={styles.item}>• {item}</Text>
            ))}
            <Text style={styles.link}> [ Mais + ] </Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '48%',
    marginBottom: 20,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minHeight: 200,
  },
  cardTouchable: {
    flex: 1,
  },
  faixaContainer: {
    marginBottom: 10,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardTitulo: {
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 5,
  },
  item: {
    fontSize: 13,
    marginLeft: 10,
    color: '#333333',
    marginBottom: 2,
  },
  link: {
    color: '#000000',
    fontSize: 11,
    textAlign: 'right',
    marginTop: 10,
  },
});

export default FaixaCard;