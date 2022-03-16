import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import moment from 'moment'
import { PageContainer, ResolutionButton } from '../components'
import { useGlobalContext } from '../components/LoadAssets'
import { gColors, gSizes } from '../utils/GlobalStyles'
import { AppRoutes } from '../utils/Routes'
import { Resolution } from '../utils/Types'

interface Props {
    navigation: StackNavigationProp<AppRoutes, 'Resolutions'>
}

const Resolutions = ({ navigation }: Props) => {
    const { data: { resolutions, eventLog }, setData } = useGlobalContext()
    const HALF = Math.floor(resolutions.length / 2)
    const LEFT = resolutions.slice(0, HALF)
    const RIGHT = resolutions.slice(HALF)

    useEffect(() => {
        //check comepletedToday and set correctly on resolutions
        let resolutionsUpdate: Resolution[] = [...resolutions]

        resolutionsUpdate.map(r => r.completedToday = false)

        for (let x = eventLog.length - 1; x >= 0; x--) {
            if (moment(eventLog[x].date).dayOfYear() != moment().dayOfYear()) break
            resolutionsUpdate.map(r => {
                if (r.id === eventLog[x].resolutionId) r.completedToday = true
            })
        }

        setData(prev => {
            let newData = { ...prev }
            newData.resolutions = resolutionsUpdate
            return newData
        })
    }, [])

    const complete = (id: number) => {
        setData(prev => {
            let { resolutions, eventLog } = { ...prev }

            for (let x = 0; x < resolutions.length; x++) {
                if (resolutions[x].id === id) {
                    if (resolutions[x].completed < resolutions[x].target && resolutions[x].completedToday === false) {
                        resolutions[x].completed += 1
                        resolutions[x].completedToday = true
                        eventLog.push({ id: parseInt(Math.random().toString().substring(2)), resolutionId: id, date: moment() })
                    }
                    break
                }
            }

            return { resolutions, eventLog }
        })
    }

    const onPress = (id: number) => complete(id)

    return (
        <PageContainer style={{ flexDirection: 'row' }}>
            <View style={styles.column}>
                <Pressable onPress={() => navigation.pop()}>
                    <Text style={styles.title}>resolutions</Text>
                </Pressable>
                {LEFT.map((res, i) => (
                    <ResolutionButton
                        key={i}
                        resolution={res}
                        colorIndex={i % gColors.btnColors.length}
                        onPress={() => onPress(res.id)}
                    />
                ))}
            </View>

            <View style={styles.column}>
                {RIGHT.map((res, i) => (
                    <ResolutionButton
                        key={i}
                        colorIndex={(i + HALF) % gColors.btnColors.length}
                        resolution={res}
                        onPress={() => onPress(res.id)}
                    />
                ))}
            </View>
        </PageContainer>
    )
}

const styles = StyleSheet.create({
    column: {
        flex: 1,
        margin: gSizes.s,
    },
    title: {
        color: gColors.secondary,
        fontSize: gSizes.xl,
        fontWeight: 'bold',
        padding: gSizes.s,
        textAlign: 'center',
    }
})

export default Resolutions
