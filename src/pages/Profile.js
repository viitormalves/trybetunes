import React from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import ProfileEdit from './ProfileEdit';
import './Profile.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
      edit: false,
    };
  }

  async componentDidMount() {
    const data = await getUser();
    this.setState({ data });
  }

  onClickEdit = () => {
    this.setState({ edit: true });
  };

  onClickSaveEdit = () => {
    this.setState({ edit: false });
  };

  render() {
    const { data, edit } = this.state;
    return (
      <>
        <Header />
        <h3 data-testid="page-profile" className="h3-profile">
          Seu perfil
        </h3>
        {
          !edit && (
            <div className="div-profile">
              <img className="img-profile" src={ data.image } alt="Sua Foto" />
              <div className="d-profile">
                <p className="p-profile">Nome</p>
                <p className="p-profile2">{ data.name }</p>
              </div>
              <div className="d-profile">
                <p className="p-profile">E-mail</p>
                <p className="p-profile2">{ data.email }</p>
              </div>
              <div className="d-profile">
                <p className="p-profile">Descrição</p>
                <p className="p-profile2">{ data.description }</p>
              </div>
              <button
                onClick={ this.onClickEdit }
                type="button"
                className="b-profile"
              >
                Editar
              </button>
            </div>
          )
        }
        {
          edit && <ProfileEdit onClickSaveEdit={ this.onClickSaveEdit } user={ data } />
        }
      </>
    );
  }
}

export default Profile;
