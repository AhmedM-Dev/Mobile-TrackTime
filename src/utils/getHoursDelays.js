import getHoursOfWork from "./timeDiff";

const getHoursDelays = (attendances) => {


    console.log("received attendances",attendances);

    let hoursSum = 0;
    let delays = 0;

    attendances.map(day => {
        console.log("EACH DAY:", getHoursOfWork(day.attendances));
        
        if (new Date("2018-02-02 " + day.attendances[0]).getHours() > 9) {
            delays++;
        }
        hoursSum += getHoursOfWork(day.attendances).getHours() * 3600 + getHoursOfWork(day.attendances).getMinutes() * 60 + getHoursOfWork(day.attendances).getSeconds();
    });

    return {
        workedHours: (hoursSum / 3600).toFixed(2),
        delays: delays
    }
}

export default getHoursDelays;
