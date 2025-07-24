import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Texto } from '../../components/Texto'; // Adjust the import path as needed
import { FONT_SIZE } from '../../theme/theme';

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

  ['#DCDCDC', '#9c9c9c'],
  ['#DCDCDC', '#9c9c9c'],

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
  '#888888',
  '#888888',

  '#555555',
  '#555555',

  '#163379',
  '#163379',

  '#aa731b',
  '#aa731b',

  '#f8e5d6',

  '#295f51',

  '#e5d6f8',

  '#d1b59f',

  '#9e9e9e',
];

const imagemFaixa: any[] = [
  require('../../../assets/faixas/branca.png'),
  require('../../../assets/faixas/branca-cinza.png'),
  require('../../../assets/faixas/cinza.png'),
  require('../../../assets/faixas/cinza-azul.png'),
  require('../../../assets/faixas/azul.png'),
  require('../../../assets/faixas/azul-amarela.png'),
  require('../../../assets/faixas/amarela.png'),
  require('../../../assets/faixas/amarela-laranja.png'),
  require('../../../assets/faixas/laranja.png'),
  require('../../../assets/faixas/verde.png'),
  require('../../../assets/faixas/roxa.png'),
  require('../../../assets/faixas/marrom.png'),
  require('../../../assets/faixas/preta.png'),
];

const FaixaCard: React.FC<FaixaCardProps> = ({ faixa, onPress, index }) => {
  const gradiente = gradientes[index % gradientes.length];
  const corTexto = coresTexto[index % coresTexto.length];
  const imagemFaixas = imagemFaixa[index % imagemFaixa.length];

  return (
    <View style={styles.card}>
      {/* Topo com fundo gradiente curvo */}
      <TouchableOpacity onPress={() => onPress(faixa)}>
        <View style={styles.topContainer}>
          <LinearGradient
            // style={styles.cardContainerLinear}
            colors={gradiente}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.topGradient}
          >

            <Image
              source={imagemFaixas}
              style={styles.iconImage}
              resizeMode="contain"
            />

            <Texto style={[styles.titulo, { color: corTexto }]}>{faixa.nome}</Texto>

          </LinearGradient>
        </View>

        {/* Conteúdo */}
        <View style={styles.content}>
          <Texto style={styles.requisitos}>{faixa.requisitos}</Texto>
          <Texto style={styles.description}>{faixa.descricao}</Texto>

          {/* Botão */}
          <Texto style={styles.link}>[ Mais + ]</Texto>
        </View>
      </TouchableOpacity>
    </View >
  );
};

const styles = StyleSheet.create({
  card: {
    width: '45%',
    borderRadius: 16,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 5,
    margin: 10,
  },

  topContainer: {
    height: 100,
    overflow: 'hidden',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  topGradient: {
    flex: 1,
    borderBottomRightRadius: 85,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    padding: 10,
  },

  title: {
    fontWeight: '700',
    marginBottom: 8,
    color: '#444',
  },

  description: {
    color: '#666',
    margin: 5,
    textAlign: 'justify',
  },

  requisitos: {
    color: '#888',
    marginBottom: 16,
    marginLeft: 10,
    textAlign: 'left',
  },


  iconImage: {
    width: 60,
    height: 60,
    margin: -15,
  },

  titulo: {
    marginBottom: 6,
    fontSize: FONT_SIZE.medium2,
  },

  item: {
    marginLeft: 10,
    marginBottom: 2,
  },

  link: {
    textAlign: 'right',
    marginTop: 10,
    fontSize: 12,
  },

});

export default FaixaCard;
