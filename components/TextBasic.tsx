import React, { ReactNode } from 'react'
import { View, Text, StyleSheet, TextProps } from 'react-native'
import { gColors, gSizes } from '../utils/GlobalStyles'

interface Props extends TextProps {
    children?: ReactNode
}

const TextBasic = ({ children, style }: Props) => {
    return (
        <Text
            style={[{
                color: gColors.secondary,
                fontSize: gSizes.l,
            }, style]}
        >{children}</Text>
    )
}


export default TextBasic
