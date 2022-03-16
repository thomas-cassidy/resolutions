import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { gColors } from '../utils/GlobalStyles'
import { AppRoutes } from '../utils/Routes'

interface Props {
    bgColor?: number,
    label: string,
    navTo: keyof AppRoutes,
}

const NavButton = ({ bgColor = 0, label, navTo }: Props) => {
    const navigation: StackNavigationProp<AppRoutes, 'Home'> = useNavigation()
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: 60,
            backgroundColor: gColors.btnColors[bgColor],
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0.7,
        },
        label: {
            color: gColors.secondary,
            fontSize: 20,
            fontWeight: 'bold'
        }
    })

    return (
        <Pressable
            style={styles.container}
            onPress={() => navigation.navigate(navTo)}
        >
            <Text style={styles.label}>{label}</Text>
        </Pressable>
    )
}


export default NavButton
