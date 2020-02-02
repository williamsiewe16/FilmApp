import React from 'react'
import FilmItem from './FilmItem';
import { getFilmsWithSearchedText, getNewFilms } from '../API/TMDBApi'
import { FlatList,StyleSheet, View, TextInput, ActivityIndicator } from 'react-native'


class News extends React.Component {

    constructor(props){
        super(props);
        this.page = 0
        this.total_pages = 0
        this.state = {
            films : [],
            isLoading : true,
        }

        //   this._displayDetailForFilm = this._displayDetailForFilm.bind(this)

    }

    _displayDetailForFilm = idFilm => this.props.navigation.navigate("FilmDetail",{idFilm : idFilm})

    _searchFilms(){
            this.page = 0
            this.total_pages = 0
            this.setState({
                films : [],
                isLoading: true
            },() => this._loadFilms())
    }

    _loadFilms(){
        getNewFilms(this.page+1).then(data => {
            this.page = data.page
            this.total_pages = data.total_pages
            this.setState({
                films: [...this.state.films, ...data.results],
                isLoading : false
            })
            console.log(data.results.map(film => film.release_date.split('-')[0]))
        })
    }

    componentDidMount() {
        this._loadFilms()
    }

    render() {
        if(this.state.isLoading){
            return (
                <View style={styles.main_container}>
                    <ActivityIndicator size='large' color={'blue'} style={styles.loading_container}/>
                </View>
            )
        }else{
            return(
                <View style={styles.main_container}>
                         <View style={styles.liste}>
                        <FlatList
                            data = {this.state.films}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm} isFavorite={false}/>}
                            onEndReachedThreshold={0.1}
                            onEndReached={() => {
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


export default News