import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import TextBasic from './TextBasic'
import { gColors } from '../utils/GlobalStyles'
import { NONSENSE } from '../utils/InitialData'
import { Resolution } from '../utils/Types'

interface Props {
    resolution: Resolution,
    colorIndex: number,
    onPress: () => void,
}

const ResolutionButton = ({ resolution, colorIndex, onPress }: Props) => {
    const styles = StyleSheet.create({
        container: {
            flex: resolution.target,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            margin: 10,
            backgroundColor: `${gColors.btnColors[colorIndex]}${resolution.completedToday ? '30' : ''}`,
            overflow: 'hidden',
            minHeight: 40
        },
        title: {
            color: gColors.secondary,
            fontSize: 26,
            textAlign: 'center'
        },
        numberToGo: {
            color: gColors.secondary,
            fontSize: 20,
            textAlign: 'center'
        }
    })

    if (resolution.completedToday) {
        return (
            <TouchableOpacity
                style={styles.container}
                activeOpacity={0.8}
                onPress={() => onPress()}
            >
                <TextBasic style={styles.title}>{NONSENSE[Math.floor(Math.random() * NONSENSE.length)]}</TextBasic>
                <Text style={styles.numberToGo}> {resolution.target - resolution.completed} {resolution.title}  {'\n'} to go</Text>
                <Text style={styles.numberToGo}>this {resolution.targetTime}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.8}
            onPress={() => onPress()}
        >
            <Text style={styles.title}>{resolution.title} {'\n'} {resolution.target - resolution.completed} to go</Text>
            <Text style={styles.numberToGo}>this {resolution.targetTime}</Text>
        </TouchableOpacity>
    )
}

export default ResolutionButton
