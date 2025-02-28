const API_URL = "https://memories-json-server.vercel.app"; // Define a URL base da API
// const API_URL = "http://localhost:3000"; // Define a URL base da API

// Função assíncrona para buscar todas as memórias
const getMemories = async () => {
    const response = await fetch(`${API_URL}/memories`); // Faz uma requisição GET para a API
    const memories = await response.json(); // Converte a resposta para JSON
    return memories; // Retorna a lista de memórias
}

// Função assíncrona para buscar uma memória específica por ID
const getMemoryById = async (id) => {
    const response = await fetch(`${API_URL}/memories/${id}`); // Faz uma requisição GET para buscar uma memória específica
    const memories = await response.json(); // Converte a resposta para JSON
    return memories; // Retorna a memória encontrada
}

// Função assíncrona para criar uma nova memória
const createMemory = async (memory) => {
    const images = memory.images; // Obtém a lista de imagens da memória
    const base64Images = []; // Array para armazenar as imagens convertidas para Base64

    for (let i = 0; i < images.length; i++) { // Percorre todas as imagens
        const base64 = await imageToBase64(images[i]); // Converte a imagem para Base64
        base64Images.push(base64); // Adiciona a imagem convertida ao array
    }

    memory.images = base64Images; // Substitui a lista de imagens pelos valores convertidos para Base64

    const response = await fetch(`${API_URL}/memories`, {
        method: "POST", // Define o método HTTP como POST
        headers: {
            "Content-Type": "application/json" // Define o cabeçalho da requisição como JSON
        },
        body: JSON.stringify(memory) // Converte o objeto da memória para JSON e envia no corpo da requisição
    });

    return response.json(); // Retorna a resposta da API convertida para JSON
}

// Função assíncrona para excluir uma memória pelo ID
const deleteMemory = async (id) => {
    const response = await fetch(`${API_URL}/memories/${id}`, {
        method: "DELETE" // Define o método HTTP como DELETE
    });

    return response.json(); // Retorna a resposta da API convertida para JSON
}

// Função para converter uma string Base64 em um objeto de imagem (Blob)
const base64ToImage = (base64, mimeType = 'image/png') => {
    const byteCharacters = atob(base64.split(',')[1]); // Decodifica a string Base64
    const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i)); // Converte os caracteres em números de bytes
    const byteArray = new Uint8Array(byteNumbers); // Cria um array de bytes
    const blob = new Blob([byteArray], { type: mimeType }); // Cria um Blob com os bytes
    return URL.createObjectURL(blob); // Gera uma URL Blob para a imagem e a retorna
}

// Função para converter uma imagem em Base64
function imageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader(); // Cria um leitor de arquivos
        reader.readAsDataURL(file); // Lê o arquivo como um Data URL (Base64)
        reader.onload = () => resolve(reader.result); // Quando a leitura for concluída, resolve a promessa com o resultado Base64
        reader.onerror = error => reject(error); // Se houver erro, rejeita a promessa
    });
}

// Exporta todas as funções para serem usadas em outros arquivos
export default { getMemories, getMemoryById, createMemory, deleteMemory, imageToBase64, base64ToImage };
