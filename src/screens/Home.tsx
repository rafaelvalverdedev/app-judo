import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { COLORS, FONT_SIZE, FONT_FAMILY } from '../theme/theme';
import { Texto } from '../components/Texto';
// Componente de texto personalizado

export default function Home() {
  return (
    // SafeAreaView para o conteúdo da tela, garantindo que não se sobreponha à barra de status
    // e à área inferior (se houver gestos)
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Texto style={styles.title}>Judô Conde Koma</Texto>
          <Texto style={styles.paragraph}>
            Este é o conteúdo da sua tela inicial.
            Role para baixo para ver mais...
          </Texto>


          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text>bbbbbbbbbbbbbb</Text>
          <Text>aaaaaaaaaaaa</Text>
          {/* Adicione mais conteúdo para testar a rolagem */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Permite que a SafeAreaView ocupe todo o espaço disponível   
  },
  
  scrollContent: {
    flexGrow: 1, // Permite que o conteúdo do ScrollView se expanda
    paddingBottom: 65,
  },
  
  container: {
    flex: 1, // Opcional, dependendo do seu layout
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  
  
  title: { 
    color: COLORS.primary,
  },

  paragraph: {
    textAlign: 'center',
  },
});