import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './Search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      isLoading: false,
      albums: [],
      lastsearch: '',
      empySearch: false,
    };
  }

  handleOnInputChange = ({ target }) => { // Salva o valor digitado no estado. Input dinâmico;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleValidationSearch = () => { // Validação de caracteres ao digitar no input. No mínimo 2;
    const { search } = this.state;
    const searchSizeMin = 2;
    const searchSize = search.length >= searchSizeMin;
    return searchSize;
  };

  handleSearch = async () => { // Faz a requisição async da API. Ativa e desativa o isLoading para o carregamento. Verifica se o conteúdo é vazio e salva pesquisa;
    this.setState({ isLoading: true, empySearch: false });
    const { search } = this.state;
    const data = await searchAlbumsAPI(search);
    if (data.length === 0) {
      this.setState({ empySearch: true, search: '', isLoading: false });
    }
    this.setState({ albums: data, lastsearch: search, isLoading: false });
    this.setState({ search: '' });
  };

  render() {
    const { search, isLoading, albums, lastsearch, empySearch } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <form className="form-container">
            <input
              type="text"
              placeholder="Nome do Artista"
              name="search"
              onChange={ this.handleOnInputChange }
              value={ search }
              data-testid="search-artist-input"
              className="input-search"
            />
            <button
              type="button"
              name="button-search"
              disabled={ !this.handleValidationSearch() }
              onClick={ this.handleSearch }
              data-testid="search-artist-button"
              className="button-search"
            >
              Pesquisar
            </button>
          </form>
          <div>
            { isLoading && <Loading /> }
            { empySearch && <p className="p-found">Nenhum álbum foi encontrado</p> }
            { albums.length > 0
            && (
              <p
                className="p-found"
              >
                {`Resultado de álbuns de: ${lastsearch}`}
              </p>
            )}
            <ul className="ul-album">
              {
                albums.map((album) => (
                  <div key={ album.collectionId } className="div-container">
                    <Link to={ `/album/${album.collectionId}` } className="link">
                      <img
                        src={ album.artworkUrl100 }
                        alt={ album.collectionName }
                        data-testid={ `link-to-album-${album.collectionId}` }
                        className="img-album"
                      />
                      <div className="div-album">
                        <p className="p-album">{ album.collectionName }</p>
                        <p className="p-artist">{ album.artistName }</p>
                      </div>
                    </Link>
                  </div>
                ))
              }
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default Search;
