import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TouchableOpacityProps } from 'react-native'
import { gColors, gSizes } from '../utils/GlobalStyles'

interface Props extends TouchableOpacityProps {
    label: string,
}



const RoundButton = ({ label, style, onPress }: Props) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: gColors.btnColors[3],
            marginHorizontal: gSizes.l,
            marginVertical: gSizes.m,
            padding: gSizes.m,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: gSizes.xl
        },
        text: {
            color: gColors.secondary,
            fontSize: gSizes.l
        }
    })

    return (
        <TouchableOpacity
            style={[styles.container, style]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
    )
}

export default RoundButton
