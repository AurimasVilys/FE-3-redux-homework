// thunks
import axios from "axios";
import {endpoints} from "../config";
import {setMovieList, setGenreList, setGenreMovieList} from './actions'

export const getMovieList = () => (dispatch) => {

    dispatch({type: 'GET_MOVIE_LIST'});

    axios
        .get(endpoints.mostPopularMovies())
        .then((res) => dispatch(setMovieList(res.data.results)))
        .catch((error) => console.log(error));
}

export const getGenreList = () => (dispatch) => {

    dispatch({type: 'GET_GENRE_LIST'});

    axios
        .get(endpoints.genres())
        .then((res) => dispatch(setGenreList(res.data.genres)))
        .catch((error) => console.log(error));
}

export const getGenreMovieList = (genreID) => (dispatch) => {
    dispatch({type: 'GET_GENRE_MOVIE_LIST'});
    axios
        .get(endpoints.genreMovies(genreID))
        .then((res) => dispatch(setGenreMovieList(res.data.results)))
        .catch((error) => console.log(error));
}

export const setMovieLiked = (movieID) => (dispatch) => {
    dispatch({
        type: 'SET_MOVIE_LIKED',
        movieID,
    });
}