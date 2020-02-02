// Components/Favorites.js

import React from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker'

class Avatar extends React.Component {

    constructor(props){
        super(props)
    }

    _avatarClicked = () => {
        ImagePicker.showImagePicker({}, (response) => {
            if(response.didCancel){
                console.log('action  annulée')
            }
            else if(response.error){
                console.log('Erreur: ', response.error)
            }
            else{
                console.log(response.uri)
                let image_uri = {uri : response.uri}
                this.props.dispatch({type: 'SET_AVATAR', value: image_uri})
            }
        })
    }



    render() {
        return (
            <TouchableOpacity style={styles.main_container} onPress={() => this._avatarClicked()}>
                <Image style={styles.avatar} source={this.props.avatar}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({

    main_container: {
        width: 100,
        height:100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius:100,
        borderColor: '#9B9B9B'
    }

})

const mapStateToProps = (state) => {
    return {
        avatar: state.setAvatar.avatar
    }
}

export default connect(mapStateToProps)(Avatar)