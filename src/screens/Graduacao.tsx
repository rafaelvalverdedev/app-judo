// src/screens/Graduacao.tsx
import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Texto } from '../components/Texto';
import { StatusMessage } from '../components/StatusMessage';

import { COLORS, FONT_FAMILY } from '../theme/theme';
import { FaixaCard, FaixaModal } from './graduacoes';

import { Faixa, buscarGraduacoes } from '../services/graduacoesService';

export default function Graduacao() {
  const [modalVisible, setModalVisible] = useState(false);
  const [faixaSelecionada, setFaixaSelecionada] = useState<Faixa | null>(null);
  const [faixas, setFaixas] = useState<Faixa[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string>('');
  
  const carregarFaixas = useCallback(async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);
      setError('');
      
      const data = await buscarGraduacoes();
      setFaixas(data);
      
      if (isRefresh) {
        console.log('Graduações atualizadas com sucesso!');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    carregarFaixas(false);
  }, [carregarFaixas]);

  const abrirModal = useCallback((faixa: Faixa) => {
    setFaixaSelecionada(faixa);
    setModalVisible(true);
  }, []);
  
  const fecharModal = useCallback(() => {
    setModalVisible(false);
    setFaixaSelecionada(null);
  }, []);

  const onRefresh = useCallback(() => {
    carregarFaixas(true);
  }, [carregarFaixas]);

  const tentarNovamente = useCallback(() => {
    setError('');
    carregarFaixas(false);
  }, [carregarFaixas]);

  if ((loading || error) && !refreshing) {
    return (
      <StatusMessage
        loading={loading}
        error={error}
        onRetry={tentarNovamente}
      />
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
      <LinearGradient colors={['#6D0F0F', '#A81412']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}>
        <View style={styles.cardPrincipal}>
          <Texto style={styles.titulo}>O que são as graduações?</Texto>
          <Texto style={styles.descricao}>
            A progressão dos praticantes é representada pelas faixas (ou graduações), que indicam o nível técnico, a maturidade e conhecimento de cada judoca.
          </Texto>

          <Texto style={styles.titulo}>Como funciona a progressão?</Texto>
          <Texto style={styles.descricao}>As graduações do judô são divididas em dois grandes grupos:</Texto>
          <Texto style={styles.item}>&#10004; Faixas coloridas (Kyū) – representam os estágios iniciais e intermediários do judoca...</Texto>
          <Texto style={styles.item}>&#10004; Faixas pretas (Dan) – para judocas mais avançados, com alto grau de conhecimento técnico e filosófico.</Texto>
        </View>
        <View style={styles.bottomCard}><Texto></Texto></View>
      </LinearGradient>

      <View style={styles.containerCards}>
        {faixas.map((faixa, index) => (
          <FaixaCard
            key={faixa.nome || `faixa=${index}`}
            faixa={faixa}
            onPress={abrirModal}
            index={index}
          />
        ))}
      </View>
      
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
  bottomCard: {
    position: 'absolute',
    bottom: -10,
    alignSelf: 'center',
    backgroundColor: '#f6f6f6',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minWidth: '100%',
    alignItems: 'center',
  },
});
