import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
    };
  }

  async componentDidMount() { // função async para fazer a requisição do nome de usuário na API
    const user = await getUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return ( // condicional para avisar o "Carregando..." enquanto é feito a requisição do nome de usuário.
      <header data-testid="header-component">
        { user ? (
          <>
            <p data-testid="header-user-name">{ user.name }</p>
            <nav>
              <Link to="/search">Pesquisar</Link>
              <Link to="/album/:id">Album</Link>
              <Link to="/favorites">Favoritos</Link>
              <Link to="/profile/</nav>">Perfil</Link>
              <Link to="/profile/edit">Editar Perfil</Link>
            </nav>
          </>
        ) : <Loading />}
      </header>
    );
  }
}

export default Header;
