import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { AppData } from "./Types";

export const saveAppData = async (appState: AppData) => {
  try {
    await AsyncStorage.setItem("resolutionsUserData", JSON.stringify(appState));
  } catch (e) {
    console.log("save error", e);
  }
};

export const fetchAppData = async () => {
  const savedJSON = await AsyncStorage.getItem("resolutionsUserData");

  if (savedJSON) {
    const parsedData = JSON.parse(savedJSON) as AppData;

    parsedData.eventLog.forEach((e) => {
      e.date = moment(e.date);
      console.log(e.id);
    });
    return parsedData;
  } else return "error retrieving data";
};
