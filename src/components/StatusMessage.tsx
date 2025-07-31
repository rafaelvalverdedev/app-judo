// src/components/StatusMessage.tsx

import React from 'react';
import { View, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { Texto } from './Texto';
import { COLORS } from '../theme/theme';

interface StatusMessageProps {
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
}

export function StatusMessage({ loading, error, onRetry }: StatusMessageProps) {
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Texto style={styles.text}>Carregando graduações...</Texto>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Texto style={[styles.text, styles.errorText]}>Erro: {error}</Texto>
        {onRetry && (
          <TouchableOpacity style={styles.button} onPress={onRetry} activeOpacity={0.8}>
            <Texto style={styles.buttonText}>Tentar novamente</Texto>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 12,
  },
  errorText: {
    color: 'red',
  },
  button: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    elevation: 2,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
