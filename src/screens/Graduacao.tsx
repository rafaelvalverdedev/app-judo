// src/screens/Graduacao.tsx (or wherever your main file is)
import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Texto } from '../components/Texto';

import { COLORS, FONT_SIZE, FONT_FAMILY } from '../theme/theme';

import GraduacaoJson from '../graduacao.json'; // Adjust path as needed

// Import the separated components
import { FaixaCard, FaixaModal } from './graduacoes'; // Using the index.ts export


// Tipos (can be in a global types file or defined here if only used in this file)
interface Faixa {
  cor: string;
  ponteira: string;
  nome: string;
  requisitos: string[];
  videoUrl: string;
  imagem?: string;
  descricao: string;
}

// Componente principal
export default function Graduacao() {

  const [modalVisible, setModalVisible] = useState(false);
  const [faixaSelecionada, setFaixaSelecionada] = useState<Faixa | null>(null);
  const [faixas, setFaixas] = useState<Faixa[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string>('');

  // Função para carregar/recarregar dados
  const carregarFaixas = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError('');

      // DESENVOLVIMENTO: Usar JSON local
      setFaixas(GraduacaoJson as Faixa[]);

      //PRODUÇÃO: Descomentar para usar API
      // ***
      // const response = await fetch('https://raw.githubusercontent.com/rafaelvalverdedev/app-judo/refs/heads/master/src/graduacao.json', {
      //   // Adiciona cache-busting para garantir que sempre busque a versão mais recente
      //   cache: 'no-cache',
      //   headers: {
      //     'Cache-Control': 'no-cache',
      //   },
      // });

      // if (!response.ok) {
      //   throw new Error(`Erro ${response.status}: ${response.statusText}`);
      // }

      // const data = await response.json();
      // setFaixas(data as Faixa[]);
      // ******
      //PARA USAR EM PRODUÇÃO, DESCOMENTAR ATE AQUI

      // Feedback visual para o usuário em caso de refresh
      if (isRefresh) {
        // Opcional: Adicionar uma pequena mensagem de sucesso
        console.log('Graduações atualizadas com sucesso!');
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      console.error('Erro ao carregar graduações:', errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Carregamento inicial
  useEffect(() => {
    carregarFaixas(false);
  }, [carregarFaixas]);

  // Callbacks otimizados
  const abrirModal = useCallback((faixa: Faixa) => {
    setFaixaSelecionada(faixa);
    setModalVisible(true);
  }, []);

  const fecharModal = useCallback(() => {
    setModalVisible(false);
    setFaixaSelecionada(null);
  }, []);

  // Função para Pull-to-Refresh
  const onRefresh = useCallback(() => {
    carregarFaixas(true);
  }, [carregarFaixas]);

  // Função para tentar novamente
  const tentarNovamente = useCallback(() => {
    setError('');
    carregarFaixas(false);
  }, [carregarFaixas]);

  // Validação de dados e estados de carregamento
  if (loading && !refreshing) {
    return (
      <View>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Texto style={styles.loadingText}>Carregando graduações...</Texto>
      </View>
    );
  }

  if (error && !refreshing) {
    return (
      <View>
        <Texto style={styles.errorText}>Erro: {error}</Texto>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={tentarNovamente}
          activeOpacity={0.8}
        >
          <Texto style={styles.retryButtonText}>Tentar novamente</Texto>
        </TouchableOpacity>
      </View>
    );
  }

  return (

    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[COLORS.primary]}
          tintColor={COLORS.primary}
          title="Atualizando graduações..."
          titleColor={COLORS.primary}
        />
      }
    >

      {/* Card principal com informações */}
      <LinearGradient colors={['#6D0F0F', '#A81412']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}>
        <View style={styles.cardPrincipal}>

          <Texto style={styles.titulo}>O que são as graduações?</Texto>
          <Texto style={styles.descricao}>
            A progressão dos praticantes é representada pelas faixas (ou graduações), que indicam o nível técnico, a maturidade e conhecimento de cada judoca.
          </Texto>

          {/* <Texto>  </Texto> */}

          <Texto style={styles.titulo}>Como funciona a progressão?</Texto>
          <Texto style={styles.descricao}>As graduações do judô são divididas em dois grandes grupos:</Texto>
          <Texto style={styles.item}>&#10004; Faixas coloridas (Kyū) – representam os estágios iniciais e intermediários do judoca...</Texto>
          <Texto style={styles.item}>&#10004; Faixas pretas (Dan) – para judocas mais avançados, com alto grau de conhecimento técnico e filosófico.</Texto>
        </View>
        <View><Texto></Texto></View>
        <View><Texto></Texto></View>
        <View style={styles.bottomCard}><Texto></Texto></View>
      </LinearGradient>

      {/* Container dos cards de faixas */}

      <View style={styles.containerCards}>
        {faixas.map((faixa, index) => (
          <FaixaCard
            key={index}
            faixa={faixa}
            onPress={abrirModal}
            index={index} // <<< isso é importante
          />
        ))}

      </View>


      {/* Modal */}
      <FaixaModal
        visible={modalVisible}
        faixa={faixaSelecionada}
        onClose={fecharModal}
      />

    </ScrollView>

  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    backgroundColor: '#f6f6f6',
  },

  cardPrincipal: {
    margin: 10,
  },

  containerCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 65,
  },

  titulo: {
    color: '#f6f6f6',
    fontFamily: FONT_FAMILY.DMSansBold,
    fontSize: 24,
  },

  descricao: {
    color: '#fff',
    marginLeft: 15,
  },

  item: {
    color: '#fff',
    marginLeft: 30,
  },

  errorText: {
    color: COLORS.text,
    textAlign: 'center',
  },

  loadingText: {
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 12,
  },

  retryButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    elevation: 2,
  },

  retryButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
  },

  refreshIndicator: {
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 10,
  },

  refreshText: {
    opacity: 0.6,
  },

  refreshHint: {
    textAlign: 'center',
    marginTop: 12,
    opacity: 0.7,
  },

  bottomCard: {
    position: 'absolute',
    bottom: -20,
    alignSelf: 'center',
    backgroundColor: '#f6f6f6',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingVertical: 12,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minWidth: '100%', // para garantir a largura mínima visual
    alignItems: 'center',
  },

});