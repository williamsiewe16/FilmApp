// Components/Favorites.js

import React from 'react'
import {Button, FlatList, StyleSheet, Text, TextInput, View} from 'react-native'
import { connect } from 'react-redux'
import FilmItem from "./FilmItem";
import Avatar from "./Avatar";

class Favorites extends React.Component {

    constructor(props){
        super(props)
    }

    _displayDetailForFilm = idFilm => this.props.navigation.navigate("FilmDetail",{idFilm : idFilm})



    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.avatar}>
                  <Avatar/>
                </View>
                <View style={styles.liste}>
                    <FlatList
                        data = {this.props.favoriteFilms}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm} that={this} isFavorite={true} />}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    loading_container : {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    liste: {
        marginTop: 5,
        marginRight: 5,
        marginLeft: 5
    },

    main_container: {
        flex: 1,
        backgroundColor: "#DDDDDD"
    },
    avatar: {
        alignItems: 'center'
    }
})

const mapStateToProps = state => {
   return {
       favoriteFilms: state.toggleFavorite.favoriteFilms
   }
}

export default connect(mapStateToProps)(Favorites)