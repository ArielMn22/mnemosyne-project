import "./new-memory.css"; // Importa o arquivo de estilos específico para esta página
import Header from "../../components/header"; // Importa o componente de cabeçalho da aplicação
import { useEffect, useState } from "react"; // Importa funções do React para gerenciar estado e efeitos colaterais
import memoryService from "../../services/memory"; // Importa o serviço responsável por gerenciar as memórias

const NewMemory = () => {

    // Define estados para armazenar o título e a descrição da nova memória
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // Estado para armazenar o feedback do usuário ao criar uma memória
    const [userFeedBack, setUserFeedBack] = useState("");

    // Estados para armazenar imagens e URLs das imagens
    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);

    useEffect(() => {
        // Nenhuma ação necessária ao montar o componente inicialmente
    }, []);

    // Função chamada quando o usuário adiciona imagens
    const onSetImage = (event) => {
        const files = event.target.files; // Obtém os arquivos selecionados
        setImages(files); // Armazena os arquivos no estado

        let imageURLs = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            imageURLs.push(URL.createObjectURL(file)); // Gera uma URL temporária para visualização
        }

        setImageURLs(imageURLs); // Atualiza o estado com as URLs das imagens
    }

    // Função assíncrona para criar uma nova memória
    const onCreateMemory = async () => {
        let payload = {
            title: title, // Título da memória
            description: description, // Descrição da memória
            images: images, // Lista de imagens
            date: new Date().toISOString() // Data da criação no formato ISO
        };

        let response = await memoryService.createMemory(payload); // Envia os dados para o serviço

        if (response) { // Se a resposta for bem-sucedida
            setUserFeedBack("Memória criada com sucesso!"); // Exibe um feedback positivo

            setTimeout(() => {
                setUserFeedBack(""); // Limpa o feedback após 5 segundos
            }, 5000);

            // Reseta os campos do formulário
            setTitle("");
            setDescription("");
            setImages([]);
            setImageURLs([]);
        }
    }

    return (
        <>
            <Header /> {/* Renderiza o cabeçalho da aplicação */}

            <main className="app-main"> {/* Área principal da página */}
                <h1>Criar memória</h1> {/* Título da página */}

                <p className="feedback">{userFeedBack}</p> {/* Exibe o feedback do usuário */}

                <div className="form-container"> {/* Contêiner do formulário */}
                    <label>
                        <span>Título</span> {/* Rótulo do campo título */}
                        <input onChange={event => setTitle(event.target.value)} value={title} type="text" placeholder="Insira o título aqui."/> {/* Campo de entrada do título */}
                    </label>

                    <label>
                        <span>Descrição</span> {/* Rótulo do campo descrição */}
                        <textarea onChange={event => setDescription(event.target.value)} value={description} placeholder="Insira a descrição aqui."/> {/* Campo de entrada da descrição */}
                    </label>

                    <label htmlFor="file-input" className="file"> {/* Rótulo para seleção de arquivos */}
                        <span>Imagens</span>
                        <span className="input-file-button">Adicionar imagem</span> {/* Botão para adicionar imagens */}
                        <input multiple onChange={event => onSetImage(event)} id="file-input" type="file" /> {/* Campo de entrada de arquivos */}

                        {images.length == 0 && (
                            <span className="no-images">Nenhuma imagem no momento.</span>   
                        )}

                        {images.length > 0 && (
                            <div className="images-container"> {/* Contêiner para exibir imagens selecionadas */}
                                {imageURLs.map((imageURL, index) => (
                                    <div key={index} className="image" style={{ backgroundImage: `url(${imageURL})` }}></div>
                                ))}
                            </div>
                        )}
                    </label>
                </div>

                <button onClick={() => onCreateMemory()} className="create-memory-btn">Criar memória</button> {/* Botão para criar memória */}
            </main>

            <footer className="app-footer"> {/* Rodapé da aplicação */}
                <p>Mnemosyne - Ariel Paixão dos Santos</p> {/* Texto do rodapé */}
            </footer>
        </>
    );
}

export default NewMemory; // Exporta o componente para ser utilizado em outras partes do aplicativo
