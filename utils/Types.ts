import moment from "moment"

export type Resolution = {
    id: number,
    title: string;
    target: number,
    completed: number,
    targetTime: 'week' | 'month',
    deleted: boolean,
    completedToday: boolean,
}

export type Event = {
    id: number,
    resolutionId: number,
    date: moment.Moment
}

export type AppData = {
    resolutions: Resolution[],
    eventLog: Event[],
}

export type GlobalContext = {
    data: AppData;
    setData: React.Dispatch<React.SetStateAction<AppData>>;
}