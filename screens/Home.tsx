import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { HomeBackground, Logo, NavButton, PageContainer } from "../components";
import { useGlobalContext } from "../components/LoadAssets";
import { gColors, gSizes } from "../utils/GlobalStyles";
import { initialData } from "../utils/InitialData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";

const Home = () => {
    const { data, setData } = useGlobalContext();
    const [ready, setReady] = useState(false);

    return (
        <PageContainer>
            <HomeBackground onLoad={() => setReady(true)} />
            {ready ? (
                <>
                    <View style={styles.upperContainer}>
                        <Logo />
                        <Text style={styles.subtitle}>Welcome to</Text>
                        <Text style={styles.title}>resolutions</Text>
                    </View>

                    <View style={styles.lowerContainer}>
                        <Button
                            onPress={async () => {
                                await AsyncStorage.clear();
                                setData(initialData);
                            }}
                            title='RESET?'
                        />
                        <NavButton label='Complete' navTo='Resolutions' />
                        <NavButton label='Create' bgColor={2} navTo='Create' />
                        <NavButton
                            label='Calendar'
                            bgColor={3}
                            navTo='Achievements'
                        />
                    </View>
                </>
            ) : (
                <AppLoading />
            )}
        </PageContainer>
    );
};

const styles = StyleSheet.create({
    upperContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    lowerContainer: {
        borderRadius: gSizes.m,
        overflow: "hidden",
        marginBottom: gSizes.l,
    },
    subtitle: {
        color: gColors.secondary,
        fontSize: gSizes.xl,
    },
    title: {
        color: gColors.secondary,
        fontSize: 40,
    },
});

export default Home;
