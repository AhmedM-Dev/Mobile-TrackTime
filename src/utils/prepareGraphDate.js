const prepareGraphData = (statsData) => {
    return [
        // chartConfig={
        //     backgroundColor: 'red'
        //   },
        {
            seriesName: 'days',
            data: [
                { x: 'January', y: statsData[0].workedDays },
                { x: 'February', y: statsData[1].workedDays },
                { x: 'March', y: statsData[2].workedDays },
                { x: 'April', y: statsData[3].workedDays },
                { x: 'May', y: statsData[4].workedDays },
                { x: 'June', y: statsData[5].workedDays },
                { x: 'July', y: statsData[6].workedDays },
                { x: 'August', y: statsData[7].workedDays },
                { x: 'September', y: statsData[8].workedDays },
                { x: 'October', y: statsData[9].workedDays },
                { x: 'November', y: statsData[10].workedDays },
                { x: 'December', y: statsData[11].workedDays },

            ],
            color: '#4C98B4'
        },
        {
            seriesName: 'hours',
            data: [
                { x: 'January', y: statsData[0].workedHours },
                { x: 'February', y: statsData[1].workedHours },
                { x: 'March', y: statsData[2].workedHours },
                { x: 'April', y: statsData[3].workedHours },
                { x: 'May', y: statsData[4].workedHours },
                { x: 'June', y: statsData[5].workedHours },
                { x: 'July', y: statsData[6].workedHours },
                { x: 'August', y: statsData[7].workedHours },
                { x: 'September', y: statsData[8].workedHours },
                { x: 'October', y: statsData[9].workedHours },
                { x: 'November', y: statsData[10].workedHours },
                { x: 'December', y: statsData[11].workedHours },
            ],
            color: '#AA669A'
        },
        {
            seriesName: 'delays',
            data: [
                { x: 'January', y: statsData[0].delays },
                { x: 'February', y: statsData[1].delays },
                { x: 'March', y: statsData[2].delays },
                { x: 'April', y: statsData[3].delays },
                { x: 'May', y: statsData[4].delays },
                { x: 'June', y: statsData[5].delays },
                { x: 'July', y: statsData[6].delays },
                { x: 'August', y: statsData[7].delays },
                { x: 'September', y: statsData[8].delays },
                { x: 'October', y: statsData[9].delays },
                { x: 'November', y: statsData[10].delays },
                { x: 'December', y: statsData[11].delays },
            ],
            color: '#BE4242'
        }
    ];
}

export default prepareGraphData;