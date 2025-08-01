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
  japones: string;
  portugues: string;
  categoria: string;
  subcategoria: string;
  ilustracao: string;
  vocabulario: string;
}

interface CategoriaAgrupada {
  categoria: string;
  subcategoria: string;
  tecnicas: TecnicaDisplay[];
}

const ModalFaixaBranca = () => {
  const [expanded, setExpanded] = useState(false);
  const [categoriasExpandidas, setCategoriasExpandidas] = useState<{[key: string]: boolean}>({});
  const [tecnicasExpandidas, setTecnicasExpandidas] = useState<{[key: string]: boolean}>({});
  const [categorias, setCategorias] = useState<CategoriaAgrupada[]>([]);
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
        const tecnicasProcessadas: TecnicaDisplay[] = faixaBranca.tecnicas.map((tecnica: Tecnica, i: number) => ({
          id: `${i}`,
          japones: tecnica.japones,
          portugues: tecnica.portugues,
          categoria: tecnica.categoria,
          subcategoria: tecnica.subcategoria,
          ilustracao: tecnica.ilustracao || '',
          vocabulario: tecnica.vocabulario || '',
        }));

        // Agrupa técnicas por categoria e subcategoria
        const categoriasMap = new Map<string, CategoriaAgrupada>();
        
        tecnicasProcessadas.forEach(tecnica => {
          const chave = `${tecnica.categoria}_${tecnica.subcategoria}`;
          
          if (!categoriasMap.has(chave)) {
            categoriasMap.set(chave, {
              categoria: tecnica.categoria,
              subcategoria: tecnica.subcategoria,
              tecnicas: []
            });
          }
          
          categoriasMap.get(chave)!.tecnicas.push(tecnica);
        });

        const categoriasArray = Array.from(categoriasMap.values());
        setCategorias(categoriasArray);
        setFaixaNome(faixaBranca.faixa);

        // Inicializa todas as categorias como fechadas
        const estadoExpansao: {[key: string]: boolean} = {};
        categoriasArray.forEach((cat, index) => {
          estadoExpansao[`${cat.categoria}_${cat.subcategoria}`] = false;
        });
        setCategoriasExpandidas(estadoExpansao);
        
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

  const toggleCategoriaExpansion = (chave: string) => {
    setCategoriasExpandidas(prev => ({
      ...prev,
      [chave]: !prev[chave]
    }));
  };

  const toggleTecnicaExpansion = (tecnicaId: string) => {
    setTecnicasExpandidas(prev => ({
      ...prev,
      [tecnicaId]: !prev[tecnicaId]
    }));
  };

  const retryLoad = () => {
    setErro('');
    setCarregando(true);
    // O useEffect será executado novamente devido à mudança no estado
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
          onPress={retryLoad}
        >
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const totalTecnicas = categorias.reduce((total, cat) => total + cat.tecnicas.length, 0);

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header da Faixa - Sempre visível */}
        <View style={styles.sectionHeaderFixed}>
          <View style={styles.sectionHeaderContent}>
            <Text style={styles.sectionTitle}>Faixa {faixaNome}</Text>
            <Text style={styles.itemCount}>({totalTecnicas} técnicas)</Text>
          </View>
        </View>

        {/* Categorias com Técnicas */}
        <View style={styles.categoriasButtonsContainer}>
          {categorias.map((categoria, categoryIndex) => {
            const chaveCategoria = `${categoria.categoria}_${categoria.subcategoria}`;
            const isExpanded = categoriasExpandidas[chaveCategoria];
            
            return (
              <View key={chaveCategoria} style={styles.categoriaWrapper}>
                {/* Botão da Categoria */}
                <TouchableOpacity
                  style={styles.categoriaButton}
                  onPress={() => toggleCategoriaExpansion(chaveCategoria)}
                  activeOpacity={0.7}
                >
                  <View style={styles.categoriaButtonContent}>
                    <Text style={styles.categoriaButtonTitle}>{categoria.categoria}</Text>
                    <Text style={styles.categoriaButtonSubtitle}>{categoria.subcategoria}</Text>
                  </View>
                  <Text style={styles.categoriaButtonIcon}>{isExpanded ? '▼' : '▶'}</Text>
                </TouchableOpacity>

                {/* Técnicas da Categoria (aparecem logo abaixo do botão) */}
                {isExpanded && (
                  <View style={styles.tecnicasExpandedContainer}>
                    <View style={styles.tecnicasContainer}>
                      {categoria.tecnicas.map((tecnica, index) => {
                        const isTecnicaExpanded = tecnicasExpandidas[tecnica.id];
                        
                        return (
                          <View key={tecnica.id}>
                            <TouchableOpacity 
                              style={styles.item}
                              onPress={() => toggleTecnicaExpansion(tecnica.id)}
                              activeOpacity={0.7}
                            >
                              <View style={styles.itemHeader}>
                                <Text style={styles.itemName}>
                                  {tecnica.japones}
                                  {tecnica.portugues && ` (${tecnica.portugues})`}
                                </Text>
                                <Text style={styles.tecnicaExpandIcon}>
                                  {isTecnicaExpanded ? '▼' : '▶'}
                                </Text>
                              </View>
                            </TouchableOpacity>
                            
                            {/* Ilustração expansível */}
                            {isTecnicaExpanded && (
                              <View style={styles.ilustracaoContainer}>
                                {tecnica.ilustracao ? (
                                  <Text style={styles.itemIlustracao}>
                                    📚 {tecnica.ilustracao}
                                  </Text>
                                ) : (
                                  <Text style={styles.itemSemIlustracao}>
                                    📚 Ilustração não disponível
                                  </Text>
                                )}
                              </View>
                            )}
                            
                            {index < categoria.tecnicas.length - 1 && <View style={styles.separator} />}
                          </View>
                        );
                      })}
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </View>
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
  sectionHeaderFixed: {
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
  categoriasButtonsContainer: {
    marginHorizontal: 10,
    marginTop: 5,
  },

  categoriaButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2e7bd6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoriaButtonContent: {
    flex: 1,
  },
  categoriaButtonTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  categoriaButtonSubtitle: {
    fontSize: 11,
    color: '#b3d9ff',
    marginTop: 2,
  },
  categoriaButtonIcon: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  tecnicasExpandedContainer: {
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 6,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
  categoriasContainer: {
    marginHorizontal: 10,
    marginTop: 5,
  },
  categoriaWrapper: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoriaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2e7bd6',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  categoriaHeaderContent: {
    flex: 1,
  },
  categoriaTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  subcategoriaTitle: {
    fontSize: 12,
    color: '#b3d9ff',
    marginTop: 2,
  },
  categoriaExpandIcon: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    width: 20,
    textAlign: 'center',
  },
  tecnicasContainer: {
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderLeftWidth: 3,
    borderLeftColor: '#4a90e2',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  tecnicaExpandIcon: {
    fontSize: 14,
    color: '#4a90e2',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  ilustracaoContainer: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#4a90e2',
  },
  itemIlustracao: {
    fontSize: 13,
    color: '#2e7bd6',
    fontStyle: 'italic',
  },
  itemSemIlustracao: {
    fontSize: 13,
    color: '#999',
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