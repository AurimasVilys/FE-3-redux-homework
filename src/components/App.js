import React from 'react';
import Card from './Card';
import Filter from './Filter';
import { connect } from 'react-redux';
import { getImageUrl } from '../../config';
import {getMovieList, getGenreList, getGenreMovieList, setMovieLiked, AddLog} from "../thunks";

class App extends React.Component {
  constructor(props) {
    super(props);

    props.onGetMovieList();
    props.onGetGenreList();
  }

  componentDidMount() {
    this.props.onAddLog('Aplikacija užsikrovė')
  }

  checkIfMovieLiked = (movieID) => {
    return this.props.hearted.some(item => movieID === item);
  }

  changeGenre = (genreID, genreName) => {
    this.props.onAddLog('Pakeistas žanras į ' + genreName);
    this.props.onGetGenreMovieList(genreID);
  }

  likeMovie = (movieID, movieName) => {
      if(!this.checkIfMovieLiked(movieID)) {
          this.props.onAddLog('Uždėta širdelė filmui ' + movieName);
      }
      else {
          this.props.onAddLog('Nuimta širdelė filmui ' + movieName);
      }
      this.props.onSetMovieLike(movieID);
  }

  
  render() {
    const { movieList, genreList } = this.props;

    return (
      <div>
          <div className="genres">
              {genreList.map((filter) => (
                  <Filter
                      key = {filter.id}
                      id = {filter.id}
                      name = {filter.name}
                      click = { this.changeGenre.bind(this, filter.id, filter.name)  }
                  />
              ))}
          </div>
          <div>
        {movieList.map((listItem) => (
          <Card
            key = {listItem.id}
            backgroundImage={getImageUrl(listItem.backdrop_path)}
            title={listItem.original_title}
            releaseDate={listItem.release_date}
            score={listItem.vote_average}
            votes={listItem.vote_count}
            description={listItem.overview}
            likeMovie = {this.likeMovie.bind(this, listItem.id, listItem.original_title)}
            like = { this.checkIfMovieLiked(listItem.id) }
          />
        ))}
          </div>
      </div>
    );
  }
}

export default connect(
    (state) => { //(state, props)
      return {
        movieList: state.movies.movieList,
        genreList: state.movies.genreList,
        hearted: state.movies.hearted
      };
    },
    (dispatch) => {

      return {
        onGetMovieList: () => dispatch(getMovieList()),
        onGetGenreList: () => dispatch(getGenreList()),
        onGetGenreMovieList: (genreID) => dispatch(getGenreMovieList(genreID)),
        onSetMovieLike: (movieID) => dispatch(setMovieLiked(movieID)),
        onAddLog: (object) => {
            const date = new Date();
            const dateTime = date.getFullYear() + '-' +date.getMonth() + '-' + date.getDate() +
                ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            dispatch(AddLog(dateTime,object))
        }
      };
    }
)(App);
