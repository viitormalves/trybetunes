import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      favorite: null,
    };
  }

  // componentDidMount() {
  //   const { favorite } = this.state;
  //   if (favorite) return this.handleAddSong();
  // }

  handleAddSong = async () => {
    this.setState({ isLoading: true });
    const { trackId } = this.props;
    await addSong(trackId);
    this.setState({
      isLoading: false,
      favorite: true,
    });
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
              <div>
                <p>{trackName}</p>
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  {' '}
                  <code>audio</code>
                  .
                </audio>
                <label htmlFor={ trackId }>
                  Favorita
                  <input
                    id={ trackId }
                    name="favorite"
                    type="checkbox"
                    data-testid={ `checkbox-music-${trackId}` }
                    checked={ favorite }
                    onChange={ this.handleAddSong }
                  />
                </label>
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
};

export default MusicCard;
