import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import moment from "moment";
import { PageContainer, ResolutionButton } from "../components";
import { useGlobalContext } from "../components/LoadAssets";
import { gColors, gSizes } from "../utils/GlobalStyles";
import { AppRoutes } from "../utils/Routes";
import { Resolution } from "../utils/Types";

interface Props {
  navigation: StackNavigationProp<AppRoutes, "Resolutions">;
}

const Resolutions = ({ navigation }: Props) => {
  const {
    data: { resolutions, eventLog },
    setData,
  } = useGlobalContext();
  const HALF = Math.floor(resolutions.length / 2);
  const LEFT = resolutions.slice(0, HALF);
  const RIGHT = resolutions.slice(HALF);

  const [currentDate, setCurrentDate] = useState(moment());

  useEffect(() => {
    //check completedToday and set correctly on resolutions
    let resolutionsUpdate: Resolution[] = [...resolutions];

    resolutionsUpdate.forEach((r) => (r.completedToday = false));

    eventLog.forEach((e) => {
      if (moment(e.date).isSame(currentDate, "day")) {
        resolutions.forEach((r) => r.id === e.resolutionId && (r.completedToday = true));
      }
    });

    setData((prev) => {
      let newData = { ...prev };
      newData.resolutions = resolutionsUpdate;
      return newData;
    });
  }, [currentDate]);

  const complete = (id: number) => {
    setData((prev) => {
      let { resolutions, eventLog } = { ...prev };

      for (let x = 0; x < resolutions.length; x++) {
        if (resolutions[x].id === id) {
          if (
            resolutions[x].completed < resolutions[x].target &&
            resolutions[x].completedToday === false
          ) {
            resolutions[x].completed += 1;
            resolutions[x].completedToday = true;
            eventLog.push({
              id: parseInt(Math.random().toString().substring(2)),
              resolutionId: id,
              date: currentDate,
            });
          }
          break;
        }
      }

      return { resolutions, eventLog };
    });
  };

  const onPress = (id: number) => complete(id);

  return (
    <PageContainer>
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
      </View>
      <View style={{ justifyContent: "space-evenly", flexDirection: "row" }}>
        <TouchableOpacity
          style={{ flex: 1, alignItems: "center" }}
          onPress={() => setCurrentDate((prev) => prev.clone().subtract(1, "day"))}
        >
          <Text style={styles.dateText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.dateText}>{currentDate.locale("en").calendar()}</Text>
        <TouchableOpacity
          style={{ flex: 1, alignItems: "center" }}
          onPress={() =>
            setCurrentDate((prev) =>
              prev.isSame(moment(), "day") ? prev : prev.clone().add(1, "day")
            )
          }
        >
          <Text style={styles.dateText}>+</Text>
        </TouchableOpacity>
      </View>
    </PageContainer>
  );
};

moment.updateLocale("en", {
  calendar: {
    lastDay: "[Yesterday]",
    sameDay: "[Today]",
    nextDay: "[Tomorrow]",
    lastWeek: "[last] dddd",
    sameElse: "L",
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
  dateText: {
    color: gColors.secondary,
    fontSize: gSizes.l,
    fontWeight: "bold",
  },
});

export default Resolutions;
