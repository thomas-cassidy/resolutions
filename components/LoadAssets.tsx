import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
// import AppLoading from "expo-app-loading";
import { initialData } from "../utils/InitialData";
import { AppData, GlobalContext } from "../utils/Types";
import { fetchAppData, saveAppData } from "../utils/SaveLoadData";
import moment, { Moment } from "moment";
import { useAssets } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import { resetCount } from "../utils/resetResolutionCount";

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
