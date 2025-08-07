import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Texto } from '../../components/Texto';
import { imagensFaixas, coresTexto, gradientes } from '../../components/configFaixas';

interface Faixa {
  cor: string;
  ponteira: string;
  nome: string;
  requisitos: string[];
  videoUrl: string;
  descricao: string;
}

interface FaixaCardProps {
  faixa: Faixa;
  onPress: (faixa: Faixa) => void;
  index: number;
}

const FaixaCard: React.FC<FaixaCardProps> = ({ faixa, onPress, index }) => {

  const imagem = imagensFaixas[faixa.nome]; 
  const gradiente = gradientes[index % gradientes.length];
  const corTexto = coresTexto[index % coresTexto.length];

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => onPress(faixa)} style={styles.touchableContainer}>
        <View style={styles.topContainer}>
          <LinearGradient
            colors={gradiente}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.topGradient}
          >
            <Image source={imagem} style={styles.iconImage} resizeMode="contain" />

            <Texto style={{ ...styles.titulo, color: corTexto }}>{faixa.nome}</Texto>
          </LinearGradient>
        </View>

        <View style={styles.content}>
          <View style={styles.contentText}>
            <Texto style={styles.requisitos}>{faixa.requisitos}</Texto>
            <Texto style={styles.description}>{faixa.descricao}</Texto>
          </View>
          <Texto style={styles.link}>[ Mais + ]</Texto>
        </View>
      </TouchableOpacity>
    </View>
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
    justifyContent: 'space-between',
  },

  touchableContainer: {
    flex: 1,
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
    flex: 1,
    padding: 10,
  },

  contentText: {
    flex: 1,
  },

  description: {
    color: '#282828',
    margin: 5,
    textAlign: 'justify',
    letterSpacing: 0.15,
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
    fontSize: 22,
    fontWeight: 900,
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