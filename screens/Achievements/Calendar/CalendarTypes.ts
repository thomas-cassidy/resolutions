import moment from 'moment'
import { Event } from '../../../utils/Types'

export type DayType = {
    moment: moment.Moment,
    events: Event[]
}

export type WeekType = DayType[]

export type MonthType = {
    name: number;
    weeks: WeekType[]
}

export type YearType = {
    year: number;
    months: MonthType[];
}