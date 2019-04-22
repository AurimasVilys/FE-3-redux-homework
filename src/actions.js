// actions
export const setMovieList = (list) => ({
    type: 'SET_MOVIE_LIST',
    list,
});

export const setGenreMovieList = (list) => ({
    type: 'SET_GENRE_MOVIE_LIST',
    list,
});

export const setGenreList = (list) => ({
    type: 'SET_GENRE_LIST',
    list,
});

export const likeMovie = (movieID) => ({
    type: 'SET_MOVIE_LIKED',
    movieID,
});