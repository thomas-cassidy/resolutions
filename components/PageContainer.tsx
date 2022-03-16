import React, { ReactNode } from 'react'
import { SafeAreaView, ViewProps } from 'react-native'
import { gStyles } from '../utils/GlobalStyles'

interface Props extends ViewProps {
    children?: ReactNode,
}

const PageContainer = ({ children, style }: Props) => {
    return (
        <SafeAreaView style={[gStyles.container, style]}>
            {children}
        </SafeAreaView>
    )
}

export default PageContainer
