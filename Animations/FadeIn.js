// Components/Favorites.js

import React from 'react'
import { Animated, Dimensions } from 'react-native'

class FadeIn extends React.Component {

    constructor(props){
        super(props)
        this.state= {
            leftValue: new Animated.Value(Dimensions.get('window').width)
        }
    }

    componentDidMount() {
        Animated.timing(
            this.state.leftValue,
            {
                toValue: 0,
                duration: 500,
            }
        ).start()
    }

    componentDidUpdate() {
        Animated.timing(
            this.state.leftValue,
            {
                toValue: 0,
                duration: 500,
            }
        ).start()
    }

    render() {
        return (
            <Animated.View style={{left: this.state.leftValue}}>
                {this.props.children}
            </Animated.View>
        )
    }
}


export default FadeIn