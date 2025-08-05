import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import tecnicasTeste from '../../../tecnicas_teste.json';

interface ModalFaixaBrancaProps {
  nome: string;
}

interface Tecnica {
  name: string;
  description: string;
  exigencia: string[];
}

const ModalFaixaBranca = ({ nome }: ModalFaixaBrancaProps) => {
  const [tecnicasBranca, setTecnicasBranca] = useState<Tecnica[]>([]);
  const [expandido, setExpandido] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const tecnicasEncontradas: Tecnica[] = [];

    // Percorre os grupos principais: Nage-Waza, Katame-waza, etc.
    for (const grupo of Object.values(tecnicasTeste)) {
      if (typeof grupo !== 'object' || Array.isArray(grupo)) continue;

      // Percorre os subgrupos: Te-waza, Ashi-waza, etc.
      for (const subgrupo of Object.values(grupo)) {
        if (!subgrupo || typeof subgrupo !== 'object' || !Array.isArray(subgrupo.techniques)) continue;

        // Filtra técnicas com "Branca" na exigência
        const tecnicas = subgrupo.techniques.filter((tecnica: Tecnica) =>
          tecnica.exigencia.some(exig => exig.includes(nome))
        );

        tecnicasEncontradas.push(...tecnicas);
      }
    }

    setTecnicasBranca(tecnicasEncontradas);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.faixaNome}>Faixa: {nome}</Text>

        {tecnicasBranca.map((tecnica, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() =>
              setExpandido(prev => ({ ...prev, [index]: !prev[index] }))
            }
          >
            <View style={styles.itemHeader}>
              <Text style={styles.itemName}>{tecnica.name}</Text>
              <Text style={styles.expandIcon}>
                {expandido[index] ? '▼' : '▶'}
              </Text>
            </View>
            {expandido[index] && (
              <View style={styles.subItem}>
                <Text style={styles.itemName3}>{tecnica.description}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}

        {tecnicasBranca.length === 0 && (
          <Text style={styles.itemName}>Nenhuma técnica para faixa branca encontrada.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { paddingBottom: 20, backgroundColor: '#6D0F0F' },
  faixaNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#5A0E0E',
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#6D0F0F',
    backgroundColor: '#ffffff',
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  expandIcon: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  subItem: {
    paddingVertical: 10,
  },
  itemName3: {
    fontSize: 14,
    color: '#333',
    textAlign: 'justify',
  },
});

export default ModalFaixaBranca;
