const getYear = (eventLog: Event[]) => {
    const startDay = moment().startOf('y')
    const endDay = moment().endOf('month')
    const year = Array(endDay.dayOfYear()).fill('')

    const mappedYear: { date: moment.Moment, events: Event[] }[] = year.map((_, i) => {
        return {
            date: startDay.add(i, 'd'),
            events: []
        }
    })

    eventLog.map(e => {
        if (moment(e.date).year() !== moment().year()) {
            return
        }
        const day = moment(e.date).dayOfYear() - 1
        mappedYear[day].events.push(e)
    })

    return mappedYear
}