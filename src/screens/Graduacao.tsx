import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ActivityIndicator,
  Button,
  RefreshControl,
  Image,
} from 'react-native';

type Faixa = {
  cor: string;
  nome: string;
  requisitos: string[];
  videoUrl: string;
  imagem?: string;
  descricao: string;
};

export default function Graduacao() {
  const [faixas, setFaixas] = useState<Faixa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [faixaSelecionada, setFaixaSelecionada] = useState<Faixa | null>(null);

  const fetchFaixas = async () => {
    setError('');
    try {
      const response = await fetch(
        `https://raw.githubusercontent.com/rafaelvalverdedev/app-judo/refs/heads/master/src/graduacao.json?nocache=${Date.now()}`
      );
      if (!response.ok) throw new Error('Erro ao acessar os dados');
      const data = await response.json();
      setFaixas(data);
    } catch (err) {
      setError('Não foi possível carregar os dados. Verifique sua conexão ou tente novamente mais tarde.');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFaixas();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchFaixas();
  };

  const abrirModal = (faixa: Faixa) => {
    setFaixaSelecionada(faixa);
    setModalVisible(true);
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#A81412" />
        <Text style={{ marginTop: 10 }}>Carregando faixas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red', marginBottom: 10, textAlign: 'center' }}>{error}</Text>
        <Button title="Tentar novamente" onPress={() => { setLoading(true); fetchFaixas(); }} color="#A81412" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#A81412']} />
        }
      >
        {faixas.map((faixa, index) => (
          <View key={index} style={styles.card}>
            <TouchableOpacity onPress={() => abrirModal(faixa)}>
              <View style={[styles.faixa, { backgroundColor: faixa.cor }]} />
              <Text style={styles.titulo}>{faixa.nome}</Text>
              <Text style={styles.subtitulo}>Requisitos:</Text>
              {faixa.requisitos.map((item, idx) => (
                <Text key={idx} style={styles.item}>• {item}</Text>
              ))}
              <Text style={styles.link}> [ Mais + ] </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {faixaSelecionada && (
              <ScrollView contentContainerStyle={styles.modalScrollContent}>
                <Text style={styles.modalTitulo}>{faixaSelecionada.nome}</Text>

                {faixaSelecionada.imagem && (
                  <Image
                    source={{ uri: faixaSelecionada.imagem }}
                    style={styles.modalImagem}
                    resizeMode="contain"
                  />
                )}

                <Text style={styles.modalConteudo}>
                  {faixaSelecionada.descricao}
                </Text>

                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.botaoFechar}>
                  <Text style={styles.botaoFecharTexto}>Fechar</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#d6dde0ff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 45,
    paddingBottom: 55,
    padding: 20,
  },
  card: {
    backgroundColor: '#eeededff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
  },
  faixa: {
    width: '100%',
    height: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
  },
  item: {
    fontSize: 13,
    marginLeft: 10,
    marginTop: 2,
  },
  link: {
    color: '#A81412',
    marginTop: 10,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '90%',
    height: '80%',
    borderRadius: 12,
    padding: 20,
    elevation: 10,
  },
  modalScrollContent: {
    paddingBottom: 30,
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalImagem: {
    width: '100%',
    height: 150,
    marginBottom: 16,
    borderRadius: 8,
  },
  modalConteudo: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
    textAlign: 'justify',
  },
  botaoFechar: {
    marginTop: 20,
    alignSelf: 'flex-end',
    padding: 8,
    backgroundColor: '#A81412',
    borderRadius: 6,
  },
  botaoFecharTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
});
