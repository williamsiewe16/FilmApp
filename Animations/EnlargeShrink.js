// Components/Favorites.js

import React from 'react'
import { Animated, Dimensions } from 'react-native'

class EnlargeShrink extends React.Component {

    constructor(props){
        super(props)
        this.state= {
            widthValue: new Animated.Value(40)
        }
    }

    componentDidUpdate() {
       let increase = Animated.spring(this.state.widthValue, {toValue: 80})
       let decrease = Animated.spring(this.state.widthValue, {toValue: 40})

        if(this.props.shouldEnlarge){
            increase.start()
        }else{
            decrease.start()
        }

    }

    render() {
        return (
            <Animated.View style={{width: this.state.widthValue, height: this.state.widthValue}}>
                {this.props.children}
            </Animated.View>
        )
    }
}


export default EnlargeShrink