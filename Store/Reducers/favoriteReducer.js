
const initialState = {favoriteFilms : []}

 function toggleFavorite(state=initialState, action){
    let nexState
    switch (action.type){
        case 'TOGGLE_FAVORITE':
            const searchedId = state.favoriteFilms.findIndex(item => item.id === action.value.id)
            if(searchedId == -1){
                nexState = {
                    ...state,
                    favoriteFilms: [...state.favoriteFilms,action.value]
                }
            }else{
                nexState = {
                    ...state,
                    favoriteFilms: state.favoriteFilms.filter((film) => film.id != action.value.id)
                }
            }
            return nexState || state
        default:
            return state
    }
}

export default toggleFavorite