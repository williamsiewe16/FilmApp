
const initialState = {avatar : require('../../assets/ic_tag_faces.png')}

function setAvatar(state=initialState, action){
    let nexState
    switch (action.type){
        case 'SET_AVATAR':
            nexState = {
                avatar: action.value
            }
            return nexState || state
        default:
            return state
    }
}

export default setAvatar