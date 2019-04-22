import React from 'react';
import Card from './Card';
import Filter from './Filter';
import { connect } from 'react-redux';
import { getImageUrl } from '../../config';
import {getMovieList, getGenreList, getGenreMovieList, setMovieLiked} from "../thunks";

class App extends React.Component {
  constructor(props) {
    super(props);

    props.onGetMovieList();
    props.onGetGenreList();

  }
  checkIfMovieLiked = (movieID) => {
        return this.props.hearted.some(item => movieID === item);
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
                      click = { this.props.onGetGenreMovieList.bind(this, filter.id)  }
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
            likeMovie = {this.props.onSetMovieLike.bind(this, listItem.id)}
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
        onSetMovieLike: (movieID) => dispatch(setMovieLiked(movieID))
      };
    }
)(App);
