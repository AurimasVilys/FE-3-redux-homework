import { combineReducers } from 'redux';


const initialState = {
    movieList: [],
    genreList: [],
    hearted: [],
};

const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MOVIE_LIST':
        case 'SET_GENRE_MOVIE_LIST':
            return {
                ...state,
                movieList: action.list,
            };
        case 'SET_GENRE_LIST':
            return {
                ...state,
                genreList: action.list
            };
        case 'LIKE_MOVIE':
            if(state.hearted.some(item => action.movieID === item)) {
                const hearted_copy = [...state.hearted];
                const index = hearted_copy.indexOf(action.movieID);
                hearted_copy.splice(index, 1);
                return {
                    ...state,
                    hearted: hearted_copy
                }
            }
            else {
                return  {
                    ...state,
                    hearted: [...state.hearted, action.movieID]
                }
            }
        default:
            return state;
    }
}

const logReducer = (state = {}, action) => {
    switch (action.type) {
        case 'INSERT_LOG':
            return {
                ...state,
                [action.key]: action.object
            }
        default:
            return state;
    }
}


export default combineReducers({
    movies: moviesReducer,
    logs: logReducer
});
