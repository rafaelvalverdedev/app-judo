import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, Image, RefreshControl, TouchableOpacity,
} from 'react-native';

import noticiasJson from '../noticias.json'; // <== AQUI

type Noticia = {
  id: string;
  titulo: string;
  resumo: string;
  imagem: string;
  data: string;
};

export default function Noticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const carregarNoticias = () => {
    setNoticias(noticiasJson);
    setRefreshing(false);
  };

  useEffect(() => {
    carregarNoticias();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      carregarNoticias();
    }, 500);
  };

  const renderItem = ({ item }: { item: Noticia }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.imagem }} style={styles.imagem} />
      <View style={styles.textoContainer}>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text style={styles.resumo}>{item.resumo}</Text>
        <Text style={styles.data}>{item.data}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={noticias}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f4f4f4',
    elevation: 2,
  },
  imagem: {
    width: '100%',
    height: 200,
  },
  textoContainer: {
    padding: 16,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  resumo: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  data: {
    fontSize: 12,
    color: '#999',
  },
});
