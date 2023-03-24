import React from 'react';
import PropTypes from 'prop-types';
import { getUser, createUser } from '../services/userAPI';
import './ProfileEdit.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      image: '',
      name: '',
      email: '',
      description: '',
    };
  }

  async componentDidMount() {
    const data = await getUser();
    console.log(data);
    this.setState({
      image: data.image,
      name: data.name,
      email: data.email,
      description: data.description,
    });
  }

  handleOnChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  saveProfile = async () => {
    const { image, name, email, description } = this.state;
    await createUser({ image, name, email, description });
    const data = await getUser();
    console.log(data);
    const { onClickSaveEdit } = this.props;
    onClickSaveEdit();
  };

  render() {
    const { image, name, email, description } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <form className="div-profile">
          <img src={ image } alt="Sua foto" className="img-profileEdit" />
          <label htmlFor="image" className="p-profileEdit">
            Foto
            <input
              onChange={ this.handleOnChange }
              name="image"
              id="image"
              type="text"
              value={ image }
              placeholder="Link da sua foto"
              className="input-profileEdit"
            />
          </label>
          <label htmlFor="name" className="p-profileEdit">
            Nome
            <input
              onChange={ this.handleOnChange }
              value={ name }
              name="name"
              id="name"
              type="text"
              className="input-profileEdit"
              placeholder="Seu nome"
            />
          </label>
          <label htmlFor="email" className="p-profileEdit">
            E-mail
            <input
              onChange={ this.handleOnChange }
              value={ email }
              name="email"
              id="email"
              type="text"
              className="input-profileEdit"
              placeholder="Seu e-mail"
            />
          </label>
          <label htmlFor="description" className="p-profileEdit">
            Descrição
            <input
              onChange={ this.handleOnChange }
              value={ description }
              name="description"
              id="description"
              type="text"
              className="input-profileEdit"
              placeholder="Sua descrição"
            />
          </label>
          <button
            onClick={ this.saveProfile }
            type="submit"
            className="b-profile"
          >
            Salvar
          </button>
        </form>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  onClickSaveEdit: PropTypes.func.isRequired,
};

export default ProfileEdit;
