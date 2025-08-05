// src/components/ModalFaixas/ModalFaixaGenerica.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import tecnicas from '../../../tecnicas_teste.json';

interface Props {
    nome: string; // Nome da faixa (ex: "Faixa Branca", "Faixa Azul")
}

interface Tecnica {
    name: string;
    description: string;
    exigencia: string[];
}


const ModalFaixaGenerica = ({ nome }: Props) => {

    const [tecnicasFiltradas, setTecnicasFiltradas] = useState<Tecnica[]>([]);
    const [expandido, setExpandido] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        const resultado: Tecnica[] = [];

        const nomeFiltrado = nome.replace('Faixa ', '').trim(); // Ex: "Branca"

        for (const grupo of Object.values(tecnicas)) {
            if (typeof grupo !== 'object') continue;

            for (const subgrupo of Object.values(grupo)) {
                if (!subgrupo || typeof subgrupo !== 'object' || !Array.isArray(subgrupo.techniques)) continue;

                const filtradas = subgrupo.techniques.filter((tec: Tecnica) =>
                    tec.exigencia.length === 1 && tec.exigencia[0] === nomeFiltrado
                );

                resultado.push(...filtradas);
            }
        }

        setTecnicasFiltradas(resultado);
    }, [nome]);



    return (
        <ScrollView contentContainerStyle={styles.container}>
            {tecnicasFiltradas.length === 0 ? (
                <Text style={styles.semResultado}>Nenhuma técnica encontrada para: {nome}</Text>
            ) : (
                tecnicasFiltradas.map((tec, i) => (
                    <TouchableOpacity key={i} style={styles.card} onPress={() =>
                        setExpandido(prev => ({ ...prev, [i]: !prev[i] }))
                    }>
                        <View style={styles.header}>
                            <Text style={styles.nome}>{tec.name}</Text>
                            <Text style={styles.icon}>{expandido[i] ? '▼' : '▶'}</Text>
                        </View>
                        {expandido[i] && <Text style={styles.desc}>{tec.description}</Text>}
                    </TouchableOpacity>
                ))
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: '#fff' },
    semResultado: { textAlign: 'center', color: '#999', marginTop: 20 },
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
