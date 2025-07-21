import React from 'react';
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
import { COLORS } from '../../layout'; // Importando as constantes de cores

import GraduacaoJson from '../../graduacao.json';

export default function FaixaCinza() {
  return (
    <>
      <View style={styles.ContainerFaixaBranca }>
        <Text>cinza</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  ContainerFaixaBranca: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: '110%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
