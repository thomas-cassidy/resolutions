import { MonthType } from "./CalendarTypes";
import moment from "moment";
import { Event } from "../../../utils/Types";

export const getYear = (eventLog: Event[]) => {
    let date = moment().add(1, "M");
    let year: MonthType[] = Array(date.month() + 1);
    while (date.month() != 11) {
        year[date.month()] = makeMonth({ today: date });
        date.subtract(1, "M");
    }

    for (let x = eventLog.length - 1; x >= 0; x--) {
        let event = eventLog[x];
        let date = moment(event.date);
        year[date.month()].weeks.map((w) => {
            w.map((d) => {
                if (date.dayOfYear() === moment(d.moment).dayOfYear())
                    d.events.push(event);
            });
        });
    }

    return year;
};

interface MakeMonthProps {
    today?: moment.Moment;
}
const makeMonth = ({ today = moment() }: MakeMonthProps) => {
    const startDay = today.clone().startOf("month").startOf("week");
    const endDay = today.clone().endOf("month").endOf("week");

    const month: MonthType = {
        name: today.month(),
        weeks: [],
    };

    const day = startDay.clone().subtract(1, "d");
    while (day.isBefore(endDay, "day")) {
        month.weeks.push(
            Array(7)
                .fill({ moment: startDay.clone(), events: [] })
                .map(() => ({
                    moment: day.add(1, "d").clone(),
                    events: [],
                }))
        );
    }
    return month;
};
