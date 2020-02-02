import { combineReducers, createStore} from 'redux'
import toggleFavorite from './Reducers/favoriteReducer'
import setAvatar from "./Reducers/avatarReducer"

//les modules pour persister les Reducers
import { persistCombineReducers } from 'redux-persist'
import { AsyncStorage } from 'react-native'

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage
}

export default createStore(
    persistCombineReducers(
        rootPersistConfig,{toggleFavorite,setAvatar}
    )
)
