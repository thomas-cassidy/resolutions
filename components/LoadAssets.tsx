import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import AppLoading from "expo-app-loading";
import { initialData } from "../utils/InitialData";
import { AppData, GlobalContext } from "../utils/Types";
import { fetchAppData, saveAppData } from "../utils/SaveLoadData";
import moment from "moment";

interface Props {
    children: ReactNode;
}

const initContext = {
    data: initialData,
    setData: () => (d: AppData) => {},
    backgroundImage: require("../assets/clare1.jpeg"),
};

const MyGlobalContext = createContext<GlobalContext>(initContext);

export const useGlobalContext = () => useContext(MyGlobalContext);

export const resetCount = (data: AppData) => {
    const { resolutions, eventLog } = data;

    eventLog.map((e) => {
        e.date = moment(e.date);
    });

    let resolutionsUpdate = [...resolutions];
    resolutionsUpdate.map((r) => {
        r.completedToday = false;
        r.completed = 0;
    });

    for (let x = eventLog.length - 1; x >= 0; x--) {
        if (moment(eventLog[x].date) < moment().startOf("month")) break;
        resolutionsUpdate.map((r) => {
            if (r.id === eventLog[x].resolutionId) {
                if (
                    moment(eventLog[x].date).dayOfYear() ===
                    moment().dayOfYear()
                ) {
                    r.completedToday = true;
                    r.completed += 1;
                } else if (
                    r.targetTime === "week" &&
                    moment(eventLog[x].date) > moment().startOf("week")
                ) {
                    r.completed += 1;
                } else if (r.targetTime === "month") {
                    r.completed += 1;
                }
            }
        });
    }

    return { ...data, resolutions: resolutionsUpdate };
};

const LoadAssets = ({ children }: Props) => {
    const [ready, setReady] = useState(false);
    const [appState, setAppState] = useState(initialData);

    useEffect(() => {
        if (ready) {
            saveAppData(appState);
            // console.log('saved')
        }
    }, [appState]);

    useEffect(() => {
        fetchAppData()
            .then((data) => {
                if (typeof data !== "string") {
                    // console.log(data.eventLog)
                    setAppState(() => resetCount(data));
                }
            })
            .then(() => setReady(true))
            .catch(() => setReady(true));
    }, []);

    if (ready) {
        return (
            <MyGlobalContext.Provider
                value={{ data: appState, setData: setAppState }}
            >
                {children}
            </MyGlobalContext.Provider>
        );
    } else return <AppLoading />;
};

export default LoadAssets;
