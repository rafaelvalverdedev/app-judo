import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import GraduacaoJson from '../graduacao.json';

// Constantes
const COLORS = {
  primary: '#A81412',
  background: '#d6dde0',
  cardBackground: '#f6f6f6',
  cardSecondary: '#eeeded',
  white: '#fff',
  text: '#333',
  overlay: 'rgba(0,0,0,0.6)',
};

// Tipos
interface Faixa {
  cor: string;
  ponteira: string;
  nome: string;
  requisitos: string[];
  videoUrl: string;
  imagem?: string;
  descricao: string;
}

// Componente para visualização da faixa
const FaixaVisualizacao = ({ cor, ponteira }: { cor: string; ponteira: string }) => (
  <View style={styles.faixaContainer}>
    <View style={[styles.faixaParte, { flex: 1, backgroundColor: ponteira }]} />
    <View style={[styles.faixaParte, { flex: 2, backgroundColor: cor }]} />
    <View style={[styles.faixaParte, { flex: 1, backgroundColor: ponteira }]} />
  </View>
);

// Componente para cada card de faixa
const FaixaCard = ({ faixa, onPress }: { faixa: Faixa; onPress: (faixa: Faixa) => void }) => (
  <View style={styles.card}>
    <TouchableOpacity 
      onPress={() => onPress(faixa)} 
      style={styles.cardTouchable}
      accessibilityLabel={`Abrir detalhes da faixa ${faixa.nome}`}
      accessibilityHint="Toque para ver mais informações sobre esta graduação"
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <View>
          <FaixaVisualizacao cor={faixa.cor} ponteira={faixa.ponteira} />
          <Text style={styles.cardTitulo}>{faixa.nome}</Text>
          <Text style={styles.subtitulo}>Requisitos:</Text>
          {faixa.requisitos.map((item, idx) => (
            <Text key={idx} style={styles.item}>• {item}</Text>
          ))}
        </View>
        <Text style={styles.link}> [ Mais + ] </Text>
      </View>
    </TouchableOpacity>
  </View>
);

// Componente do Modal
const FaixaModal = ({ 
  visible, 
  faixa, 
  onClose 
}: { 
  visible: boolean; 
  faixa: Faixa | null; 
  onClose: () => void; 
}) => {
  if (!faixa) return null;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ScrollView 
            contentContainerStyle={styles.modalScrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.modalTitulo}>{faixa.nome}</Text>
            
            {faixa.imagem && (
              <Image
                source={{ uri: faixa.imagem }}
                style={styles.modalImagem}
                resizeMode="contain"
              />
            )}
            
            <Text style={styles.modalConteudo}>
              {faixa.descricao}
            </Text>
            
            <TouchableOpacity 
              onPress={onClose} 
              style={styles.botaoFechar}
              accessibilityLabel="Fechar modal"
              activeOpacity={0.8}
            >
              <Text style={styles.botaoFecharTexto}>Fechar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

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

  if (!faixas || faixas.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.centered}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          }
        >
          <Text style={styles.errorText}>Nenhuma graduação encontrada</Text>
          <Text style={styles.refreshHint}>Arraste para baixo para tentar novamente</Text>
        </ScrollView>
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
            <FaixaCard key={index} faixa={faixa} onPress={abrirModal} />
          ))}
        </View>

        {/* Indicador de última atualização */}
        <View style={styles.refreshIndicator}>
          <Text style={styles.refreshText}>
            Arraste para baixo para atualizar
          </Text>
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
    paddingTop: 20,
    padding: 20,
  },
  containerCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardPrincipal: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  card: {
    backgroundColor: COLORS.cardSecondary,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    width: '48%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTouchable: {
    flex: 1,
    borderRadius: 12,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  faixaContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 8,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 2,
  },
  faixaParte: {
    height: '100%',
  },
  titulo: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    marginBottom: 8,
    textAlign: 'justify',
    lineHeight: 32,
    color: COLORS.text,
  },
  cardTitulo: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    marginBottom: 8,
    color: COLORS.text,
  },
  subtitulo: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    marginTop: 12,
    marginBottom: 6,
    color: COLORS.text,
  },
  descricao: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
    marginBottom: 8,
    color: COLORS.text,
    textAlign: 'justify',
  },
  item: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    marginLeft: 10,
    marginTop: 4,
    color: COLORS.text,
    lineHeight: 18,
  },
  link: {
    color: COLORS.primary,
    marginTop: 12,
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    width: '90%',
    maxHeight: '80%',
    borderRadius: 16,
    padding: 24,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  modalScrollContent: {
    paddingBottom: 20,
  },
  modalTitulo: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    marginBottom: 20,
    textAlign: 'center',
    color: COLORS.text,
  },
  modalImagem: {
    width: '100%',
    height: 180,
    marginBottom: 20,
    borderRadius: 12,
  },
  modalConteudo: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    lineHeight: 24,
    color: COLORS.text,
    textAlign: 'justify',
  },
  botaoFechar: {
    marginTop: 24,
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    elevation: 2,
  },
  botaoFecharTexto: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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