import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { buscarTecnicas, Faixa, Tecnica } from '../../../services/tecnicasService';

interface TecnicaDisplay {
  id: string;
  name: string;
  description: string;
  categoria: string;
  subcategoria: string;
}

const ModalFaixaBranca = () => {
  const [expanded, setExpanded] = useState(true);
  const [tecnicas, setTecnicas] = useState<TecnicaDisplay[]>([]);
  const [faixaNome, setFaixaNome] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarTecnicas = async () => {
      try {
        setCarregando(true);
        setErro('');
        
        const resultado = await buscarTecnicas();

        // Filtra apenas a faixa "Branca"
        const faixaBranca = resultado.find((item: Faixa) => item.faixa === "Branca");
        
        if (!faixaBranca) {
          throw new Error('Faixa Branca não encontrada nos dados');
        }

        // Processa as técnicas da faixa branca
        const tecnicasProcessadas = faixaBranca.tecnicas.map((tecnica: Tecnica, i: number) => ({
          id: `${i}`,
          name: `${tecnica.japones} (${tecnica.portugues})`,
          description: `${tecnica.categoria} - ${tecnica.subcategoria}`,
          categoria: tecnica.categoria,
          subcategoria: tecnica.subcategoria,
        }));

        setTecnicas(tecnicasProcessadas);
        setFaixaNome(faixaBranca.faixa);
        
      } catch (err) {
        const mensagem = err instanceof Error ? err.message : 'Erro ao buscar técnicas';
        setErro(mensagem);
        Alert.alert('Erro', mensagem);
      } finally {
        setCarregando(false);
      }
    };

    carregarTecnicas();
  }, []);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4a90e2" />
        <Text style={styles.loadingText}>Carregando técnicas...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Erro ao carregar técnicas</Text>
        <Text style={styles.errorMessage}>{erro}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => {
            setErro('');
            setCarregando(true);
            // Re-executar o useEffect
          }}
        >
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header da Faixa */}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={toggleExpansion}
          activeOpacity={0.7}
        >
          <View style={styles.sectionHeaderContent}>
            <Text style={styles.sectionTitle}>{faixaNome}</Text>
            <Text style={styles.itemCount}>({tecnicas.length} técnicas)</Text>
          </View>
          <Text style={styles.expandIcon}>{expanded ? '▼' : '▶'}</Text>
        </TouchableOpacity>

        {/* Lista de Técnicas */}
        {expanded && (
          <View style={styles.tecnicasContainer}>
            {tecnicas.map((tecnica, index) => (
              <View key={tecnica.id}>
                <View style={styles.item}>
                  <Text style={styles.itemName}>{tecnica.name}</Text>
                  <Text style={styles.itemDescription}>{tecnica.description}</Text>
                </View>
                {index < tecnicas.length - 1 && <View style={styles.separator} />}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#f5f5f5' 
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: { 
    paddingBottom: 25,
    paddingTop: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4a90e2',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 10,
    borderRadius: 8,
    marginHorizontal: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeaderContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  itemCount: {
    fontSize: 12,
    color: '#e6f3ff',
    marginTop: 2,
  },
  expandIcon: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  tecnicasContainer: {
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  item: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderLeftWidth: 3,
    borderLeftColor: '#4a90e2',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#4a90e2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ModalFaixaBranca;