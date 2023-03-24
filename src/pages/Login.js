import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import './Login.css';
import logo from '../imagens/logo.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isLoading: false,
    };
  }

  handleValidateLogin = () => {
    const { name } = this.state;
    const nameSizeMin = 3;
    const nameSize = name.length >= nameSizeMin;
    return (nameSize);
  };

  handleOnInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleCreateUser = async () => {
    this.setState({ isLoading: true });
    const { name } = this.state;
    await createUser({ name });
    this.setState({ isLoading: false });
    const { history } = this.props;
    history.push('/search');
  };

  render() {
    const { name, isLoading } = this.state;
    if (isLoading) return <Loading />;

    return (
      <div className="body">
        <div data-testid="page-login" className="longin-div">
          <img src={ logo } alt="logo-TrybeTunes" className="trybeTunes" />
          <form>
            <label htmlFor="name" className="login-label">
              Qual o seu nome?
              <input
                id="name"
                type="text"
                data-testid="login-name-input"
                name="name"
                value={ name }
                onChange={ this.handleOnInputChange }
                placeholder="  Insira seu nome"
                className="login-input"
              />
            </label>
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ !this.handleValidateLogin() }
              onClick={ this.handleCreateUser }
              className="login-button"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
