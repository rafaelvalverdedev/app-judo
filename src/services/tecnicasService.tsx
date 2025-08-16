// src/services/tecnicasService.ts

export interface Tecnica {
  ilustracao: string;
  japones: string;
  portugues: string;
  categoria: string;
  subcategoria: string;
  vocabulario: string;
}

export interface Faixa {
  faixa: string;
  tecnicas: Tecnica[];
}

// Caminho local para testes
import tecnicasTeste from '../tecnicas.json';

// Alternador de ambiente
const USAR_LOCAL = false;

// Função para buscar graduações (API ou local)
export async function buscarTecnicas(): Promise<Faixa[]> {
  if (USAR_LOCAL) {
    // Dados locais (úteis para testes offline ou desenvolvimento)
    return tecnicasTeste as unknown as Faixa[];
  }

  const url = 'https://raw.githubusercontent.com/rafaelvalverdedev/app-judo/refs/heads/master/src/tecnicas.json';

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
    console.error('Erro ao buscar tecnicas:', errorMessage);
    throw new Error(errorMessage);
  }
}