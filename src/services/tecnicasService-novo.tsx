// Caminho local para testes
import tecnicasTeste from '../tecnicas_teste.json';

// Alternador de ambiente
const USAR_LOCAL = false;

export async function buscarTecnicasNovo()  {
    if (USAR_LOCAL) {
        return tecnicasTeste;
    }

    const url = 'https://raw.githubusercontent.com/rafaelvalverdedev/app-judo/refs/heads/master/src/tecnicas_teste.json';

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

        const tecnicasTeste = await response.json();

        return tecnicasTeste;

    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
        console.error('Erro ao buscar tecnicas:', errorMessage);
        throw new Error(errorMessage);
    }
}