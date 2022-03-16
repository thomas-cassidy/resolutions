import React from 'react'
import { View, Text, Image, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

const LOGO_SIZE = width / 1.8

const Logo = () => {
    return (
        <Image
            source={require('../assets/resolutionslogo.png')}
            style={{ width: LOGO_SIZE, height: LOGO_SIZE, margin: 20 }}
        />
    )
}

export default Logo
