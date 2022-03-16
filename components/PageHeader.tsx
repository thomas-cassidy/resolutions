import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import TextBasic from './TextBasic'
import { gColors, gSizes } from '../utils/GlobalStyles'

interface Props {
    title: string;
    back?: boolean;
}

const PageHeader = ({ title, back }: Props) => {
    const nav = useNavigation()
    return (
        <View style={styles.container}>
            {back &&
                <Pressable style={styles.back} onPress={() => nav.goBack()}>
                    <TextBasic>back</TextBasic>
                </Pressable>
            }
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: gSizes.m
    },
    text: {
        color: gColors.secondary,
        fontSize: gSizes.xl,
        textAlign: 'center'
    },
    back: {
        position: 'absolute',
        left: gSizes.l,
        top: gSizes.m,
        zIndex: 10,
    }
})

export default PageHeader
