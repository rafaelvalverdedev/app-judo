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
  ['#ffffff', '#d8d6d6'],
  ['#ffffff', '#d8d6d6'],

  ['#DCDCDC', '#A9A9A9'],
  ['#DCDCDC', '#A9A9A9'],

  ['#22abfa', '#0136af'],
  ['#22abfa', '#0136af'],

  ['#fbb034', '#fbe734'],
  ['#fbb034', '#fbe734'],

  ['#f7b733', '#fc4a1a'],

  ['#8ec06c', '#537b35'],

  ['#a626aa', '#6639b7'],

  ['#a25016', '#562e19'],

  ['#444444', '#282828'],
];


const coresTexto: string[] = [
  '#666666',
  '#666666',

  '#333333',
  '#333333',

  '#99cce9',
  '#99cce9',

  '#aa731b',
  '#aa731b',

  '#f8e5d6',

  '#295f51',

  '#e5d6f8',

  '#d1b59f',

  '#9e9e9e',
];



const FaixaCard: React.FC<FaixaCardProps> = ({ faixa, onPress, index }) => {
  const gradiente = gradientes[index % gradientes.length];
  const corTexto = coresTexto[index % coresTexto.length];

  return (
    <View
      style={styles.cardContainer}
    >
      <LinearGradient
        style={styles.cardContainerLinear}
        colors={gradiente}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity
          onPress={() => onPress(faixa)}
          accessibilityLabel={`Abrir detalhes da faixa ${faixa.nome}`}
          accessibilityHint="Toque para ver mais informações sobre esta graduação"
          activeOpacity={0.8}
        >
          <View style={styles.faixaContainer}>
            <FaixaVisualizacao cor={faixa.cor} ponteira={faixa.ponteira} />
          </View>

          <View >
            <Text style={[styles.titulo, { color: corTexto }]}>{faixa.nome}</Text>

            {faixa.requisitos?.map((item, idx) => (
              <Text key={idx} style={[styles.item, { color: corTexto }]}>• {item}</Text>
            ))}

            <Text style={[styles.link, { color: corTexto }]}>[ Mais + ]</Text>

          </View>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    marginBottom: 15,
    borderRadius: 16,
  },

  cardContainerLinear: {
    flex: 1,
    borderRadius: 16,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    minHeight: 160,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
  },

  faixaContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titulo: {
    textAlign: 'center',
    marginBottom: 6,
    fontSize: 25,
    fontWeight: 'bold',
  },

  item: {
    fontSize: 16,
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
