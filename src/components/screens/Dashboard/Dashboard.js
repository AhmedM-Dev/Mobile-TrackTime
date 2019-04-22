import React from 'react';
import axios from "axios";
import { StyleSheet, StatusBar, AsyncStorage } from 'react-native';
import { Container, Content, Card, CardItem, Text, Button, Left, Body, Right, View, Picker, Footer, FooterTab, Badge, Icon, Header, Title } from 'native-base';
import SearchableDropdown from 'react-native-searchable-dropdown';
import PureChart from 'react-native-pure-chart';
import Speedometer from 'react-native-speedometer-chart';

import getHoursDelays from "../../../utils/getHoursDelays";
import getHoursOfWork from "../../../utils/timeDiff";

import { API_URL } from "../../../../config";

import HttpClient from '../../../services/HttpClient';
import { fetchDataFromAsyncStorage } from '../../../services/services';

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

export default class Dashboard extends React.Component {
    state = {
        connectedUser: null,
        year: 'Current year',
        daysWorked: 0,
        workedHours: 0,
        delays: 0,
        averageWorkHours: 0,
        byMonth: null,
    }

    getConnectedUser = async () => {
        await console.log("CONNECTED USER:", AsyncStorage.getItem("user"));
    }

    componentWillMount() {
        console.log("fetchDataFromAsyncStorage", fetchDataFromAsyncStorage('user'));
        fetchDataFromAsyncStorage('user')
        .then(user => {
            console.log("LOGGED", user);
            
            let connected = user;

            console.log("CONNECTED:", connected.userId);

            axios.get(API_URL + "attendances?userId=" + (connected && connected.userId))
                .then((response) => {
                    console.log("ATTENDANCES:", response.data.attendances);

                    let byMonth = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

                    byMonth.map((month, i) => {
                        let hd = getHoursDelays(response.data.attendances.filter(item => new Date(item.date).getMonth() == i));

                        byMonth[i] = {
                            ...hd,
                            workedDays: response.data.attendances.filter(item => new Date(item.date).getMonth() == i).length
                        }

                    });

                    console.log("BY MONTH:", byMonth);

                    let graphData = [
                        // chartConfig={
                        //     backgroundColor: 'red'
                        //   },
                        {
                            seriesName: 'days',
                            data: [
                                { x: 'January', y: byMonth[0].workedDays },
                                { x: 'February', y: byMonth[1].workedDays },
                                { x: 'march', y: byMonth[2].workedDays },
                                { x: 'April', y: byMonth[3].workedDays },
                                { x: 'may', y: byMonth[4].workedDays },
                                { x: 'June', y: byMonth[5].workedDays },
                                { x: 'July', y: byMonth[6].workedDays },
                                { x: 'August', y: byMonth[7].workedDays },
                                { x: 'September', y: byMonth[8].workedDays },
                                { x: 'October', y: byMonth[9].workedDays },
                                { x: 'November', y: byMonth[10].workedDays },
                                { x: 'December', y: byMonth[11].workedDays },

                            ],
                            color: '#FEFF9D'

                        },
                        {
                            seriesName: 'hours',
                            data: [
                                { x: 'January', y: byMonth[0].workedHours },
                                { x: 'February', y: byMonth[1].workedHours },
                                { x: 'march', y: byMonth[2].workedHours },
                                { x: 'April', y: byMonth[3].workedHours },
                                { x: 'may', y: byMonth[4].workedHours },
                                { x: 'June', y: byMonth[5].workedHours },
                                { x: 'July', y: byMonth[6].workedHours },
                                { x: 'August', y: byMonth[7].workedHours },
                                { x: 'September', y: byMonth[8].workedHours },
                                { x: 'October', y: byMonth[9].workedHours },
                                { x: 'November', y: byMonth[10].workedHours },
                                { x: 'December', y: byMonth[11].workedHours },
                            ],
                            color: '#E7B5D6'
                        },
                        {
                            seriesName: 'delays',
                            data: [
                                { x: 'January', y: byMonth[0].delays },
                                { x: 'February', y: byMonth[1].delays },
                                { x: 'march', y: byMonth[2].delays },
                                { x: 'April', y: byMonth[3].delays },
                                { x: 'may', y: byMonth[4].delays },
                                { x: 'June', y: byMonth[5].delays },
                                { x: 'July', y: byMonth[6].delays },
                                { x: 'August', y: byMonth[7].delays },
                                { x: 'September', y: byMonth[8].delays },
                                { x: 'October', y: byMonth[9].delays },
                                { x: 'November', y: byMonth[10].delays },
                                { x: 'December', y: byMonth[11].delays },
                            ],
                            color: '#F2CE90'
                        },
                    ];

                    this.setState({
                        ...this.state,
                        byMonth: byMonth,
                        daysWorked: response.data.attendances.length,
                        workedHours: getHoursDelays(response.data.attendances) && getHoursDelays(response.data.attendances).workedHours,
                        delays: getHoursDelays(response.data.attendances) && getHoursDelays(response.data.attendances).delays,
                        connectedUser: user,
                        graphData: graphData
                    })
                });
        })
        .catch(error => console.log(error));
    }

    render() {


        let sampleDataa = [
            {
                value: 50,
                label: 'Refused',
                color: '#E04415',
            }, {
                value: 40,
                label: 'Canceled',
                color: '#CBC93B'
            }, {
                value: 25,
                label: 'Accepted',
                color: '#1A9E00'
            },
            {
                value: 10,
                label: 'On hold',
                color: '#15BFC2'
            }

        ]


        return (

            <Container style={{ backgroundColor: '#13446E' }}>
                <StatusBar hidden />

                <Header style={{ backgroundColor: '#13446E', flexDirection: 'row' }}>
                    <Icon name='md-menu' style={{
                        color: 'white', position: 'absolute',
                        left: 20, top: 15
                    }}
                        onPress={() => this.props.navigation.openDrawer()}
                    />
                    <Title style={{ top: 15 }}>Dashboard</Title>
                    <View style={{ position: 'absolute', right: 20 }}>
                        <Badge style={{ top: 10, right: -10, zIndex: 1 }}><Text>2</Text></Badge>
                        <Icon active name="md-notifications" style={{ color: 'white', top: -10 }} />
                    </View>
                </Header>
                {/* <View>
                    <Picker
                        selectedValue={this.state.year}
                        style={{ height: 50, width: 300 , alignSelf:'center'}}
                        textStyle={{ color: "white" }}

                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ year: itemValue })
                        }>
                        <Picker.Item label="Current year" value="2019" />
                        <Picker.Item label="2018" value="2018" />
                        <Picker.Item label="All years" value="All years" />
                        
                        
                        </Picker>
                    </View> */}

                <SearchableDropdown
                    // onTextChange={(itemValue, itemIndex) =>
                    //     this.setState({ year: itemValue })}
                    onItemSelect={
                        (itemValue, itemIndex) =>
                            this.setState({ year: JSON.stringify((itemValue.id)) })
                    }
                    containerStyle={{ padding: 5 }}
                    textInputStyle={{
                        padding: 12,
                        borderWidth: 1,
                        borderColor: '#13446E',
                        fontSize: 18,
                        width: 340,
                        alignSelf: 'center',
                        color: 'white',
                        backgroundColor: '#245E8F'
                    }}
                    itemStyle={{
                        padding: 10,
                        marginTop: 2,
                        backgroundColor: '#4986B9',
                        borderColor: '#245E8F',
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
                />

                <Content  >

                    <View  >



                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                            <Button badge vertical style={{ backgroundColor: '#245E8F', width: 170, marginRight: 5, marginBottom: 10, left: 4, top: 5 }}>
                                <Badge style={{ backgroundColor: '#2EC41F', top: -10 }}><Text>{this.state.workedHours && this.state.workedHours}</Text></Badge>
                                <Text style={{ color: 'white' }}>Hours worked</Text>
                            </Button>
                            <Button badge vertical style={{ backgroundColor: '#245E8F', width: 164, marginRight: 5, marginBottom: 10, left: 4, top: 5 }}>
                                <Badge style={{
                                    backgroundColor: '#2EC41F', top: -10
                                }} ><Text>{this.state.daysWorked && this.state.daysWorked}</Text></Badge>
                                <Text style={{ color: 'white' }} >Days worked</Text>
                            </Button>


                        </View>

                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                            <Button badge vertical style={{ marginRight: 6, marginBottom: 10, backgroundColor: '#245E8F', width: 230, top: 5 }}>
                                <Badge style={{ backgroundColor: '#2EC41F', top: -10 }}><Text>{this.state.workedHours && this.state.daysWorked && (this.state.workedHours / this.state.daysWorked).toFixed(2)}</Text></Badge>
                                <Text style={{ color: 'white' }} >Average working hours</Text>
                            </Button>
                            <Button badge vertical style={{ backgroundColor: '#245E8F', marginBottom: 10, width: 104, top: 5 }}>
                                <Badge style={{ backgroundColor: '#E82C2C', top: -10 }}><Text>{this.state.delays && this.state.delays}</Text></Badge>
                                <Text style={{ color: 'white' }} >Delays</Text>
                            </Button>
                        </View>


                        <Card style={styles.lineChart} >
                            {this.state.graphData && <PureChart data={this.state.graphData}
                                type='bar'
                                backgroundColor='#245E8F'
                            />}
                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                <Text style={{ color: '#FEFF9D', marginRight: 20 }}> Days worked</Text>
                                <Text style={{ color: '#E7B5D6', marginBottom: 10, marginRight: 20 }}> Hours worked</Text>
                                <Text style={{ color: '#F2CE90', marginBottom: 10 }}> Delays</Text>
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



                    {/* <View style={styles.cardStyle}  >
                        <Text style={{ fontSize: 18, marginTop:10 , marginBottom:10,color:'white' , left:-80}}>Average grade</Text>
                        <View >
                            <Speedometer
                                value={13}
                                totalValue={20}
                                size={250}
                                outerColor="#C2ECD4"
                                internalColor="#327951"
                                showText
                                text="13.00"
                                textStyle={{ color: '#297AB1' }}
                                showLabels
                                labelStyle={{ color: '#327951' }}
                                showPercent
                                percentStyle={{ color: '#327951' }}
                            /></View>
                    </View> */}

                </Content>


            </Container>
        );
    }
}


const styles = StyleSheet.create({

    cardStyle: {

        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: 340,
        backgroundColor: '#245E8F',
        borderColor: '#245E8F'
    },

    lineChart: {
        backgroundColor: '#245E8F',
        borderColor: '#245E8F',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        width: 340,
        alignSelf: 'center',

    },

}
);