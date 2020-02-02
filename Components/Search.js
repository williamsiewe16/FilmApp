import React from 'react'
import FilmItem from './FilmItem';
import {getFilmsWithSearchedText} from '../API/TMDBApi'
import { FlatList,StyleSheet, View, TextInput, Button, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'


class Search extends React.Component {

    constructor(props){
        super(props);
        this.searchedText = ""
        this.currentText = ""
        this.page = 0
        this.total_pages = 0
        this.state = {
            films : [],
            isLoading : false,
        }

     //   this._displayDetailForFilm = this._displayDetailForFilm.bind(this)

    }

    _displayDetailForFilm = idFilm => this.props.navigation.navigate("FilmDetail",{idFilm : idFilm})

    _searchFilms(){
        if(this.searchedText.length > 0) {
            this.currentText = this.searchedText
          this.page = 0
          this.total_pages = 0
            this.setState({
                films : [],
                isLoading: true
            },() => this._loadFilms())
        }
    }

    _loadFilms(){
     //   this.setState({isLoading: true})
        getFilmsWithSearchedText(this.currentText,this.page+1).then(data => {
            //console.log(data.results.length)
            this.page = data.page
            this.total_pages = data.total_pages
            this.setState({
                films: [...this.state.films, ...data.results],
                isLoading : false
            })
        })
    }

    render() {
        const favoriteFilms = this.props.favoriteFilms
        if(this.state.isLoading){
            return (
                <View style={styles.main_container}>
                    <ActivityIndicator size='large' color={'blue'} style={styles.loading_container}/>
                </View>
            )
        }else{
            return(
                <View style={styles.main_container}>
                   <TextInput style={styles.textinput}
                              placeholder='Titre du film'
                              onSubmitEditing={() => this._searchFilms()}
                              onChangeText={(text) => {this.searchedText = text}} />
                   <Button color={'green'} title='Rechercher' onPress={() => {this._searchFilms()}}/>
                   <View style={styles.liste}>
                       <FlatList
                          extraData={this.props.favoriteFilms}
                          data = {this.state.films}
                          keyExtractor={(item) => item.id.toString()}
                          renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm} isFavorite={(favoriteFilms.findIndex(film => film.id == item.id) != -1) ? true : false}/>}
                          onEndReachedThreshold={0.1}
                          onEndReached={() => {
                            //  console.log("reached")
                              if(this.page < this.total_pages){
                                  this._loadFilms()
                              }
                          }}
                       />
                   </View>
                </View>
            )
        }

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
        marginLeft: 5,
        backgroundColor: "#DDDDDD"
    },

    main_container: {
        flex: 1,
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    }
})

const mapStateToProps = (state) => {
    return {
        favoriteFilms: state.toggleFavorite.favoriteFilms
    }
}

export default connect(mapStateToProps)(Search)