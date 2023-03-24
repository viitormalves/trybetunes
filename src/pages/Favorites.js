import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
// import Loading from './Loading';
import './Favorite.css';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoritesMusics: [],
      // isLoading: false,
      favorite: true,
    };
  }

  componentDidMount() {
    this.getFavMusics();
  }

  onChangeFavoriteMusic = async (music) => {
    await removeSong(music);
    const favoritesMusics = await getFavoriteSongs();
    this.setState({
      favoritesMusics,
    });
  };

  getFavMusics = async () => {
    // this.setState({ isLoading: true });
    const data = await getFavoriteSongs();
    this.setState({
      favoritesMusics: data,
    });
  };

  render() {
    const { favoritesMusics, favorite } = this.state;
    return (
      <div>
        <Header />
        <h3 data-testid="page-favorites" className="h3-profile">Músicas favoritas</h3>
        {
          favoritesMusics.map((music) => (
            <div key={ music.trackId } className="div-favorite">
              <img
                src={ music.artworkUrl100 }
                alt={ music.collectionCensoredName }
                className="img-favorite"
              />
              <div className="pp">
                <p className="p-album3">{music.trackName}</p>
                <p className="p-artist2">{music.artistName}</p>
              </div>
              <audio
                data-testid="audio-component"
                src={ music.previewUrl }
                className="audio"
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
              <label htmlFor={ music.trackId } className="label-music">
                <input
                  id={ music }
                  name="favorite"
                  type="checkbox"
                  data-testid={ `checkbox-music-${music.trackId}` }
                  checked={ favorite }
                  onChange={ () => this.onChangeFavoriteMusic(music) }
                />
              </label>
            </div>
          ))
        }
        {
          favoritesMusics.length === 0
        && <p className="p-found">Você não possui nenhuma música favoritada</p>
        }
      </div>
    );
  }
}

export default Favorites;
