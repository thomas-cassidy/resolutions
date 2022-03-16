import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { PageContainer, PageHeader, RoundButton, useGlobalContext } from '../components'
import { resetCount } from '../components/LoadAssets'
import { gColors, gSizes } from '../utils/GlobalStyles'
import { AppRoutes } from '../utils/Routes'
import { Resolution } from '../utils/Types'

interface Props {
    navigation: StackNavigationProp<AppRoutes, 'Create'>
}

interface TempRes extends Omit<Resolution, 'target'> {
    target: string
}

const Create = ({ navigation }: Props) => {
    const { data: { resolutions }, setData } = useGlobalContext()

    const [temp, setTemp] = useState<TempRes[]>(() => resolutions.map(r => ({ ...r, target: r.target.toString() })))

    const handleTitleChange = (id: number, input: string) => {
        setTemp(prev => {
            let newData = [...prev]
            for (let x of newData) {
                if (x.id === id) {
                    x.title = input
                }
            }
            return newData
        })
    }
    const handleTargetChange = (id: number, input: string) => {
        setTemp(prev => {
            let newData = [...prev]
            for (let x of newData) {
                if (x.id === id) {
                    if (!input) x.target = ''
                    else x.target = input
                    break
                }
            }
            return newData
        })
    }
    const handleTargetTimeChange = (id: number) => {
        setTemp(prev => {
            let newData = [...prev]
            for (let x of newData) {
                if (x.id === id) {
                    x.targetTime === 'week' ? x.targetTime = 'month' : x.targetTime = 'week'
                    break
                }
            }
            return newData
        })
    }
    const handleNew = () => {
        setTemp(prev => {
            return [...prev, {
                completed: 0,
                completedToday: false,
                deleted: false,
                target: '1',
                targetTime: 'week',
                id: temp[temp.length - 1].id + 1,
                title: ''
            }]
        })
    }
    const handleSave = () => {
        for (let r of temp) {
            if (!r.title) return alert('You must give your resolution a title')
            if (!r.target) return alert('You must choose a target')

        }
        let newRes: Resolution[] = temp.map(r => {
            if (parseInt(r.target) < r.completed) r.completed = parseInt(r.target)
            return { ...r, target: parseInt(r.target) }
        })
        setData(prev => resetCount(({ ...prev, resolutions: newRes })))
        navigation.pop()
    }

    return (
        <PageContainer>
            <PageHeader title='create' back />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior='padding'
                keyboardVerticalOffset={20}
            >
                <ScrollView
                    stickyHeaderIndices={[0]}
                >
                    <View>
                        <View style={styles.header}>
                            <Text style={styles.titleInput}>resolution</Text>
                            <Text style={styles.targetInput}>target</Text>
                            <Text style={styles.targetInput}>time</Text>
                        </View>
                    </View>

                    {temp.map((res, i) => (
                        <View style={styles.formRow} key={res.id}>
                            <TextInput
                                value={res.title}
                                style={styles.titleInput}
                                placeholder='Resolution'
                                placeholderTextColor={`grey`}
                                onChange={({ nativeEvent: { text } }) => handleTitleChange(res.id, text)}
                            />
                            <TextInput
                                value={res.target.toString()}
                                style={styles.targetInput}
                                placeholder='0'
                                keyboardType='number-pad'
                                onChange={({ nativeEvent: { text } }) => handleTargetChange(res.id, text)} />
                            <TouchableOpacity
                                style={{ flex: 1 }}
                                onPress={() => handleTargetTimeChange(res.id)}
                            >
                                <Text style={styles.targetInput}>{res.targetTime}</Text>
                            </TouchableOpacity>
                        </View >
                    ))}
                </ScrollView >
            </KeyboardAvoidingView>
            <RoundButton label='New' style={{ backgroundColor: gColors.btnColors[1] }} onPress={handleNew} />
            <RoundButton label='Save' onPress={handleSave} />
        </PageContainer >
    )
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: gSizes.l,
        paddingVertical: gSizes.m,
        borderBottomWidth: 1,
        borderBottomColor: gColors.secondary,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: gColors.btnColors[2]
    },
    formRow: {
        padding: gSizes.l,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: gColors.secondary,
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleInput: {
        color: gColors.secondary,
        fontSize: gSizes.l,
        flex: 3,
    },
    targetInput: {
        color: gColors.secondary,
        fontSize: gSizes.l,
        flex: 1,
        textAlign: 'center',
    },
})

export default Create
