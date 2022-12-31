import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { PageContainer, TextBasic, useGlobalContext } from "../components";
import { gColors, gSizes } from "../utils/GlobalStyles";
import { AppRoutes } from "../utils/Routes";

interface Props {
  route: RouteProp<AppRoutes, "Week">;
  navigation: StackNavigationProp<AppRoutes, "Week">;
}

const Week = () => {
  const route = useRoute<RouteProp<AppRoutes, "Week">>();
  const week = route.params;
  const { resolutions } = useGlobalContext().data;

  if (!week) return <></>;

  return (
    <PageContainer>
      {week.map((d, i) => {
        return (
          <View style={{ ...styles.dayContainer, flex: d.events.length + 1 }}>
            <TextBasic style={{ paddingHorizontal: gSizes.m }}>{d.moment.date()}</TextBasic>
            <ScrollView style={{ flex: 1 }}>
              {d.events.map((e, i) => {
                let res = "";
                for (let r = 0; r < resolutions.length; r++) {
                  if (resolutions[r].id === e.id) {
                    res = resolutions[r].title;
                    break;
                  }
                }
                return <TextBasic>{res}</TextBasic>;
              })}
            </ScrollView>
          </View>
        );
      })}
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderColor: gColors.secondary,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});

export default Week;
