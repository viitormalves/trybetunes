import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumData: [],
      songs: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.hangleGetMusics();
  }

  hangleGetMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    const songsFilter = data.filter((el, i) => i === 0);
    this.setState({
      albumData: data,
      songs: songsFilter,
      isLoading: false,
    });
  };

  render() {
    // console.log(typeof this.props.match.params.id);
    const { albumData, songs, isLoading } = this.state;
    console.log(albumData);
    return (
      <>
        <Header />
        <div data-testid="page-album">
          {
            isLoading
              ? <Loading />
              : (
                songs.map((data) => (
                  <div key={ data.collectionId }>
                    <img src={ data.artworkUrl100 } alt={ data.collectionName } />
                    <h3 data-testid="album-name">{ data.collectionName }</h3>
                    <p data-testid="artist-name">{ data.artistName }</p>
                  </div>
                ))
              )
          }
          {
            albumData.filter((obj) => obj.kind === 'song').map((song) => (
              <MusicCard
                key={ song.trackId }
                trackName={ song.trackName }
                previewUrl={ song.previewUrl }
                trackId={ song.trackId }
              />
            ))
          }
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
