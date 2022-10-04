import React from 'react';
import { NavLink } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import './Header.css';

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
              <NavLink
                to="/search"
                data-testid="link-to-search"
                activeClassName="active"
              >
                Pesquisar
              </NavLink>
              <NavLink
                to="/favorites"
                data-testid="link-to-favorites"
                activeClassName="active"
              >
                Favoritos
              </NavLink>
              <NavLink
                to="/profile"
                data-testid="link-to-profile"
                activeClassName="active"
              >
                Perfil
              </NavLink>
            </nav>
          </>
        ) : <Loading />}
      </header>
    );
  }
}

export default Header;
