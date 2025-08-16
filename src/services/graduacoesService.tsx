// src/services/graduacoesService.ts

export interface Faixa {
  cor: string;
  ponteira: string;
  nome: string;
  requisitos: string[];
  videoUrl: string;
  imagem?: string;
  descricao: string;
}

// Caminho local para testes
import graduacoesTeste from '../graduacao.json';

// Alternador de ambiente
const USAR_LOCAL = false;

// Função para buscar graduações (API ou local)
export async function buscarGraduacoes(): Promise<Faixa[]> {
  if (USAR_LOCAL) {
    // Dados locais (úteis para testes offline ou desenvolvimento)
    return graduacoesTeste as Faixa[];
  }

  const url = 'https://raw.githubusercontent.com/rafaelvalverdedev/app-judo/refs/heads/master/src/graduacao.json';

  try {
    const response = await fetch(url, {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Faixa[];

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
    console.error('Erro ao buscar graduações:', errorMessage);
    throw new Error(errorMessage);
  }
}
