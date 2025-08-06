// src/components/AdvancedSplash.tsx
import React, { useEffect, useRef } from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

interface AdvancedSplashProps {
  onFinish: () => void;
}

export default function AdvancedSplash({ onFinish }: AdvancedSplashProps) {
  const logoRef = useRef<any>(null);
  const titleRef = useRef<any>(null);
  const subtitleRef = useRef<any>(null);

  useEffect(() => {
    // Sequência de animações
    const animationSequence = async () => {
      // Espera 500ms
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Anima o logo
      if (logoRef.current) {
        await logoRef.current.bounceIn(1000);
      }
      
      // Espera 300ms
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Anima o título
      if (titleRef.current) {
        await titleRef.current.slideInUp(800);
      }
      
      // Espera 200ms
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Anima o subtítulo
      if (subtitleRef.current) {
        await subtitleRef.current.fadeIn(600);
      }
      
      // Espera mais 1.5s antes de fechar
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Finaliza
      onFinish();
    };

    animationSequence();
  }, [onFinish]);

  return (
    <View style={styles.container}>
      {/* Fundo gradiente simulado */}
      <View style={styles.gradient} />
      
      {/* Logo */}
      <Animatable.View
        ref={logoRef}
        style={styles.logoContainer}
      >
        <Image
          source={require('../../assets/splash/splash.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animatable.View>
      
      {/* Título */}
      <Animatable.Text
        ref={titleRef}
        style={styles.title}
      >
        Judô Conde Koma
      </Animatable.Text>
      
      {/* Subtítulo */}
      <Animatable.Text
        ref={subtitleRef}
        style={styles.subtitle}
      >
        Tradição • Disciplina • Excelência
      </Animatable.Text>
      
      {/* Elementos decorativos */}
      <Animatable.View
        animation="fadeIn"
        delay={2000}
        style={styles.decorativeLine}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  gradient: {
    position: 'absolute',
    width: width,
    height: height,
    backgroundColor: '#6D0F0F',
    opacity: 0.9,
  },
  logoContainer: {
    marginBottom: 50,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  logo: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 36,
    fontFamily: 'DMSans-ExtraBold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'DMSans-Regular',
    color: '#CCCCCC',
    textAlign: 'center',
    letterSpacing: 1,
  },
  decorativeLine: {
    width: 100,
    height: 2,
    backgroundColor: '#FFFFFF',
    marginTop: 30,
    opacity: 0.7,
  },
});