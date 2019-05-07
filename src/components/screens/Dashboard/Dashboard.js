import React from 'react';
import axios from "axios";
import { StyleSheet, StatusBar, Image } from 'react-native';
import { Container, Content, Card, Text, Button, View, Picker, Badge, Icon, Header, Title } from 'native-base';
import userPic from '../../../assets/img/userPic.jpg';
import PureChart from 'react-native-pure-chart';
import NotificationsBell from "../../ui/NotificationsBell";
import SimplePicker from 'react-native-simple-picker';
import getHoursDelays from "../../../utils/getHoursDelays";
import getHoursOfWork from "../../../utils/timeDiff";
import { API_URL } from "../../../../config";
import HttpClient from '../../../services/HttpClient';
import { fetchDataFromAsyncStorage } from '../../../services/services';
import click from '../../../assets/img/click.png'
import { TouchableHighlight } from 'react-native-gesture-handler';


const languages = ['English', 'Frensh'];


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
        year: new Date().getFullYear(),
        daysWorked: 0,
        workedHours: 0,
        delays: 0,
        averageWorkHours: 0,
        byMonth: null,

        languageSelected: 'English'
    }

    fetchAttendees = (yearFilter) => {
        this.setState({
            year: yearFilter
        });

        fetchDataFromAsyncStorage('user')
            .then(user => {

                let connected = user;

                const http = axios.create({
                    baseURL: this.baseURL,
                    timeout: 10000
                });

                http.get(`${API_URL}attendances?${yearFilter ? 'year=' + yearFilter : null}&userId=${(connected && connected.userId)}`)
                    .then((response) => {

                        let byMonth = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

                        byMonth.map((month, i) => {
                            let hd = getHoursDelays(response.data.attendances.filter(item => new Date(item.date).getMonth() == i));

                            byMonth[i] = {
                                ...hd,
                                workedDays: response.data.attendances.filter(item => new Date(item.date).getMonth() == i).length
                            }

                        });

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
                                color: '#FFA14F'
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
                                color: '#AA669A'
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
                                color: '#BE4242'
                            },
                        ];

                        console.log(getHoursDelays(response.data.attendances) && getHoursDelays(response.data.attendances).workedHours);

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

    componentDidMount() {
        this.fetchAttendees(this.state.year);
    }

    render() {


        let sampleDataa = [
            {
                value: 50,
                label: 'Refused',
                color: '#D94949',
            }, {
                value: 40,
                label: 'Canceled',
                color: '#E5DC6F'
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


        return (

            <Container style={{ backgroundColor: 'white' }}>
                <StatusBar hidden />

                <Header style={{ backgroundColor: 'white', flexDirection: 'row' }}>
                    <Icon name='md-menu' style={{
                        color: 'black', position: 'absolute',
                        left: 20, top: 15
                    }}
                        onPress={() => this.props.navigation.openDrawer()}
                    />
                    <Title style={{
                        top: 15, color: 'black', marginRight: 70, marginLeft: 15
                    }}>Dashboard</Title>

                    <TouchableHighlight onPress={() => props.navigation.navigate('Settings')} style={{
                        borderRadius: 100,
                        height: 30,
                        width: 30,
                        marginRight: 15,
                        top: 15,
                    }}>
                        <Image source={userPic} style={{
                            borderRadius: 100,
                            height: 30,
                            width: 30,
                            borderWidth: 1,
                            borderColor: 'black',
                        }}></Image>
                    </TouchableHighlight>

                    <Icon name="md-globe"
                        style={{
                            top: 13,
                            color: 'black',
                            fontSize: 34,
                            marginRight: 15,
                        }}
                        onPress={() => {
                            this.refs.picker.show();
                        }} />
                    <SimplePicker
                        ref={'picker'}
                        options={languages}
                        labels={languages}
                        itemStyle={{
                            fontSize: 25,
                            color: 'red',
                            textAlign: 'left',
                            fontWeight: 'bold',
                        }}
                        onSubmit={(languages) => {
                            this.setState({
                                languageSelected: languages,
                            });
                        }}
                    />

                    <NotificationsBell userId={this.state.connectedUser && this.state.connectedUser.userId} />
                </Header>
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        source={click}
                        style={[{ marginRight: 3, height: 30, width: 30, top: 20, left: 20 ,}]}
                    />
                    <Picker
                        selectedValue={this.state.year}
                        mode="dropdown"
                        style={{
                            height: 50,
                            width: 340,
                            alignSelf: 'center',
                            marginTop: 10,
                            marginBottom: 10,
                            color: 'black',
                            backgroundColor: 'white',
                            marginLeft: 10
                        }}
                        onValueChange={(itemValue, itemIndex) => this.fetchAttendees(itemValue)}>
                        <Picker.Item label="Current year" value="2019" color="black"
                            style={{ alignSelf: "center" }} />
                        <Picker.Item label="2018" value="2018" color="black" />
                        <Picker.Item label="All years" value={null} color="black" />
                    </Picker>
                </View>
                <Content  >

                    <View  >
                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                            <Button badge vertical style={{
                                backgroundColor: '#ECECEC', borderRadius: 20
                                , width: 170, marginRight: 5, marginBottom: 10, left: 4, top: 5
                            }}>
                                <Badge style={styles.greenBadge }>
                                    <Text>{this.state.workedHours}</Text>
                                </Badge>
                                <Text style={{ color: 'black' }}>Hours worked</Text>
                            </Button>
                            <Button badge vertical style={{
                                borderRadius: 20,
                                backgroundColor: '#ECECEC', width: 164, marginRight: 5, marginBottom: 10, left: 4, top: 5
                            }}>
                                <Badge style={
                                    styles.greenBadge
                                } ><Text>{this.state.daysWorked && this.state.daysWorked}</Text></Badge>
                                <Text style={{ color: 'black' }} >Days worked</Text>
                            </Button>
                        </View>

                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                            <Button badge vertical style={{
                                marginRight: 6, marginBottom: 10, backgroundColor: '#ECECEC', width: 230, top: 5, borderRadius: 20
                            }}>
                                <Badge style={ styles.greenBadge }><Text>{this.state.workedHours && this.state.daysWorked && (this.state.workedHours / this.state.daysWorked).toFixed(2)}</Text></Badge>
                                <Text style={{ color: 'black' }} >Average working hours</Text>
                            </Button>
                            <Button badge vertical style={{
                                backgroundColor: '#ECECEC', marginBottom: 10, width: 104, top: 5, borderRadius: 20
                            }}>
                                <Badge style={{ backgroundColor: '#E82C2C', top: -10 }}><Text>{this.state.delays && this.state.delays}</Text></Badge>
                                <Text style={{ color: 'black' }} >Delays</Text>
                            </Button>
                        </View>


                        <Card style={styles.lineChart} >
                            {this.state.graphData && <PureChart data={this.state.graphData}
                                type='bar'
                                backgroundColor='#ECECEC'
                                height={150}
                            />}
                            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10, marginBottom: 10, left: 10 }}>
                                <Text style={{ color: '#FFA14F', marginRight: 15 }}> Days worked</Text>
                                <Text style={{ color: '#AA669A', marginRight: 15 }}> Hours worked</Text>
                                <Text style={{ color: '#BE4242' }}> Delays</Text>
                            </View>
                        </Card>


                    </View>

                    <Card style={styles.cardStyle}>
                        <Text style={{ fontSize: 18, left: -80, marginTop: 10, color: 'black', marginBottom: 20 }}>Authorizations</Text>
                        <PureChart data={sampleDataa} type='pie' />
                        <View style={{ height: 20 }}></View>
                    </Card>
                </Content>
            </Container >
        );
    }
}


const styles = StyleSheet.create({

    cardStyle: {

        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: 340,
        backgroundColor: '#ECECEC',
        borderColor: '#ECECEC',
        borderRadius: 20
    },

    lineChart: {
        backgroundColor: '#ECECEC',
        borderColor: '#ECECEC',
        paddingTop: 25,
        paddingBottom: 10,
        paddingRight: 20,
        width: 340,
        alignSelf: 'center',
        borderRadius: 20


    },

    greenBadge:{
        backgroundColor: '#3F7930', top: -10
    }

}
);