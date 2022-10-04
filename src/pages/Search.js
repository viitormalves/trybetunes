import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

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
    this.setState({ isLoading: true });
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
          <form>
            <input
              type="text"
              placeholder="Nome do Artista ou da Banda"
              name="search"
              onChange={ this.handleOnInputChange }
              value={ search }
              data-testid="search-artist-input"
            />
            <button
              type="button"
              name="button-search"
              disabled={ !this.handleValidationSearch() }
              onClick={ this.handleSearch }
              data-testid="search-artist-button"
            >
              Pesquisar
            </button>
          </form>
          <div>
            { isLoading && <Loading /> }
            { empySearch && <p>Nenhum álbum foi encontrado</p> }
            { albums.length > 0 && <p>{`Resultado de álbuns de: ${lastsearch}`}</p> }
            <ul>
              {
                albums.map((album) => (
                  <li key={ album.collectionId }>
                    <Link to={ `/album/${album.collectionId}` }>
                      <img
                        src={ album.artworkUrl100 }
                        alt={ album.collectionName }
                        data-testid={ `link-to-album-${album.collectionId}` }
                      />
                      <p>{ album.collectionName }</p>
                      <p>{ album.artistName }</p>
                    </Link>
                  </li>
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
