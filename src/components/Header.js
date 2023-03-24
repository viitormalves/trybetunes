import React from 'react';
import { NavLink } from 'react-router-dom';
// import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import './Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
    };
  }

  componentDidMount() {
    this.handlegetUser(); // função async para fazer a requisição do nome de usuário na API
  }

  handlegetUser = async () => {
    const user = await getUser();
    this.setState({ user });
  };

  render() {
    const { user } = this.state;

    return ( // condicional para avisar o "Carregando..." enquanto é feito a requisição do nome de usuário.
      <header data-testid="header-component">
        <header className="header-container">
          <p
            data-testid="header-user-name"
            className="user-container"
          >
            { `${user.name}` }
          </p>
          <nav className="nav-container">
            <NavLink
              to="/search"
              data-testid="link-to-search"
              activeClassName="active"
              className="links"
            >
              Pesquisar
            </NavLink>
            <NavLink
              to="/favorites"
              data-testid="link-to-favorites"
              activeClassName="active"
              className="links"
            >
              Favoritos
            </NavLink>
            <NavLink
              to="/profile"
              data-testid="link-to-profile"
              activeClassName="active"
              className="links"
            >
              Perfil
            </NavLink>
          </nav>
        </header>
      </header>
    );
  }
}

export default Header;
