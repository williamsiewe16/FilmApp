import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Favorites from "../Components/Favorites";
import { StyleSheet, Image } from 'react-native'
import React from 'react'
import Tes from "../Components/Tes";
import Avatar from "../Components/Avatar";
import News from "../Components/News";


const SearchStackNavigator = createStackNavigator({
    Search: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
        screen: Search,
        navigationOptions: {
            title: 'Rechercher'
        }
    },
    FilmDetail: {
        screen: FilmDetail,
        navigationOptions:{
            title: 'Informations'
        }
    }
})

const FavoriteStackNavigator = createStackNavigator({
    Search: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
        screen: Favorites,
        navigationOptions: {
            title: 'Favoris'
        }
    },
    FilmDetail: {
        screen: FilmDetail,
        navigationOptions:{
            title: 'Informations'
        }
    }
})

const  NewStackNavigator = createStackNavigator({
    Search: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
        screen: News,
        navigationOptions: {
            title: 'News'
        }
    },
    FilmDetail: {
        screen: FilmDetail,
        navigationOptions:{
            title: 'Informations'
        }
    }
})

const MoviesTabNavigator = createBottomTabNavigator(
    {
    Search: {
        screen: SearchStackNavigator,
        navigationOptions: {
            tabBarIcon: () => <Image source={require('../assets/ic_search.png')} style={styles.icon}/>
        }
    },
    Favorites: {
        screen: FavoriteStackNavigator,
        navigationOptions: {
            tabBarIcon: () => <Image source={require('../assets/ic_favorite.png')} style={styles.icon}/>
        }
    },
        News: {
        screen: NewStackNavigator,
            navigationOptions: {
                tabBarIcon: () => <Image source={require('../assets/ic_fiber_new.png')} style={styles.icon}/>
            }
        },
        /*Tes: {
        screen: Avatar
        },*/

},
    {
     tabBarOptions: {
         activeBackgroundColor: '#DDDDDD',
         inactiveBackgroundColor: '#FFFFFF',
         showLabel: false,
         showIcon: true
     }
    }
)



const styles = StyleSheet.create({
    icon: {
       width: 30,
        height: 30
    }
})




export default createAppContainer(MoviesTabNavigator)