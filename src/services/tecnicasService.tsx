// src/tecnicasService-novo.tsx

// Importa localmente quando estiver em modo teste
import tecnicasLocal from '../tecnicas.json';

// Tipos baseados no JSON real
export interface Tecnica {
  name: string;
  description: string;
  exigencia: string[];
}

export interface SubGrupo {
  total_techniques: number;
  techniques: Tecnica[];
}

export interface TecnicasData {
  "Nage-Waza": {
    total_techniques: number;
    [sub: string]: SubGrupo | number; // Te-waza, Koshi-waza, etc.
  };
  "Katame-waza": {
    total_techniques: number;
    [sub: string]: SubGrupo | number; // Osaekomi-waza, Shime-waza, etc.
  };
}

// Alternador de ambiente
const USAR_LOCAL = false;

export async function buscarTecnicasNovo(): Promise<TecnicasData> {
  if (USAR_LOCAL) {
    return tecnicasLocal as TecnicasData;
  }

  const url =
    'https://raw.githubusercontent.com/rafaelvalverdedev/app-judo/master/src/tecnicas.json';

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

    const tecnicas = (await response.json()) as TecnicasData;
    return tecnicas;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
    console.error('Erro ao buscar tecnicas:', errorMessage);
    throw new Error(errorMessage);
  }
}
