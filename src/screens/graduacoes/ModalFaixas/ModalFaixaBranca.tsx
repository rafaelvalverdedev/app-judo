import React, { useState } from 'react';
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const ModalFaixaBranca = () => {
  // Estado para controlar quais seções estão expandidas
  const [expandedSections, setExpandedSections] = useState<Record<string | number, boolean>>({});

  // Dados de exemplo
  const initialData = [
    {
      title: 'Frutas',
      id: 'frutas',
      data: [
        { id: '1', name: 'Maçã', description: 'Fruta vermelha e doce' },
        { id: '2', name: 'Banana', description: 'Rica em potássio' },
        { id: '3', name: 'Laranja', description: 'Rica em vitamina C' },
      ],
    },
    {
      title: 'Vegetais',
      id: 'vegetais',
      data: [
        { id: '4', name: 'Cenoura', description: 'Rica em betacaroteno' },
        { id: '5', name: 'Brócolis', description: 'Rico em ferro' },
        { id: '6', name: 'Alface', description: 'Boa para saladas' },
      ],
    },
    {
      title: 'Laticínios',
      id: 'laticinios',
      data: [
        { id: '7', name: 'Leite', description: 'Rico em cálcio' },
        { id: '8', name: 'Queijo', description: 'Fonte de proteína' },
        { id: '9', name: 'Iogurte', description: 'Contém probióticos' },
      ],
    },
  ];

  // Função para alternar expansão da seção
  const toggleSection = (sectionId: string | number) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Preparar dados baseado no estado de expansão
  const getSectionData = () => {
    return initialData.map(section => ({
      ...section,
      data: expandedSections[section.id] ? section.data : []
    }));
  };

  // Renderizar cabeçalho da seção
  const renderSectionHeader = ({
    section,
  }: {
    section: {
      title: string;
      id: string;
      data: { id: string; name: string; description: string }[];
    };
  }) => {
    const isExpanded = expandedSections[section.id];

    return (
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => toggleSection(section.id)}
        activeOpacity={0.7}
      >
        <Text style={styles.sectionTitle}>{section.title}</Text>
        <Text style={styles.expandIcon}>
          {isExpanded ? '▼' : '▶'}
        </Text>
      </TouchableOpacity>
    );
  };

  // Renderizar item da lista
  const renderItem = ({
    item,
  }: {
    item: { id: string; name: string; description: string };
  }) => (
    <View style={styles.item}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={getSectionData()}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },

  
  contentContainer: {
    paddingBottom: 25,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  expandIcon: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 10,
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
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 10,
  },
});

export default ModalFaixaBranca;