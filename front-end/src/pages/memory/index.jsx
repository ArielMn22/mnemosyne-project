import "./memory.css"; // Importa os estilos específicos para esta página
import Header from "../../components/header"; // Importa o componente de cabeçalho
import { useEffect, useState } from "react"; // Importa funções do React para gerenciar estado e efeitos colaterais
import memoryService from "../../services/memory"; // Importa o serviço responsável por gerenciar memórias
import trash from "../../assets/icons/trash-solid.svg"; // Importa o ícone de lixeira para exclusão de memória

const Memory = () => {

    // Define um estado para armazenar os dados da memória
    const [memory, setMemory] = useState();

    useEffect(() => {
        // Obtém o ID da memória a partir da URL
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const memoryId = params.get("id");

        getMemory(memoryId); // Chama a função para buscar os dados da memória
    }, []);

    // Função assíncrona para buscar uma memória pelo ID
    const getMemory = async (id) => {
        let response = await memoryService.getMemoryById(id); // Chama o serviço para obter os dados
        setMemory(response); // Atualiza o estado com os dados recebidos
    }

    // Função assíncrona para excluir uma memória
    const onDeleteMemory = async () => {
        let confirm = window.confirm("Deseja realmente deletar esta memória?"); // Pede confirmação ao usuário

        if (!confirm) return; // Se o usuário cancelar, interrompe a função

        let response = await memoryService.deleteMemory(memory.id); // Chama o serviço para deletar a memória

        if (response) { // Se a exclusão for bem-sucedida
            alert("Memory deleted successfully."); // Exibe um alerta
            window.location.href = "/home"; // Redireciona para a página inicial
        }
    }

    return (
        <>
            <Header /> {/* Renderiza o cabeçalho da aplicação */}

            <main className="app-main"> {/* Área principal da página */}
                {memory && ( /* Renderiza os dados da memória apenas se estiverem disponíveis */
                    <>
                        <h1>{memory.title}</h1> {/* Exibe o título da memória */}

                        <div className="buttons-container"> {/* Contêiner para os botões */}
                            <button onClick={() => onDeleteMemory()}> {/* Botão para excluir a memória */}
                                <img src={trash} alt="Delete memory." /> {/* Ícone de lixeira */}
                            </button>
                        </div>

                        <div className="memory-item"> {/* Contêiner da memória */}
                            <div className="images-container"> {/* Contêiner para exibir imagens */}
                                {memory.images.map((image, index) => (
                                    <img key={index} src={image} alt="Image." />
                                ))}
                            </div>

                            <p>{memory.description}</p> {/* Exibe a descrição da memória */}
                        </div>
                    </>
                )}
            </main>

            <footer className="app-footer"> {/* Rodapé da aplicação */}
                <p>Mnemosyne - Ariel Paixão dos Santos</p> {/* Texto do rodapé */}
            </footer>
        </>
    );
}

export default Memory; // Exporta o componente para ser utilizado em outras partes do aplicativo
