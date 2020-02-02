import React from 'react'
import { FlatList, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import  {getImageFromApi} from '../API/TMDBApi'
import FadeIn from '../Animations/FadeIn'

class FilmItem extends React.Component {

    constructor(props){
    super(props)
        this.isFavorite = false
    }


    _displayFavoriteImage(){
        this.isFavorite = this.props.isFavorite
        const image = require('../assets/ic_favorite.png')
        if(this.isFavorite){
           return(
               <View style={styles.ligne13}>
               <Image source={image} style={styles.ligne131}/>
               </View>
           )
        }
        return(null)
    }

    render() {
        const {film,displayDetailForFilm} = this.props
        return (
            <FadeIn>
            <TouchableOpacity style={styles.main_container} onPress={() => displayDetailForFilm(film.id)}>
                <Image source={{uri: getImageFromApi(film.poster_path)}} style={styles.image}/>
                <View style={styles.secondzone}>
                    <View style={styles.ligne1}>
                        {this._displayFavoriteImage()}
                        <Text style={styles.ligne11}>{film.title}</Text>
                        <Text style={styles.ligne12}>{film.vote_average}</Text>
                    </View>
                    <Text style={styles.ligne01} numberOfLines={6}>{film.overview}</Text>
                    <Text style={styles.ligne02}>Sorti le {film.release_date}</Text>
                </View>
            </TouchableOpacity>
            </FadeIn>
        )
    }
}


const styles = StyleSheet.create({
 main_container : {
     flex:1,
     flexDirection: 'row',
     height: 190,
     marginBottom: 10,
 },
    image: {
      flex: 1,
        height: 190,
        marginRight: 10
    },
    secondzone: {
        flex: 2,
    },


    ligne1: {
      flexDirection: 'row',
    },
    ligne13: {
     flex:1.5,
    },
    ligne131: {
        width:35,
        height:35
    },
    ligne11: {
        fontWeight: 'bold',
        fontSize: 18,
        flex:4,
    },
    ligne12: {
        fontSize: 20,
        flex:1,
        textAlign: 'right'
    },


    ligne01: {
        fontStyle: 'italic',
        color: 'grey',
    },
    ligne02: {
        textAlign: 'right',
        marginTop: 10
    },

    title_text: {

    }
})

export default FilmItem