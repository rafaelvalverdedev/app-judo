import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const ModalFaixaBranca = () => {
  const [tecnica1Expandida, setTecnica1Expandida] = useState(false);
  const [tecnicaSubExpandida, setTecnicaSubExpandida] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>


            {/* Técnica 1 */}
            <TouchableOpacity
              style={styles.item}
              onPress={() => setTecnica1Expandida(!tecnica1Expandida)}
            >
              <View style={styles.itemHeader}>
                <Text style={styles.itemName}>  PRIMEIRO MENU</Text>
                <Text style={styles.expandIcon}>{tecnica1Expandida ? '▼' : '▶'}</Text>
              </View>

            </TouchableOpacity>
            {tecnica1Expandida && (
              <View style={styles.ilustracaoContainer}>

                <TouchableOpacity
                  style={styles.subItem}
                  onPress={() => setTecnicaSubExpandida(!tecnicaSubExpandida)}
                >
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemName}> SEGUNDO MENU</Text>
                    <Text style={styles.expandIcon}>{tecnicaSubExpandida ? '▼' : '▶'}</Text>
                  </View>

                  {tecnicaSubExpandida && (
                    <View style={[styles.itemHeader, styles.subItem3]}>
                      <Text style={styles.itemName3}>CONTEUDO SEGUNDO MENU</Text>
                    </View>

                  )}
                </TouchableOpacity>
              </View>


            )}

            <View style={styles.separator} />


      </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({

  container: { flex: 1 },
  contentContainer: { paddingBottom: 1, backgroundColor: '#6D0F0F' },
  expandIcon: { fontSize: 18, color: '#f6f6f6', fontWeight: 'bold' },
  itemName: { fontSize: 16, fontWeight: '500', color: '#fff' },
  itemName3: { fontSize: 16, fontWeight: '500', color: '#999' },

  ilustracaoContainer: {
    backgroundColor: '#f8f9fa',
    borderLeftWidth: 5,
    borderLeftColor: '#6D0F0F',
  },

  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  item: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#6D0F0F',
  },

  subItem: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#6D0F0F',
    backgroundColor: '#746060',
  },


  subItem3: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderLeftWidth: 3,
    borderLeftColor: '#e4bfbfff',
    backgroundColor: '#ffffffff',
  },

  separator: { height: 1, backgroundColor: '#e0e0e0' },
});

export default ModalFaixaBranca;
