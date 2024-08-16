import { aleatorio, nome } from './aleatorio.js'; // Importando a função aleatorio() e a variável nome
import { perguntas } from './perguntas.js'; // Importando o objeto perguntas

const caixaPrincipal = document.querySelector(".caixa-principal"); // Selecionando a caixa principal
const caixaPerguntas = document.querySelector(".caixa-perguntas"); // Selecionando a caixa de perguntas
const caixaAlternativas = document.querySelector(".caixa-alternativas"); // Selecionando a caixa de alternativas
const caixaResultado = document.querySelector(".caixa-resultado"); // Selecionando a caixa de resultado
const textoResultado = document.querySelector(".texto-resultado"); // Selecionando o elemento de texto do resultado
const botaoJogarNovamente = document.querySelector(".novamente-btn"); // Selecionando o botão de jogar novamente
const botaoIniciar = document.querySelector(".iniciar-btn"); // Selecionando o botão de iniciar
const telaInicial = document.querySelector(".tela-inicial"); // Selecionando a tela inicial

let atual = 0;
let perguntaAtual;
let historiaFinal = "";

botaoIniciar.addEventListener('click', iniciaJogo); // Adicionando um evento de clique ao botão de iniciar

function iniciaJogo() {
    atual = 0;
    historiaFinal = "";
    telaInicial.style.display = 'none';
    caixaPerguntas.classList.remove("mostrar");
    caixaAlternativas.classList.remove("mostrar");
    caixaResultado.classList.remove("mostrar");
    mostraPergunta();
} // Função que inicia o jogo

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    } // Verifica se o jogo acabou
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    mostraAlternativas(); // Chama a função para mostrar as alternativas
} // Função que mostra a pergunta atual

function mostraAlternativas() {
    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa)); // Adiciona um evento de clique para cada botão de alternativa
        caixaAlternativas.appendChild(botaoAlternativas); // Adiciona o botão de alternativa à caixa de alternativas
    } // Loop que adiciona cada botão de alternativa à caixa de alternativas
} // Função que mostra as alternativas para a pergunta atual

function respostaSelecionada(opcaoSelecionada) {
    const afirmacoes = aleatorio(opcaoSelecionada.afirmacao);
    historiaFinal += afirmacoes + " ";
    if (opcaoSelecionada.proxima !== undefined) {
        atual = opcaoSelecionada.proxima; // Atualiza o valor de atual para a próxima pergunta
    } else {
        mostraResultado();
        return; // Se não houver próxima pergunta, mostra o resultado
    }
    mostraPergunta();
} // Função que verifica a resposta selecionada e atualiza o jogo

function mostraResultado() {
    caixaPerguntas.textContent = `Em 2049, ${nome}`;
    textoResultado.textContent = historiaFinal;
    caixaAlternativas.textContent = "";
    caixaResultado.classList.add("mostrar");
    botaoJogarNovamente.addEventListener("click", jogaNovamente);
} // Função que mostra o resultado final do jogo

function jogaNovamente() {
    atual = 0;
    historiaFinal = "";
    caixaResultado.classList.remove("mostrar");
    mostraPergunta();
} // Função que reinicia o jogo

function substituiNome() {
    for (const pergunta of perguntas) {
        pergunta.enunciado = pergunta.enunciado.replace(/você/g, nome);
    } // Substitui o nome na pergunta
} // Função que substitui o nome na pergunta

substituiNome(); // Chama a função para substituir o nome na pergunta