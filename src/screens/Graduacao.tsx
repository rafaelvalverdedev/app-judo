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
import { COLORS } from '../layout'; // Adjust path as needed

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

      // PRODUÇÃO: Descomentar para usar API
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
      // PARA USAR EM PRODUÇÃO, DESCOMENTAR ATE AQUI

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
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Carregando graduações...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error && !refreshing) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>Erro: {error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={tentarNovamente}
            activeOpacity={0.8}
          >
            <Text style={styles.retryButtonText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
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
        <View style={styles.cardPrincipal}>
          <Text style={styles.titulo}>
            O Judô é uma arte marcial que valoriza a disciplina, o respeito e o aprendizado contínuo.
          </Text>

          <Text style={styles.subtitulo}>O que são as graduações?</Text>
          <Text style={styles.descricao}>
            A progressão dos praticantes é representada pelas faixas (ou graduações), que indicam o nível técnico, a maturidade e o tempo de prática de cada judoca.
          </Text>

          <Text style={styles.subtitulo}>Como funciona a progressão?</Text>
          <Text style={styles.descricao}>As graduações do judô são divididas em dois grandes grupos:</Text>
          <Text style={styles.item}>• Faixas coloridas (Kyū) – representam os estágios iniciais e intermediários do judoca...</Text>
          <Text style={styles.item}>• Faixas pretas (Dan) – para judocas mais avançados, com alto grau de conhecimento técnico e filosófico.</Text>
        </View>

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
      </ScrollView>

      {/* Modal */}
      <FaixaModal
        visible={modalVisible}
        faixa={faixaSelecionada}
        onClose={fecharModal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 10,
    padding: 10,
  },

  containerCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  cardPrincipal: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },

  titulo: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'justify',
    lineHeight: 32,
    color: COLORS.text,
  },

  subtitulo: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 6,
    color: COLORS.text,
  },

  descricao: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
    color: COLORS.text,
    textAlign: 'justify',
  },

  item: {
    fontSize: 13,
    marginLeft: 10,
    marginTop: 4,
    color: COLORS.text,
    lineHeight: 18,
  },

  errorText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: COLORS.text,
    textAlign: 'center',
  },

  loadingText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
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
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: COLORS.text,
    opacity: 0.6,
  },
  refreshHint: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 12,
    opacity: 0.7,
  },
});