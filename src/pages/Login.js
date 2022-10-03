import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

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

  handleSaveName = async () => {
    this.setState({ isLoading: true });
    const { name } = this.state;
    await createUser({ name });
    this.setState({ isLoading: false });
    const { history } = this.props;
    console.log(history);
    history.push('/search');
  };

  render() {
    const { name, isLoading } = this.state;
    if (isLoading) return <span>Carregando...</span>;

    return (
      <div data-testid="page-login">
        page-login
        <form>
          <label htmlFor="name">
            Login:
            <input
              id="name"
              type="text"
              data-testid="login-name-input"
              name="name"
              value={ name }
              onChange={ this.handleOnInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ !this.handleValidateLogin() }
            onClick={ this.handleSaveName }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default Login;
