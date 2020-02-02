import React from 'react'
import {Platform, TouchableOpacity, Button, Image, StyleSheet, View, Text, ActivityIndicator, ScrollView, Share, Animated } from 'react-native'
import {getFilmDetailFromApi, getImageFromApi} from '../API/TMDBApi'
import { connect } from 'react-redux'
import numeral from 'numeral'
import moment from 'moment'

class FilmDetail extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            film: null,
            isLoading: true
        }
    }

    componentDidMount() {
        getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
            this.setState({
                 film: data,
                 isLoading: false
            })
        })
    }


    _toggleFavorite(){
        const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
        this.props.dispatch(action)
    }

    _displayFavoriteImage(film){

        let a = 40
        let image = require('../assets/ic_favorite.png')

        if(this.props.favoriteFilms.findIndex(item => item.id == film.id) == -1){
            image = require('../assets/ic_favorite_border.png')
        }

         return(
            <Image source={image} style={{width: 40, height: 40}}/>
        )
    }


    _displayFilm(){
        const film = this.state.film
      if(film != null){
          return(
              <ScrollView style={styles.scrollview_container}>
                  <Image style={styles.background_style} source={{uri: getImageFromApi(film.backdrop_path)}} />
                  <Text style={styles.title_style}>{film.title}</Text>
                    <TouchableOpacity style={styles.favoriteImage} onPress={() => this._toggleFavorite()}>
                        {this._displayFavoriteImage(film)}
                    </TouchableOpacity>
                  <Text style={styles.description_style}>{film.overview}</Text>

                  <View style={styles.infos_style}>
                      <Text>Sorti le {
                          moment(new Date(film.release_date)).format('DD/MM/YYYY')
                      }</Text>
                      <Text>Note: {film.vote_average}/10</Text>
                      <Text>Nombre de votes: {film.vote_count}</Text>
                      <Text>Budget: {
                          numeral(film.budget).format('0,0[.]00 $')
                      }</Text>
                      <Text>Genre(s): {
                          film.genres.map((genre) => genre.name).join('/')
                      }</Text>
                      <Text>Compagnie(s): {
                          film.production_companies.map((company) => company.name).join('/')
                      }</Text>
                  </View>

              </ScrollView>
          )
      }
    }

    _shareFilm(){
    const film = this.state.film
    Share.share({title: film.title, message: film.overview}).then({

    })
    }

    _displayFloatingButton(){
        const film = this.state.film
        if(film != undefined && Platform.OS === 'android'){
            return(
                <TouchableOpacity style={styles.share_button} onPress={() => this._shareFilm()}>
                    <Image style={styles.share_image} source={require('../assets/ic_share.png')}/>
                </TouchableOpacity>
            )
        }
    }

    render() {
        if(this.state.isLoading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator size='large' color={'green'} style={styles.loading_container}></ActivityIndicator>
                </View>
            )
        }else{
            return(
                <View style={styles.container}>
                    {this._displayFilm()}
                    {this._displayFloatingButton()}
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#DDDDDD"
    },
    loading_container : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    share_button: {
       position: 'absolute',
        right: 10,
        bottom: 10,
        backgroundColor: 'red',
        borderRadius:100,
        padding: 15
    },
    share_image: {
        width:30,
        height:30
    },
    scrollview_container: {
        flex: 1,
    },
    background_style : {
       height: 200,
        marginBottom: 10
    },
    title_style : {
      fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    description_style : {
        fontStyle: 'italic',
        color: 'grey',
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    infos_style : {
        paddingLeft: 10,
        fontWeight: 'bold',
    },
    favoriteImage: {
       alignItems: 'center',
    }
})

const mapStateToProps = (state) => {
    return {
        favoriteFilms: state.toggleFavorite.favoriteFilms
    }
}

//export default FilmDetail
export default connect(mapStateToProps)(FilmDetail)