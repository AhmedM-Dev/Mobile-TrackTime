import React from 'react';

const data = [
    { delays: 6, workedHours: 176.87, workedDays: 19 },
    { delays: 5, workedHours: 122.4, workedDays: 14 },
    { delays: 5, workedHours: 132.18, workedDays: 13 },
    { delays: 6, workedHours: 222.46, workedDays: 24 },
    { delays: 4, workedHours: 128.21, workedDays: 15 },
    { delays: 3, workedHours: 131.26, workedDays: 14 },
    { delays: 1, workedHours: 105.87, workedDays: 12 },
    { delays: 2, workedHours: 147.84, workedDays: 15 },
    { delays: 4, workedHours: 220.9, workedDays: 23 },
    { delays: 1, workedHours: 120.62, workedDays: 13 },
    { delays: 1, workedHours: 159.19, workedDays: 17 },
    { delays: 5, workedHours: 140.8, workedDays: 15 }
];

const getMonth = (value) => {
    switch (value) {
        case 1: return 'Jan';
        case 2: return 'Feb';
        case 3: return 'Mar';
        case 4: return 'Apr';
        case 5: return 'May';
        case 6: return 'Jun';
        case 7: return 'Jul';
        case 8: return 'Aug';
        case 9: return 'Sep';
        case 10: return 'Oct';
        case 11: return 'Nov';
        case 12: return 'Dec';
    }
}

const contentInset = { top: 20, bottom: 20 }

const colors = ['red', 'green', 'white'];
const keys = ['delays', 'workedHours', 'workedDays'];

const AnotherCard = props => {
    return (
        <Card style={styles.lineChart} >
            <View style={{ height: 200, flexDirection: 'row' }}>
                <YAxis
                    style={{ marginLeft: 10 }}
                    data={[0, 200]}
                    contentInset={contentInset}
                    svg={{
                        fill: 'white',
                        fontSize: 10,
                    }}
                    numberOfTicks={10}
                />

                <StackedBarChart
                    style={{ flex: 1, marginLeft: 16 }}
                    keys={keys}
                    colors={colors}
                    data={this.props.stats.perMonth}
                    showGrid={true}
                    contentInset={{ top: 30, bottom: 15 }}
                >
                    <Grid />
                    <Gradient />
                </StackedBarChart>

            </View>

            <XAxis
                style={{ marginLeft: 22, marginHorizontal: -10, marginRight: 2 }}
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
                formatLabel={value => this.getMonth(value)}
                contentInset={{ left: 10, right: 10 }}
                svg={{ fontSize: 10, fill: 'white' }}
            />
        </Card>
    )
}

const styles = StyleSheet.create({
    lineChart: {
        backgroundColor: '#082955',
        borderColor: '#082955',
        paddingTop: 25,
        paddingBottom: 10,
        paddingRight: 20,
        width: '100%',
        alignSelf: 'center',
        borderRadius: 10
    }
});

export default AnotherCard;