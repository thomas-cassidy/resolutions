import moment from "moment";
import { AppData } from "./Types";

export const initialData: AppData = {
  resolutions: [
    {
      id: 1,
      title: "Workouts",
      target: 4,
      targetTime: "week",
      completed: 3,
      completedToday: false,
      deleted: false,
    },
    {
      id: 2,
      title: "Yoga",
      target: 4,
      targetTime: "week",
      completed: 1,
      completedToday: false,
      deleted: false,
    },
    {
      id: 3,
      title: "Books",
      target: 2,
      targetTime: "month",
      completed: 0,
      completedToday: false,
      deleted: false,
    },
    {
      id: 4,
      title: "Wake Up!",
      target: 6,
      targetTime: "week",
      completed: 0,
      completedToday: false,
      deleted: false,
    },
    {
      id: 5,
      title: "Treats",
      target: 2,
      targetTime: "month",
      completed: 0,
      completedToday: false,
      deleted: false,
    },
  ],
  eventLog: [
    {
      id: 1,
      date: moment("2022-02-02T14:45:26.061Z"),
      resolutionId: 5,
    },
    {
      id: 5,
      date: moment("2022-01-02T14:45:26.061Z"),
      resolutionId: 1,
    },
    {
      id: 4,
      date: moment("2022-01-19T14:45:26.061Z"),
      resolutionId: 1,
    },
    {
      id: 2,
      date: moment("2022-01-20T14:46:26.061Z"),
      resolutionId: 1,
    },
    {
      id: 3,
      date: moment("2022-01-20T14:47:26.061Z"),
      resolutionId: 2,
    },
    {
      id: 7,
      date: moment("2022-01-22T14:47:26.061Z"),
      resolutionId: 3,
    },
    {
      id: 8,
      date: moment("2022-01-23T14:47:26.061Z"),
      resolutionId: 4,
    },
  ],
};

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const NONSENSE = ["Way to go!", "Huzzah", "Great work!", "Nice one!"];
