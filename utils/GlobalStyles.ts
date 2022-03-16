import { Dimensions, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('window')

export const gColors = {
    primary: '#080042',
    secondary: '#fff',
    btnColors: ['#DE16AF', '#667A00', '#7A065F', '#2914C7',]
}

export const gSizes = {
    s: 5,
    m: 10,
    l: 20,
    xl: 26
}

export const gStyles = StyleSheet.create({
    container: {
        height,
        width,
        backgroundColor: gColors.primary,
    }
})
