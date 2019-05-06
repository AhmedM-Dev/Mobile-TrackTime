import React, { useEffect } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { Container, Content, Card, CardItem, Text, Button, Left, Body, Right, View, Picker, Footer, FooterTab, Badge, Icon, Header, Title } from 'native-base';
import SearchableDropdown from 'react-native-searchable-dropdown';
import AsyncStorage from '@react-native-community/async-storage';
import PureChart from 'react-native-pure-chart';

import { Defs, LinearGradient, Stop } from 'react-native-svg'
import { LineChart, Grid, StackedBarChart, XAxis, YAxis } from 'react-native-svg-charts'

import NotificationsBell from "../../ui/NotificationsBell";

import getHoursDelays from "../../../utils/getHoursDelays";
import getHoursOfWork from "../../../utils/timeDiff";

import { API_URL } from "../../../../config";

import { getStats } from './actions';

var items = [
    {
        id: 'Current year',
        name: 'Current year',
    },
    {
        id: '2018',
        name: '2018',
    },
    {
        id: 'All years',
        name: 'All years',
    },

];

option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
};

class Dashboard extends React.Component {
    state = {
        connectedUser: {},
        year: new Date().getFullYear(),
        daysWorked: 0,
        workedHours: 0,
        delays: 0,
        averageWorkHours: 0,
        byMonth: null,
        fetched: false
    }

    componentDidMount() {
        this.props.getStats({ year: new Date().getFullYear() });
    }

    getMonth = (value) => {
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

    render() {
        let sampleDataa = [
            {
                value: 50,
                label: 'Refused',
                color: '#C25A5A',
            }, {
                value: 40,
                label: 'Canceled',
                color: '#C2C25A'
            }, {
                value: 25,
                label: 'Accepted',
                color: '#5AC26B'
            },
            {
                value: 10,
                label: 'On hold',
                color: '#5AAAC2'
            }

        ]

        // const data = [[50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, 120], [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -30], [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, 20]]

        // const data = [
        //     {
        //         month: new Date(2015, 0, 1),
        //         apples: 3840,
        //         bananas: 1920,
        //         cherries: 960,
        //         dates: 400,
        //         oranges: 400,
        //     },
        //     {
        //         month: new Date(2015, 1, 1),
        //         apples: 1600,
        //         bananas: 1440,
        //         cherries: 960,
        //         dates: 400,
        //     },
        //     {
        //         month: new Date(2015, 2, 1),
        //         apples: 640,
        //         bananas: 960,
        //         cherries: 3640,
        //         dates: 400,
        //     },
        //     {
        //         month: new Date(2015, 3, 1),
        //         apples: 3320,
        //         bananas: 480,
        //         cherries: 640,
        //         dates: 400,
        //     },
        //     {
        //         month: new Date(2015, 3, 1),
        //         apples: 3320,
        //         bananas: 480,
        //         cherries: 640,
        //         dates: 400,
        //     },
        //     {
        //         month: new Date(2015, 3, 1),
        //         apples: 3320,
        //         bananas: 480,
        //         cherries: 640,
        //         dates: 400,
        //     },
        //     {
        //         month: new Date(2015, 3, 1),
        //         apples: 3320,
        //         bananas: 480,
        //         cherries: 640,
        //         dates: 400,
        //     },
        //     {
        //         month: new Date(2015, 3, 1),
        //         apples: 3320,
        //         bananas: 480,
        //         cherries: 640,
        //         dates: 400,
        //     },
        //     {
        //         month: new Date(2015, 3, 1),
        //         apples: 3320,
        //         bananas: 480,
        //         cherries: 640,
        //         dates: 400,
        //     },
        //     {
        //         month: new Date(2015, 3, 1),
        //         apples: 3320,
        //         bananas: 480,
        //         cherries: 640,
        //         dates: 400,
        //     },
        //     {
        //         month: new Date(2015, 3, 1),
        //         apples: 3320,
        //         bananas: 480,
        //         cherries: 640,
        //         dates: 400,
        //     },
        //     {
        //         month: new Date(2015, 3, 1),
        //         apples: 3320,
        //         bananas: 480,
        //         cherries: 640,
        //         dates: 400,
        //     },
        // ]

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



        const contentInset = { top: 20, bottom: 20 }

        const colors = ['red', 'green', 'white'];
        const keys = ['delays', 'workedHours', 'workedDays'];

        const Gradient = () => (
            <Defs key={'gradient'}>
                <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
                    <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'} />
                    <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'} />
                </LinearGradient>
            </Defs>
        )

        if (!this.props.stats) {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size={80} color="#0000ff" />
                    <StatusBar hidden={true} />
                </View>
            )
        } else if (this.props.stats && this.props.stats.perMonth.length > 0) {

            let graphData = [
                // chartConfig={
                //     backgroundColor: 'red'
                //   },
                {
                    seriesName: 'days',
                    data: [
                        { x: 'January', y: this.props.stats.perMonth[0].workedDays },
                        { x: 'Days', y: this.props.stats.perMonth[1].workedDays },
                        { x: 'march', y: this.props.stats.perMonth[2].workedDays },
                        { x: 'April', y: this.props.stats.perMonth[3].workedDays },
                        { x: 'may', y: this.props.stats.perMonth[4].workedDays },
                        { x: 'June', y: this.props.stats.perMonth[5].workedDays },
                        { x: 'July', y: this.props.stats.perMonth[6].workedDays },
                        { x: 'August', y: this.props.stats.perMonth[7].workedDays },
                        { x: 'September', y: this.props.stats.perMonth[8].workedDays },
                        { x: 'October', y: this.props.stats.perMonth[9].workedDays },
                        { x: 'November', y: this.props.stats.perMonth[10].workedDays },
                        { x: 'December', y: this.props.stats.perMonth[11].workedDays },

                    ],
                    color: 'green'

                },
                {
                    seriesName: 'hours',
                    data: [
                        { x: 'January', y: this.props.stats.perMonth[0].workedHours },
                        { x: 'Hours', y: this.props.stats.perMonth[1].workedHours },
                        { x: 'march', y: this.props.stats.perMonth[2].workedHours },
                        { x: 'April', y: this.props.stats.perMonth[3].workedHours },
                        { x: 'may', y: this.props.stats.perMonth[4].workedHours },
                        { x: 'June', y: this.props.stats.perMonth[5].workedHours },
                        { x: 'July', y: this.props.stats.perMonth[6].workedHours },
                        { x: 'August', y: this.props.stats.perMonth[7].workedHours },
                        { x: 'September', y: this.props.stats.perMonth[8].workedHours },
                        { x: 'October', y: this.props.stats.perMonth[9].workedHours },
                        { x: 'November', y: this.props.stats.perMonth[10].workedHours },
                        { x: 'December', y: this.props.stats.perMonth[11].workedHours },
                    ],
                    color: 'blue'
                },
                {
                    seriesName: 'delays',
                    data: [
                        { x: 'January', y: this.props.stats.perMonth[0].delays },
                        { x: 'Delays', y: this.props.stats.perMonth[1].delays },
                        { x: 'march', y: this.props.stats.perMonth[2].delays },
                        { x: 'April', y: this.props.stats.perMonth[3].delays },
                        { x: 'may', y: this.props.stats.perMonth[4].delays },
                        { x: 'June', y: this.props.stats.perMonth[5].delays },
                        { x: 'July', y: this.props.stats.perMonth[6].delays },
                        { x: 'August', y: this.props.stats.perMonth[7].delays },
                        { x: 'September', y: this.props.stats.perMonth[8].delays },
                        { x: 'October', y: this.props.stats.perMonth[9].delays },
                        { x: 'November', y: this.props.stats.perMonth[10].delays },
                        { x: 'December', y: this.props.stats.perMonth[11].delays },
                    ],
                    color: '#BE4242'
                },
            ];

            return (

                <Container style={{ backgroundColor: '#021630' }}>
                    <StatusBar hidden />

                    <Header style={{ backgroundColor: '#021630', flexDirection: 'row' }}>
                        <Icon name='md-menu' style={{
                            color: 'white', position: 'absolute',
                            left: 20, top: 15
                        }}
                            onPress={() => this.props.navigation.openDrawer()}
                        />
                        <Title style={{ top: 15 }}>{this.props.user.displayName}</Title>
                        {/* <NotificationsBell userId={this.state.connectedUser && this.state.connectedUser.userId} /> */}
                    </Header>
                    <View>
                        <Picker
                            selectedValue={this.state.year}
                            style={{
                                height: 50,
                                width: 340,
                                alignSelf: 'center',
                                marginTop: 10,
                                marginBottom: 10,
                                borderWidth: 1,
                                borderColor: '#021630',
                                color: 'white',
                                backgroundColor: '#082955'
                            }}
                            onValueChange={(itemValue, itemIndex) => this.fetchAttendees(itemValue)}>
                            <Picker.Item label="Current year" value="2019" color="#021630"
                                style={{ alignSelf: "center", backgroundColor: 'red' }} />
                            <Picker.Item label="2018" value="2018" color="#021630" />
                            <Picker.Item label="All years" value={null} color="#021630" />



                        </Picker>
                    </View>

                    {/* <SearchableDropdown
                    onTextChange={(itemValue, itemIndex) =>
                        this.setState({ year: itemValue })}
                    onItemSelect={
                        (itemValue, itemIndex) =>
                            this.setState({ year: JSON.stringify((itemValue.id)) })
                    }
                    containerStyle={{ padding: 5 }}
                    textInputStyle={{
                        padding: 12,
                        borderWidth: 1,
                        borderColor: '#021630',
                        fontSize: 18,
                        width: 340,
                        alignSelf: 'center',
                        color: 'white',
                        backgroundColor: '#082955'
                    }}
                    itemStyle={{
                        padding: 10,
                        marginTop: 2,
                        backgroundColor: '#4986B9',
                        borderColor: '#082955',
                        borderWidth: 1,
                        width: 340,
                        alignSelf: 'center',
                    }}
                    itemTextStyle={{ color: 'white' }}
                    itemsContainerStyle={{ maxHeight: 140 }}
                    items={items}
                    // defaultIndex={3}
                    placeholder="Current year"
                    resetValue={false}
                    underlineColorAndroid="transparent"
                /> */}

                    <Content  >
                        <View  >
                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                <Button badge vertical style={{
                                    backgroundColor: '#082955', borderRadius: 20
                                    , width: 170, marginRight: 5, marginBottom: 10, left: 4, top: 5
                                }}>
                                    <Badge style={{ backgroundColor: '#3F7930', top: -10 }}>
                                        <Text>{this.state.workedHours}</Text>
                                    </Badge>
                                    <Text style={{ color: 'white' }}>Hours worked</Text>
                                </Button>
                                <Button badge vertical style={{
                                    borderRadius: 20,
                                    backgroundColor: '#082955', width: 164, marginRight: 5, marginBottom: 10, left: 4, top: 5
                                }}>
                                    <Badge style={{
                                        backgroundColor: '#3F7930', top: -10
                                    }} ><Text>{this.props.attendances && this.props.attendances.length}</Text></Badge>
                                    <Text style={{ color: 'white' }} >Days worked</Text>
                                </Button>


                            </View>

                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                <Button badge vertical style={{
                                    marginRight: 6, marginBottom: 10, backgroundColor: '#082955', width: 230, top: 5, borderRadius: 20
                                }}>
                                    <Badge style={{ backgroundColor: '#3F7930', top: -10 }}><Text>{this.state.workedHours && this.state.daysWorked && (this.state.workedHours / this.state.daysWorked).toFixed(2)}</Text></Badge>
                                    <Text style={{ color: 'white' }} >Average working hours</Text>
                                </Button>
                                <Button badge vertical style={{
                                    backgroundColor: '#082955', marginBottom: 10, width: 104, top: 5, borderRadius: 20
                                }}>
                                    <Badge style={{ backgroundColor: '#E82C2C', top: -10 }}><Text>{this.state.delays && this.state.delays}</Text></Badge>
                                    <Text style={{ color: 'white' }} >Delays</Text>
                                </Button>
                            </View>


                            <Card style={styles.lineChart} >
                                {/* <View style={{ height: 200, flexDirection: 'row' }}>
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
                                /> */}

                                <PureChart data={graphData}
                                    type='bar'
                                    backgroundColor='#082955'
                                    height={150}
                                />

                                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10, marginBottom: 10, left: 10 }}>
                                    <Text style={{ color: '#FFA14F', marginRight: 15 }}> Days worked</Text>
                                    <Text style={{ color: '#AA669A', marginRight: 15 }}> Hours worked</Text>
                                    <Text style={{ color: '#BE4242' }}> Delays</Text>
                                </View>
                            </Card>


                            {/* <CardItem>
                            <Left>
                                <Button transparent>
                                    <Image source={blueIcon} />
                                    <Text style={{ color: '#6894C7' }}>Days worked</Text>
                                </Button>
                            </Left>

                            <Body>
                                <Button transparent>
                                    <Image source={redIcon} />
                                    <Text style={{ color: '#C95C5C' }}>Hours worked</Text>
                                </Button>
                            </Body> */}

                            {/* <Right>
                                <Button backgroundColor='#F1F4FA' style={{
                                    borderRadius: 20
                                }} >
                                    <Image source={detailsIcon} style={{ right: -10 }} />
                                    <Text style={{ color: '#6FBADE' }}>Details </Text>
                                </Button>
                            </Right> */}
                            {/* </CardItem> */}

                        </View>

                        <Card style={styles.cardStyle}>
                            <Text style={{ fontSize: 18, left: -80, marginTop: 10, color: 'white', marginBottom: 20 }}>Authorizations</Text>
                            <PureChart data={sampleDataa} type='pie' />
                            <View style={{ height: 20 }}></View>
                        </Card>
                    </Content>
                </Container>
            )
        }
    }
}


const styles = StyleSheet.create({

    cardStyle: {

        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: 340,
        backgroundColor: '#082955',
        borderColor: '#082955',
        borderRadius: 20
    },

    lineChart: {
        backgroundColor: '#082955',
        borderColor: '#082955',
        paddingTop: 25,
        paddingBottom: 10,
        paddingRight: 20,
        width: 340,
        alignSelf: 'center',
        borderRadius: 20
    },

    container: {
        flex: 1,
        justifyContent: 'center'
    },

    horizontal: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
});

Dashboard.propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.shape({
        email: PropTypes.string,
        job_title: PropTypes.string,
        token: PropTypes.string,
        userId: PropTypes.number,
        username: PropTypes.string,
        displayName: PropTypes.string
    }),
    stats: PropTypes.shape({
        averageWorkingHours: PropTypes.number,
        maxHours: PropTypes.number,
        perMonth: PropTypes.array,
        totalDays: PropTypes.number,
        totalHours: PropTypes.number
    })
};

const mapStateToProps = state => {
    return {
        loading: state.loadingReducer.loading,
        user: state.authReducer.user,
        stats: state.dashboardReducer.statsReducer.stats
    }
}

const mapDispatchToProps = dispatch => ({
    getStats(year) { dispatch(getStats(year)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);