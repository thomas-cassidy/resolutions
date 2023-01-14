import React, { createContext, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { TextBasic, useGlobalContext } from "../../../components";
import moment from "moment";
import { gSizes, gColors } from "../../../utils/GlobalStyles";
import { MONTHS } from "../../../utils/InitialData";
import { MonthType, WeekType } from "./CalendarTypes";
import { getYear } from "./getYear";
import { Resolution } from "../../../utils/Types";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { resetCount } from "../../../utils/resetResolutionCount";

const { width, height } = Dimensions.get("window");

const paddingHor = gSizes.m;
const dayWidth = (width - paddingHor * 2) / 7;

interface weekProps {
  resolutions: Resolution[];
  month: number;
  week: WeekType;
  index: number;
  setWeekOpen: Dispatch<SetStateAction<boolean>>;
  isCurrentMonth: boolean;
}

const ROW_HEIGHT = height / 9;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Week = ({ resolutions, month, week, index, setWeekOpen, isCurrentMonth }: weekProps) => {
  const [open, setOpen] = useState(false);
  const { setData } = useGlobalContext();

  useEffect(() => {
    if (!isCurrentMonth) {
      if (open) shrink();
    }
  }, [isCurrentMonth]);

  const deleteEvent = (id: number) => {
    Alert.alert("Are you sure you wish to delete this?", undefined, [
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setData((prevData) => {
            let newData = { ...prevData };

            newData.eventLog = newData.eventLog.filter((e) => e.id !== id);

            resetCount(newData);

            return newData;
          });
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const animationRef = useRef(new Animated.Value(0)).current;
  const opacity = animationRef.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const topPosition = animationRef.interpolate({
    inputRange: [0, 1],
    outputRange: [ROW_HEIGHT * index + 40, 40],
  });
  const weekHeight = animationRef.interpolate({
    inputRange: [0, 1],
    outputRange: [ROW_HEIGHT, ROW_HEIGHT * 7],
  });

  const expand = () => {
    setWeekOpen(true);
    setOpen(true);
    Animated.timing(animationRef, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };
  const shrink = () => {
    Animated.timing(animationRef, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setWeekOpen(false);
      setOpen(false);
    });
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: open ? "column" : "row",
      backgroundColor: gColors.primary,
      position: "absolute",
      width,
      overflow: "hidden",
      paddingHorizontal: gSizes.m,
      zIndex: open ? 10 : 0,
    },
    dayContainer: {
      width: dayWidth,
      paddingTop: gSizes.m,
      alignItems: "center",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: gColors.secondary,
    },
  });

  return (
    <Animated.ScrollView
      style={{
        ...styles.container,
        height: weekHeight,
        top: topPosition,
      }}
      horizontal={!open}
    >
      {!open
        ? //
          //closed week view
          week.map((d, i) => {
            const isMonth = d.moment.month() === month;
            const textColor = isMonth ? gColors.secondary : "grey";
            const blobColour = isMonth
              ? d.events.length === 0
                ? gColors.secondary
                : gColors.btnColors[0]
              : gColors.btnColors[2];
            const blobSize = d.events.length * 7 + 1;
            return (
              <Pressable key={i} style={styles.dayContainer} onPress={() => expand()}>
                <Text style={{ color: textColor }}>{d.moment.date()}</Text>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: blobColour,
                      width: blobSize,
                      height: blobSize,
                      borderRadius: blobSize,
                      maxWidth: dayWidth - gSizes.l,
                      maxHeight: dayWidth - gSizes.l,
                    }}
                  />
                </View>
              </Pressable>
            );
          })
        : //
          // open week view
          week.map((d, i) => {
            const isMonth = d.moment.month() === month;
            const textColor = isMonth ? gColors.secondary : "grey";

            const largeDayStyle: ViewStyle = {
              minHeight: ROW_HEIGHT,
              // flex: 1,
              flexDirection: "row",
              width: width - 2 * gSizes.m,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderColor: gColors.secondary,
              justifyContent: "center",
              alignItems: "center",
            };

            return (
              <AnimatedPressable
                style={{ ...largeDayStyle, opacity }}
                onPress={() => shrink()}
                key={i}
              >
                <TextBasic
                  style={{
                    paddingHorizontal: gSizes.m,
                    color: textColor,
                  }}
                >
                  {d.moment.date()}
                </TextBasic>
                <View style={{ flex: 1 }}>
                  {d.events.map((e, i) => {
                    let title = "";
                    for (let r = 0; r < resolutions.length; r++) {
                      if (resolutions[r].id === e.resolutionId) {
                        title = resolutions[r].title;
                        break;
                      }
                    }

                    return (
                      <View
                        key={i}
                        style={{
                          alignItems: "center",
                          justifyContent: "space-between",
                          flexDirection: "row",
                          paddingLeft: gSizes.l,
                        }}
                      >
                        <TextBasic>⭐</TextBasic>
                        <TextBasic
                          style={{
                            paddingLeft: gSizes.l,
                            paddingVertical: gSizes.l,
                          }}
                        >
                          {title}
                        </TextBasic>

                        <View style={{ flex: 1, alignItems: "flex-end", paddingRight: gSizes.l }}>
                          <TouchableOpacity onPress={() => deleteEvent(e.id)}>
                            <FontAwesomeIcon
                              icon={faTrashAlt}
                              size={20}
                              color={gColors.btnColors[0]}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </AnimatedPressable>
            );
          })}
    </Animated.ScrollView>
  );
};

const Calendar = () => {
  const {
    data: { resolutions, eventLog },
  } = useGlobalContext();
  const [year, setYear] = useState<MonthType[]>([]);

  const [weekOpen, setWeekOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    setYear(getYear(eventLog));
  }, [eventLog]);

  //   useEffect(() => {
  //     scrollRef.current?.scrollTo({ x: width * 11 });
  //   }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        decelerationRate={"fast"}
        horizontal
        ref={scrollRef}
        style={{ width }}
        snapToInterval={width}
        onScroll={(e) => setCurrentPage(Math.floor(e.nativeEvent.contentOffset.x / width))}
        scrollEventThrottle={32}
      >
        {year.map((month, i) => {
          let isCurrentMonth = i === currentPage;
          return (
            <View style={styles.container} key={i}>
              <Text style={styles.title}>{MONTHS[month.name]}</Text>
              {month.weeks.map((w, i) => (
                <Week
                  week={w}
                  month={month.name}
                  index={i}
                  key={i}
                  {...{
                    resolutions,
                    setWeekOpen,
                    isCurrentMonth,
                  }}
                />
              ))}
            </View>
          );
        })}
      </ScrollView>
      <TextBasic
        style={{
          position: "absolute",
          color: gColors.btnColors[1],
          backgroundColor: gColors.primary,
          paddingHorizontal: gSizes.l,
          paddingVertical: gSizes.m,
        }}
      >
        {moment().year()}
      </TextBasic>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width,
    flex: 1,
  },
  title: {
    color: gColors.secondary,
    fontSize: gSizes.l,
    textAlign: "right",
    paddingVertical: gSizes.m,
    paddingHorizontal: gSizes.l,
  },
});

export default Calendar;
