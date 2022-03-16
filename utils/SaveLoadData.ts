import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppData } from "./Types";

export const saveAppData = async (appState: AppData) => {
    try {
        await AsyncStorage.setItem(
            "resolutionsUserData",
            JSON.stringify(appState)
        );
    } catch (e) {
        console.log("save error", e);
    }
};

export const fetchAppData = async () => {
    const savedData = await AsyncStorage.getItem("resolutionsUserData");

    if (savedData) return JSON.parse(savedData) as AppData;
    else return "error retrieving data";
};
