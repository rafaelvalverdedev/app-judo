import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Texto } from '../../../components/Texto';

import { buscarTecnicasNovo } from '../../../services/tecnicasService';

interface Props {
    nome: string;
}

interface Tecnica {
    name: string;
    description: string;
    exigencia: string[];
}

interface TecnicasPorGrupo {
    nage: Tecnica[];
    katame: Tecnica[];
}

const ModalFaixaGenerica = ({ nome }: Props) => {
    const [tecnicasFiltradas, setTecnicasFiltradas] = useState<TecnicasPorGrupo>({ nage: [], katame: [] });
    const [expandido, setExpandido] = useState<string | null>(null); // só um aberto

    useEffect(() => {
        async function carregarTecnicas() {
            try {
                const tecnicas = await buscarTecnicasNovo();

                const nomeFiltrado = nome.replace('Faixa ', '').trim();
                const resultado: TecnicasPorGrupo = { nage: [], katame: [] };

                for (const [grupoNome, grupo] of Object.entries(tecnicas)) {
                    if (typeof grupo !== 'object') continue;

                    for (const subgrupo of Object.values(grupo)) {
                        const subgrupoTyped = subgrupo as { techniques?: Tecnica[] };
                        if (!subgrupoTyped.techniques || !Array.isArray(subgrupoTyped.techniques)) continue;

                        const filtradas = subgrupoTyped.techniques.filter((tec: Tecnica) =>
                            tec.exigencia.includes(nomeFiltrado)
                        );

                        if (grupoNome === "Nage-Waza") {
                            resultado.nage.push(...filtradas);
                        } else if (grupoNome === "Katame-waza") {
                            resultado.katame.push(...filtradas);
                        }
                    }
                }

                setTecnicasFiltradas(resultado);
                setExpandido(null);
            } catch (error) {
                console.error("Erro ao carregar técnicas:", error);
            }
        }

        carregarTecnicas();
    }, [nome]);


    const toggleExpand = (id: string) => {
        setExpandido(prev => (prev === id ? null : id)); // fecha se for o mesmo, abre se for outro
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Nage-Waza */}
            {tecnicasFiltradas.nage.length > 0 && (
                <>
                    <Text style={styles.tituloGrupo}>Nage-Waza</Text>
                    <Texto>Técnica de Projeção</Texto>
                    {tecnicasFiltradas.nage.map((tec, i) => {
                        const id = `nage-${i}`;
                        const aberto = expandido === id;
                        return (
                            <TouchableOpacity key={id} style={styles.card} onPress={() => toggleExpand(id)}>
                                <View style={styles.header}>
                                    <Text style={styles.nome}>{tec.name}</Text>
                                    <Text style={styles.icon}>{aberto ? '▼' : '▶'}</Text>
                                </View>
                                {aberto && <Text style={styles.desc}>{tec.description}</Text>}
                            </TouchableOpacity>
                        );
                    })}
                </>
            )}

            {/* Katame-waza */}
            {tecnicasFiltradas.katame.length > 0 && (
                <>
                    <Text style={styles.tituloGrupo}>Katame-waza</Text>
                    <Texto>Técnica de Imobilizaçao</Texto>
                    {tecnicasFiltradas.katame.map((tec, i) => {
                        const id = `katame-${i}`;
                        const aberto = expandido === id;
                        return (
                            <TouchableOpacity key={id} style={styles.card} onPress={() => toggleExpand(id)}>
                                <View style={styles.header}>
                                    <Text style={styles.nome}>{tec.name}</Text>
                                    <Text style={styles.icon}>{aberto ? '▼' : '▶'}</Text>
                                </View>
                                {aberto && <Text style={styles.desc}>{tec.description}</Text>}
                            </TouchableOpacity>
                        );
                    })}
                </>
            )}

            {tecnicasFiltradas.nage.length === 0 && tecnicasFiltradas.katame.length === 0 && (
                <Text style={styles.semResultado}>Nenhuma técnica encontrada para: {nome}</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: '#fff' },
    semResultado: { textAlign: 'center', color: '#999', marginTop: 20 },
    tituloGrupo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#6D0F0F',
    },
    card: {
        marginBottom: 10,
        backgroundColor: '#f6f6f6',
        borderRadius: 8,
        padding: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#6D0F0F',
    },
    header: { flexDirection: 'row', justifyContent: 'space-between' },
    nome: { fontSize: 16, fontWeight: '600' },
    icon: { fontSize: 16 },
    desc: { marginTop: 6, color: '#333', textAlign: 'justify' },
});

export default ModalFaixaGenerica;
