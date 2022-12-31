import { MonthType } from "./CalendarTypes";
import moment from "moment";
import { Event } from "../../../utils/Types";

export const getYear = (eventLog: Event[]) => {
  let today = moment();
  let year = Array(today.month() + 1)
    .fill("")
    .map((_, i) => makeMonth(i));

  eventLog.forEach((e) => {
    let eventDate = moment(e.date);
    year[eventDate.month()].weeks.forEach((w) => {
      w.forEach((d) => {
        if (eventDate.dayOfYear() === moment(d.moment).dayOfYear()) d.events.unshift(e);
      });
    });
  });

  return year;
};

const makeMonth = (month: number) => {
  const startDay = moment().set("M", month).startOf("month").startOf("week");
  const endDay = moment().set("M", month).endOf("month").endOf("week");

  const monthObj: MonthType = {
    name: month,
    weeks: [],
  };

  const day = startDay.clone().subtract(1, "d");

  while (day.isBefore(endDay, "day")) {
    monthObj.weeks.push(
      Array(7)
        .fill({ moment: startDay.clone(), events: [] })
        .map(() => ({
          moment: day.add(1, "d").clone(),
          events: [],
        }))
    );
  }
  return monthObj;
};
