import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import './Album.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumData: [],
      album: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.hangleGetMusics();
  }

  hangleGetMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    const AlbumFilter = data.filter((obj, i) => i === 0); // filtra o primeiro objeto, que contem as info do album.
    // const songsFilter = data.filter((obj, i) => i !== 0);
    this.setState({
      albumData: data,
      album: AlbumFilter,
      isLoading: false,
    });
  };

  render() {
    // console.log(typeof this.props.match.params.id);
    const { albumData, album, isLoading } = this.state;
    // console.log(songs);
    return (
      <>
        <Header />
        <div data-testid="page-album" className="page-album">
          {
            isLoading
              ? <Loading />
              : (
                album.map((data) => (
                  <div key={ data.collectionId } className="div-album3">
                    <img
                      src={ data.artworkUrl100 }
                      alt={ data.collectionName }
                      className="img-album2"
                    />
                    <h3
                      data-testid="album-name"
                      className="p-album2"
                    >
                      { data.collectionName }
                    </h3>
                    <p
                      data-testid="artist-name"
                      className="p-artist2"
                    >
                      { data.artistName }
                    </p>
                  </div>
                ))
              )
          }
          <div>
            {
              albumData.filter((obj) => obj.kind === 'song').map((song) => (
                <MusicCard
                  key={ song.trackId }
                  trackName={ song.trackName }
                  previewUrl={ song.previewUrl }
                  trackId={ song.trackId }
                  song={ song }
                />
              ))
            }
          </div>
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
