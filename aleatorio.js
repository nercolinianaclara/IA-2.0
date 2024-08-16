const nomes = ["Fernanda", "Giuliana", "Maria Eduarda", "Marcelo", "Amanda", "Gustavo", "Gabriel"]; // Lista de nomes

export function aleatorio (lista){
    const posicao = Math.floor(Math.random()* lista.length); // Gera um número aleatório entre 0 e o tamanho da lista
    return lista[posicao]; // Retorna um nome aleatório da lista
}

export const nome = aleatorio(nomes) // Chama a função aleatorio e armazena o resultado na variável nome