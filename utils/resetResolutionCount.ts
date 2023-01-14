import moment, { Moment } from "moment";
import { AppData } from "./Types";

export const resetCount = (data: AppData, currentDate: Moment = moment()) => {
  const { resolutions, eventLog } = data;
  const currentMonth = currentDate.clone().startOf("M");
  const currentWeek = currentDate.clone().startOf("isoWeek");
  const nextWeek = currentWeek.clone().endOf("isoWeek");

  let updatedResolutionsArr = [...resolutions];

  updatedResolutionsArr.forEach((r) => {
    r.completedToday = false;
    r.completed = 0;
  });

  eventLog.forEach((event) => {
    if (event.date < currentMonth) return;

    updatedResolutionsArr.forEach((r) => {
      if (r.id === event.resolutionId) {
        if (event.date.dayOfYear() === currentDate.dayOfYear()) {
          r.completedToday = true;
          r.completed += 1;
        } else if (r.targetTime === "week" && nextWeek > event.date && event.date > currentWeek) {
          r.completed += 1;
        } else if (r.targetTime === "month") {
          r.completed += 1;
        }
      }
    });
  });

  return { ...data, resolutions: updatedResolutionsArr };
};
