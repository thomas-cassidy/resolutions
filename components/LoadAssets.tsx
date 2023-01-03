import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
// import AppLoading from "expo-app-loading";
import { initialData } from "../utils/InitialData";
import { AppData, GlobalContext } from "../utils/Types";
import { fetchAppData, saveAppData } from "../utils/SaveLoadData";
import moment from "moment";
import { useAssets } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";

interface Props {
  children: ReactNode;
}

const initContext = {
  data: initialData,
  setData: () => (d: AppData) => {},
  imageAssets: [],
};

const MyGlobalContext = createContext<GlobalContext>(initContext);

export const useGlobalContext = () => useContext(MyGlobalContext);

export const resetCount = (data: AppData) => {
  const { resolutions, eventLog } = data;

  eventLog.forEach((e) => {
    e.date = moment(e.date);
  });

  let resolutionsUpdate = [...resolutions];
  resolutionsUpdate.forEach((r) => {
    r.completedToday = false;
    r.completed = 0;
  });

  for (let x = eventLog.length - 1; x >= 0; x--) {
    if (moment(eventLog[x].date) < moment().startOf("month")) break;
    resolutionsUpdate.forEach((r) => {
      if (r.id === eventLog[x].resolutionId) {
        if (moment(eventLog[x].date).dayOfYear() === moment().dayOfYear()) {
          r.completedToday = true;
          r.completed += 1;
        } else if (r.targetTime === "week" && moment(eventLog[x].date) > moment().startOf("week")) {
          r.completed += 1;
        } else if (r.targetTime === "month") {
          r.completed += 1;
        }
      }
    });
  }

  return { ...data, resolutions: resolutionsUpdate };
};

SplashScreen.preventAutoHideAsync();

const LoadAssets = ({ children }: Props) => {
  const [ready, setReady] = useState(false);
  const [appState, setAppState] = useState(initialData);
  const [imageAssets, error] = useAssets(require("../assets/clare1.jpeg"));

  useEffect(() => {
    if (ready) {
      saveAppData(appState);
    }
  }, [appState]);

  const clearSplash = async () => {
    await SplashScreen.hideAsync();
    setReady(true);
  };

  useEffect(() => {
    fetchAppData()
      .then((data) => {
        if (typeof data !== "string") {
          // console.log(data.eventLog)
          setAppState(() => resetCount(data));
        }
      })
      .then(() => clearSplash())
      .catch(() => clearSplash());
  }, []);

  if (ready && imageAssets) {
    return (
      <MyGlobalContext.Provider value={{ data: appState, setData: setAppState, imageAssets }}>
        {children}
      </MyGlobalContext.Provider>
    );
  } else return <></>;
};

export default LoadAssets;
