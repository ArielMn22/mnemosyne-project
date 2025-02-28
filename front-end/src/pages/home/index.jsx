import "./home.css"; // Importa o arquivo de estilos CSS específico para esta página
import Header from "../../components/header"; // Importa o componente de cabeçalho da aplicação
import { useEffect, useState } from "react"; // Importa funções do React para gerenciar estado e efeitos colaterais
import memoriesService from "../../services/memory"; // Importa o serviço responsável por buscar as memórias no backend

const Home = () => {

    // Define um estado para armazenar as memórias que serão exibidas na tela
    const [memories, setMemories] = useState([]);

    // useEffect executa uma ação quando o componente é montado na tela
    useEffect(() => {
        getMemories(); // Chama a função que busca as memórias
    }, []); // O array vazio faz com que essa função rode apenas uma vez

    // Função assíncrona para buscar as memórias no serviço
    const getMemories = async () => {
        const response = await memoriesService.getMemories(); // Chama o serviço para obter as memórias

        if (response.length > 0) { // Verifica se há memórias disponíveis
            setMemories(response); // Atualiza o estado com as memórias obtidas
        }
    }

    return (
        <>
            <Header /> {/* Renderiza o cabeçalho da aplicação */}

            <main className="app-main"> {/* Área principal da página */}
                <h1>Minhas memórias</h1> {/* Título da página */}

                <div className="memories-container"> {/* Contêiner que agrupa todas as memórias */}
                    {memories.map((memory, index) => ( // Percorre a lista de memórias e cria um elemento para cada uma
                        <a key={index} href={`/memory?id=${memory.id}`}> {/* Link para acessar detalhes da memória */}
                            <div className="memory-card"> {/* Cartão que representa cada memória */}
                                <div className="image" 
                                    style={{ backgroundImage: `url(${memoriesService.base64ToImage(memory.images[0])})` }}> {/* Exibe a primeira imagem da memória como fundo */}
                                </div>

                                <h2>{memory.title}</h2> {/* Exibe o título da memória */}

                                <p>{memory.description.substring(0, 45) + "..."}</p> {/* Mostra uma parte da descrição da memória */}
                            </div>
                        </a>
                    ))}
                </div>
            </main>

            <footer className="app-footer"> {/* Rodapé da aplicação */}
                <p>Mnemosyne - Ariel Paixão dos Santos</p> {/* Texto de rodapé */}
            </footer>
        </>
    );
}

export default Home; // Exporta o componente para ser usado em outras partes do aplicativo
