import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  AppState,
  AppStateStatus,
} from "react-native";
import moment from "moment";
import { PageContainer, ResolutionButton, TextBasic } from "../components";
import { useGlobalContext } from "../components/LoadAssets";
import { gColors, gSizes } from "../utils/GlobalStyles";
import { AppRoutes } from "../utils/Routes";
import { resetCount } from "../utils/resetResolutionCount";

interface Props {
  navigation: StackNavigationProp<AppRoutes, "Resolutions">;
}

const Resolutions = ({ navigation }: Props) => {
  const {
    data: { resolutions, eventLog },
    setData,
  } = useGlobalContext();
  const [currentDate, setCurrentDate] = useState(moment());

  const HALF = Math.floor(resolutions.length / 2);
  const LEFT = resolutions.slice(0, HALF);
  const RIGHT = resolutions.slice(HALF);

  const incrementDate = () =>
    setCurrentDate((prev) => (prev.isSame(moment(), "day") ? prev : prev.clone().add(1, "day")));

  const decrementDate = () =>
    setCurrentDate((prev) =>
      prev.isSame(moment().startOf("year"), "day") ? prev : prev.clone().subtract(1, "day")
    );

  const onAppStateChange = useCallback((state: AppStateStatus) => {
    if (state === "background") {
      setCurrentDate(moment());
    }
  }, []);

  useEffect(() => {
    const appStateSubscription = AppState.addEventListener("change", onAppStateChange);
    return () => {
      appStateSubscription.remove();
    };
  }, []);

  useEffect(() => {
    setData((prev) => resetCount({ ...prev }, currentDate));
  }, [currentDate]);

  const complete = (id: number) => {
    const newEvent = {
      id: parseInt(Math.random().toString().substring(2)),
      resolutionId: id,
      date: currentDate,
    };
    setData((prev) => {
      return resetCount({ ...prev, eventLog: [...prev.eventLog, newEvent] }, currentDate);
    });
  };

  return (
    <PageContainer>
      {/* main */}
      <View style={{ flexDirection: "row", flex: 1 }}>
        <View style={styles.column}>
          <Pressable onPress={() => navigation.pop()}>
            <Text style={styles.title}>resolutions</Text>
          </Pressable>
          {LEFT.map((res, i) => (
            <ResolutionButton
              key={i}
              resolution={res}
              colorIndex={i % gColors.btnColors.length}
              onPress={() => !res.completedToday && complete(res.id)}
            />
          ))}
        </View>

        <View style={styles.column}>
          {RIGHT.map((res, i) => (
            <ResolutionButton
              key={i}
              colorIndex={(i + HALF) % gColors.btnColors.length}
              resolution={res}
              onPress={() => !res.completedToday && complete(res.id)}
            />
          ))}
        </View>
      </View>

      {/* footer */}
      <View style={{ justifyContent: "space-evenly", flexDirection: "row" }}>
        <TouchableOpacity style={styles.footerButton} onPress={decrementDate}>
          <TextBasic>-</TextBasic>
        </TouchableOpacity>
        <TextBasic>{currentDate.locale("plop").calendar()}</TextBasic>
        <TouchableOpacity style={styles.footerButton} onPress={incrementDate}>
          <TextBasic>+</TextBasic>
        </TouchableOpacity>
      </View>
    </PageContainer>
  );
};

moment.updateLocale("plop", {
  calendar: {
    lastDay: "[Yesterday]",
    sameDay: "[Today]",
    nextDay: "[Tomorrow]",
    lastWeek: "dddd",
    sameElse: "dddd Do MMM",
  },
});

const styles = StyleSheet.create({
  column: {
    flex: 1,
    margin: gSizes.s,
  },
  title: {
    color: gColors.secondary,
    fontSize: gSizes.xl,
    fontWeight: "bold",
    padding: gSizes.s,
    textAlign: "center",
  },
  footerButton: { flex: 1, alignItems: "center" },
});

export default Resolutions;
