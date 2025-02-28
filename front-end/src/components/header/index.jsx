import logo from "../../assets/icons/mnemosyne-logo.svg";

const Header = () => {

    return (

        <header className="app-header">

            <a href="/home">
                <img src={logo} alt="Mnemosyne Logo"></img>
            </a>

            <div className="links">
                <a href="/home">HOME</a>
                <a href="/new-memory">ADICIONAR MEMÓRIA</a>
            </div>

        </header>

    );

}

export default Header;