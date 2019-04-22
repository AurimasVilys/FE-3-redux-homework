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
    type: 'LIKE_MOVIE',
    movieID,
});

export const insertLog = (key, object) => ({
    type: 'INSERT_LOG',
    key,
    object
});