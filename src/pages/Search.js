import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
  }

  handleOnInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleValidationSearch = () => {
    const { search } = this.state;
    const searchSizeMin = 2;
    const searchSize = search.length >= searchSizeMin;
    return searchSize;
  };

  render() {
    const { search } = this.state;

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
              data-testid="search-artist-button"
            >
              Pesquisar
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Search;
