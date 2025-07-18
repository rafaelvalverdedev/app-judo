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
}

const gradientes: [string, string][] = [
  ['#ffffff', '#bdb9b9'],
  ['#ffffff', '#bdb9b9'],
  ['#ffffff', '#bdb9b9'],
  ['#0136af', '#22abfa'],
  ['#0136af', '#22abfa'],
  ['#0136af', '#22abfa'],
  ['#f7b733', '#fc4a1a'],
  ['#f7b733', '#fc4a1a'],
  ['#fc4a1a', '#f7b733'],
  ['#11998e', '#1ce669'],
  ['#434343', '#000000'],
  ['#603813', '#b29f94'],
  ['#434343', '#000000'],
];

// Verifica se o fundo é claro
const isFundoClaro = (gradiente: [string, string]) => {
  const coresClaras = ['#ffffff', '#fff', '#f7f7f7', '#bdb9b9', '#f7b733', '#b29f94'];
  return coresClaras.includes(gradiente[0].toLowerCase()) && coresClaras.includes(gradiente[1].toLowerCase());
};

const FaixaCard: React.FC<FaixaCardProps> = ({ faixa, onPress, index }) => {
  const gradiente = gradientes[index % gradientes.length];
  const corTexto = isFundoClaro(gradiente) ? '#000' : '#fff';

  return (
    <View style={styles.cardContainer}>
      <LinearGradient
        style={styles.card}
        colors={gradiente}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity
          onPress={() => onPress(faixa)}
          style={styles.cardTouchable}
          accessibilityLabel={`Abrir detalhes da faixa ${faixa.nome}`}
          accessibilityHint="Toque para ver mais informações sobre esta graduação"
          activeOpacity={0.8}
        >
          <View style={styles.faixaContainer}>
            <FaixaVisualizacao cor={faixa.cor} ponteira={faixa.ponteira} />
          </View>

          <View style={styles.cardContent}>
            <Text style={[styles.titulo, { color: corTexto }]}>{faixa.nome}</Text>

            {faixa.requisitos?.map((item, idx) => (
              <Text key={idx} style={[styles.item, { color: corTexto }]}>• {item}</Text>
            ))}

            <TouchableOpacity onPress={() => onPress(faixa)}>
              <Text style={[styles.link, { color: corTexto }]}>[ Mais + ]</Text>
            </TouchableOpacity>
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
    marginHorizontal: '1%',
  },

  card: {
    borderRadius: 12,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    minHeight: 200,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
  },

  cardTouchable: {
    flex: 1,
  },

  faixaContainer: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardContent: {
    flex: 1,
  },

  titulo: {
    textAlign: 'center',
    marginBottom: 6,
    fontSize: 20,
    fontWeight: 'bold',
  },

  subtitulo: {
    fontSize: 16,
    marginBottom: 4,
  },

  item: {
    fontSize: 14,
    marginLeft: 10,
    marginBottom: 2,
  },

  link: {
    fontSize: 12,
    textAlign: 'right',
    marginTop: 10,
  },
});

export default FaixaCard;
