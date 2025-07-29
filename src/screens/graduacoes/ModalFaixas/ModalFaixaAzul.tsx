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

export default function FaixaAzul() {
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
