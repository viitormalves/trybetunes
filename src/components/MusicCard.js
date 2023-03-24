import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';
import './MusicCard.css';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      favorite: false,
      favoriteMusics: [],
    };
  }

  componentDidMount() {
    this.handleGetFavoriteSongs();
  }

  handleCheckFavorites = () => {
    const { song } = this.props;
    const { favoriteMusics } = this.state;
    const favorites = favoriteMusics.some((music) => song.trackId === music.trackId);
    this.setState({ favorite: favorites });
  };

  handleGetFavoriteSongs = async () => {
    this.setState({ isLoading: true });
    const getFavorites = await getFavoriteSongs();
    this.setState({
      favoriteMusics: getFavorites,
    }, () => this.handleCheckFavorites());
    this.setState({ isLoading: false });
  };

  handleFavoriteClick = async ({ target }) => {
    // this.setState({ isLoading: true });
    const { checked } = target;
    const { song } = this.props;
    console.log(song);
    if (checked) {
      await addSong(song);
      this.setState({ favorite: checked });
    } else {
      await removeSong(song);
      this.setState({ favorite: checked });
    }
    // this.setState({ isLoading: false });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading, favorite } = this.state;
    return (
      <div>
        {
          isLoading
            ? <Loading />
            : (
              <div className="div-musics">
                <p className="name-music">{trackName}</p>
                <audio
                  className="audio"
                  data-testid="audio-component"
                  src={ previewUrl }
                  controls
                >
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  {' '}
                  <code>audio</code>
                  .
                </audio>
                <section className="checkbox-fav">
                  <input
                    id="favorite"
                    name="favorite"
                    type="checkbox"
                    data-testid={ `checkbox-music-${trackId}` }
                    checked={ favorite }
                    onChange={ this.handleFavoriteClick }
                  />
                  {/* <label htmlFor={ trackId } className="toggle" /> */}
                </section>
              </div>
            )
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  song: PropTypes.shape({
    artistId: PropTypes.number,
    artistName: PropTypes.string,
    artistViewUrl: PropTypes.string,
    artworkUrl30: PropTypes.string,
    artworkUrl60: PropTypes.string,
    artworkUrl100: PropTypes.string,
    collectionCensoredName: PropTypes.string,
    collectionExplicitness: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    collectionViewUrl: PropTypes.string,
    country: PropTypes.string,
    currency: PropTypes.string,
    kind: PropTypes.string,
    previewUrl: PropTypes.string,
    primaryGenreName: PropTypes.string,
    releaseDate: PropTypes.string,
    trackCensoredName: PropTypes.string,
    trackCount: PropTypes.number,
    trackExplicitness: PropTypes.string,
    trackId: PropTypes.number,
    trackName: PropTypes.string,
    trackNumber: PropTypes.number,
    trackViewUrl: PropTypes.string,
    wrapperType: PropTypes.string,
  }).isRequired,
};

export default MusicCard;
