# 🥋 App Judô — DOCUMENTATION.md

## 📘 Visão Geral

O **App Judô** é um aplicativo desenvolvido com **React Native + Expo**, criado para auxiliar **alunos** e **professores** de Judô no aprendizado, acompanhamento e ensino das técnicas e fundamentos do esporte.

O foco é fornecer um ambiente didático, simples e funcional, que reúna informações sobre:
- As **faixas e graduações**
- A **história e filosofia do Judô**
- **Notícias e curiosidades**
- E futuramente, recursos interativos para o estudo e prática das técnicas

---

## ⚙️ Stack Tecnológica

- **Framework:** Expo (React Native)
- **Linguagem:** TypeScript ou JavaScript (dependendo da sua configuração atual)
- **Gerenciamento de Navegação:** React Navigation (Stack e/ou Tab)
- **Armazenamento local:** AsyncStorage (opcional)
- **APIs externas:** Futuras implementações (notícias, vídeos, etc.)
- **Bibliotecas adicionais:**  
  - `expo-status-bar` — controle da barra de status  
  - `react-native-vector-icons` — ícones  
  - `expo-av` ou `react-native-video` — reprodução de vídeos  
  - `expo-font` — fontes personalizadas  

---

## 🗂️ Estrutura de Pastas

```plaintext
app-judo/
│
├── App.tsx                 # Ponto de entrada do aplicativo Expo
├── assets/                 # Imagens, ícones, splash e fontes
├── src/                    # Código-fonte principal
│   ├── screens/            # Telas (Graduação, História, Notícias, etc.)
│   ├── components/         # Componentes reutilizáveis (Cards, Botões, Listas)
│   ├── navigation/         # Configuração das rotas e navegação
│   ├── services/           # Comunicação com APIs externas ou dados locais
│   ├── utils/              # Funções auxiliares
│   └── styles/             # Estilos globais ou temas
│
├── package.json            # Dependências e scripts npm
├── app.json                # Configurações do Expo (nome, ícone, splash)
└── README.md               # Instruções básicas do projeto


## 🧭 Fluxo de Navegação
O app segue uma estrutura típica de navegação por pilha (Stack Navigation):
Tela Inicial (Home / Menu Principal)
Apresenta atalhos para as demais seções do app (Graduação, História, etc.)
Tela de Graduação
Lista das faixas e requisitos de cada uma.
Pode conter imagens e vídeos demonstrativos.
Cada faixa leva a uma tela de detalhes com suas técnicas correspondentes.
Tela de História do Judô
Conteúdo textual sobre a origem, filosofia e evolução do Judô.
Possibilidade de incluir linha do tempo e curiosidades.
Tela de Notícias (opcional / futura)
Exibe notícias e novidades do mundo do Judô.
Pode usar integração com uma API pública (RSS ou JSON remoto).
Tela de Técnicas (opcional / futura)
Galeria de golpes com vídeos, nomes japoneses e descrições.


## 🧩 Principais Componentes
Componente	Função	Exemplo de Uso
CardFaixa	Exibe uma faixa e suas informações básicas	Usado na tela de Graduação
VideoPlayer	Mostra o vídeo de uma técnica	Tela de Técnicas
Header	Cabeçalho padrão das telas	Navegação
ButtonPrimary	Botão de ação com estilo próprio	Navegação ou confirmações
ListItem	Item de lista para graduações ou notícias	Diversas telas

##  Boas Práticas Utilizadas

Componentização: cada parte visual é separada em componentes reutilizáveis.
Navegação centralizada: todas as rotas são controladas por um único arquivo.
Uso do Expo para simplificar build e acesso a recursos nativos.
Estrutura clara e modular para futuras expansões (ex: login, API).

🧪 Como Executar o Projeto

Instalar as dependências
npm install


Rodar com Expo
npx expo start


Testar no dispositivo
Escaneie o QR Code com o app Expo Go.
O app será carregado automaticamente no celular.



## 💡 Ideias para Próximas Funcionalidades
### 👩‍🎓 Para Alunos

Checklist de Técnicas: marcar o que já aprendeu por faixa.
Sistema de Favoritos: salvar técnicas preferidas.
Quiz de Termos Japoneses: reforçar aprendizado de nomes.
Notificações Motivacionais: lembrar de revisar técnicas.
Modo Offline: salvar vídeos e conteúdos para treinar sem internet.

### 🧑‍🏫 Para Professores

Modo Apresentação: exibir vídeos e descrições em tela cheia.
Controle de Turmas: cadastrar alunos e progresso.
Aulas Planejadas: criar listas de técnicas para cada aula.
Histórico de Treinos: registrar datas e presença.
Comparativo de Execução (futuro): gravar o aluno e comparar com vídeo oficial.

## 🏗️ Possíveis Melhorias Técnicas Futuras

Implementar Context API ou Redux para estados globais.
Adicionar React Query / Axios para consumo de APIs.
Suporte a dark mode com temas dinâmicos.
Criação de testes unitários com Jest.
Adicionar autenticação JWT (para perfis de aluno/professor).

## 🧾 Créditos e Autoria

Desenvolvido por: Rafael Valverde Fonseca
Plataforma: Expo + React Native
Objetivo: Estudo e aplicação prática de conceitos de desenvolvimento mobile.

## 🏁 Conclusão

Este documento serve como guia técnico e conceitual do app Judô, permitindo fácil manutenção, expansão e entendimento por novos desenvolvedores.
A estrutura atual está pronta para:
Crescer de forma modular
Adicionar novas telas e APIs
Evoluir para um aplicativo completo para alunos e professores de Judô