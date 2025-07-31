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

// Função para buscar graduações de uma URL externa (pode adaptar para API futura)
export async function buscarGraduacoes(): Promise<Faixa[]> {
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
