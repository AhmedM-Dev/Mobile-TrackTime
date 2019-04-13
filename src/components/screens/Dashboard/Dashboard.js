import React from 'react';
import {
    Image, StyleSheet, StatusBar, AsyncStorage
} from 'react-native';
import {
    Container,
    Content,
    Card,
    CardItem,
    Text,
    Button,
    Left,
    Body,
    Right,
    View,
    Picker,
    Footer,
    FooterTab,
    Badge, Icon, Header, Title,

} from 'native-base';
import { API_URL } from "../../../../config";

import detailsIcon from '../../../assets/img/details.png'
import blueIcon from '../../../assets/img/blue.png'
import redIcon from '../../../assets/img/red.png'
import PureChart from 'react-native-pure-chart';
import Speedometer from 'react-native-speedometer-chart';

import getHoursOfWork from "../../../utils/timeDiff";
import getHoursDelays from "../../../utils/getHoursDelays";

import axios from "axios";

export default class Dashboard extends React.Component {

    state = {
        connectedUser: null,
        PickerValue: '',
        daysWorked: 0,
        workedHours: 0,
        delays: 0,
        averageWorkHours: 0,
        byMonth: new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    }

    // getConnectedUser = async () => {
    //     await console.log("CONNECTED USER:", AsyncStorage.getItem("user"));
    // }

    static getDerivedStateFromProps(props, state) {
        if (state.connectedUser === null) {
            AsyncStorage.getItem("user").then(user => {
                console.log("LOGGED", user);
                return {
                    ...state,
                    connectedUser: user
                }
            }).done();
        }
        return null;
    }

    componentDidMount() {

        console.log("USER ID", this.state.connectedUser);

        axios.get(API_URL + "attendances?userId=" + (this.state.connectedUser && this.state.connectedUser.userId))
            .then((response) => {
                console.log("ATTENDANCES:", response.data.attendances);

                // let byMonth = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

                // byMonth.map((month, i) => {
                //     byMonth[i] = getHoursDelays(response.data.attendances.filter(item => new Date(item.date).getMonth() == i))
                // });

                // console.log("BY MONTH:", byMonth);

                this.setState({
                    ...this.state,
                    daysWorked: response.data.attendances.length,
                    workedHours: getHoursDelays(response.data.attendances) && getHoursDelays(response.data.attendances).workedHours,
                    delays: getHoursDelays(response.data.attendances) && getHoursDelays(response.data.attendances).delays
                })
            });


    }

    render() {
        // diag1

        let sampleData = [
            {
                seriesName: 'series1',
                data: [
                    { x: 'march', y: 30 },
                    { x: 'April', y: 20 },
                    { x: 'may', y: 10 },
                    { x: 'June', y: 10 },
                    { x: 'July', y: 10 },
                    { x: 'August', y: 30 },
                    { x: 'September', y: 30 },
                    { x: 'October', y: 30 },
                    { x: 'November', y: 30 },
                    { x: 'December', y: 30 },

                ],
                color: '#6894C7'
            },
            {
                seriesName: 'series2',
                data: [
                    { x: 'January', y: 400 },
                    { x: 'February', y: 300 },
                    { x: 'march', y: 503 },
                    { x: 'April', y: 170 },
                    { x: 'may', y: 400 },
                    { x: 'June', y: 200 },
                    { x: 'July', y: 100 },
                    { x: 'August', y: 500 },
                    { x: 'September', y: 370 },
                    { x: 'October', y: 320 },
                    { x: 'November', y: 240 },
                    { x: 'December =', y: 340 },
                ],
                color: '#C95C5C'
            }
        ]


        // diag2

        let sampleDataa = [
            {
                value: 50,
                label: 'Refused',
                color: '#BF1F43',
            }, {
                value: 40,
                label: 'Canceled',
                color: '#E4B5B5'
            }, {
                value: 25,
                label: 'Accepted',
                color: '#9BBB80'
            },
            {
                value: 10,
                label: 'On hold',
                color: '#AACDD8'
            }

        ]

        // diag4

        const dataaaa = [0.4, 0.6, 0.8]

        return (

            <Container style={{ backgroundColor: '#DDE3F3' }}>
                <StatusBar hidden />

                <Header style={{ backgroundColor: '#072F87', flexDirection: 'row' }}>
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

                <View style={styles.autorisationList}>
                    <Picker
                        selectedValue={this.state.language}
                        style={{ height: 50, width: 300 }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ language: itemValue })

                        }>
                        <Picker.Item label="Current year" value="2019" />
                        <Picker.Item label="2018" value="2018" />
                        <Picker.Item label="2017" value="2017" />
                        <Picker.Item label="All years" value="All years" />


                    </Picker>
                </View>

                <Content  >

                    <Card style={styles.cardStyle} >

                        <Text style={{ fontSize: 18, marginTop: 15, left: -100, }}> Summary </Text>

                        <CardItem>
                            <CardItem style={{ flexDirection: 'row' }}>
                                <Button badge vertical style={{ backgroundColor: 'white', width: 142, marginRight: 4 }}>
                                    <Badge style={{ backgroundColor: '#63BB93' }}><Text>{this.state.workedHours && this.state.workedHours}</Text></Badge>
                                    <Text style={{ color: 'black' }}>Hours worked</Text>
                                </Button>
                                <Button badge vertical style={{ backgroundColor: 'white', width: 140 }}>
                                    <Badge style={{ backgroundColor: '#63BB93' }} ><Text>{this.state.daysWorked && this.state.daysWorked}</Text></Badge>
                                    <Text style={{ color: 'black' }} >Days worked</Text>
                                </Button>

                            </CardItem>
                        </CardItem>
                        <CardItem style={{ flexDirection: 'row', }}>
                            <Button badge vertical style={{ marginTop: -30, marginLeft: 4, marginRight: 4, backgroundColor: 'white', width: 220 }}>
                                <Badge style={{ backgroundColor: '#63BB93' }}><Text>{this.state.workedHours && this.state.daysWorked && (this.state.workedHours / this.state.daysWorked).toFixed(2)}</Text></Badge>
                                <Text style={{ color: 'black' }} >Average working hours</Text>
                            </Button>
                            <Button badge vertical style={{ marginTop: -30, backgroundColor: 'white', width: 90 }}>
                                <Badge style={{ backgroundColor: '#DC5E5E' }}><Text>{this.state.delays && this.state.delays}</Text></Badge>
                                <Text style={{ color: 'black' }} >Delays</Text>
                            </Button>
                        </CardItem>
                        <CardItem cardBody style={styles.s}>
                            <PureChart data={sampleData} type='line' />
                        </CardItem>


                        <CardItem>
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
                            </Body>

                            {/* <Right>
                                <Button backgroundColor='#F1F4FA' style={{
                                    borderRadius: 20
                                }} >
                                    <Image source={detailsIcon} style={{ right: -10 }} />
                                    <Text style={{ color: '#6FBADE' }}>Details </Text>
                                </Button>
                            </Right> */}
                        </CardItem>

                    </Card>


                    <Card style={styles.cardStyle}>

                        <CardItem>
                            <Text style={{ fontSize: 18, left: -80 }}>Authorizations</Text>
                        </CardItem>

                        <CardItem >
                            <PureChart data={sampleDataa} type='pie' />

                        </CardItem>

                    </Card>
                    <Card style={styles.cardStyle}  >
                        <CardItem>
                            <Text style={{ fontSize: 18, left: -100 }}>Average grade</Text>
                        </CardItem>
                        <CardItem >
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
                            /></CardItem>
                    </Card>

                </Content>


            </Container>
        );
    }
}


const styles = StyleSheet.create({

    cardStyle: {

        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 5

    },

    autorisationList: {
        borderWidth: 4,
        width: 300,
        alignItems: 'center',
        margin: 15,
        backgroundColor: 'white',
        borderColor: '#DDE3F3',
        left: -16,
        marginBottom: -2,
        marginTop: 2,
        width: 362
    },

    s: {
        position: 'relative',
        left: -20,
        paddingTop: 10,
        paddingRight: 10,
        width: 300,
    },
}
);