// Components/Favorites.js

import React from 'react'
import { Animated, StyleSheet, View } from 'react-native'

class Tes extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            leftValue: new Animated.Value(0),
            goal: 0
        }
        this.leftValue =  new Animated.Value(0)

    }

    componentDidMount() {
        Animated.timing(
            this.leftValue,
            {
                toValue: 100,
                duration: 2500,
            }
        ).start()
    }

    componentDidUpdate() {
        Animated.timing(
            this.leftValue,
            {
                toValue: 100,
                duration: 2000,
            }
        ).start()
    }

    render() {
        return (
            <Animated.View style={[{left: this.leftValue},styles.main_container]}>
                <View style={styles.carre}>
                </View>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({

    main_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    carre: {
        backgroundColor: 'red',
        width: 100,
        height: 100
    }

})

export default Tes