import React, { Component } from "react";
import {
    StyleSheet,
    StatusBar,
    AsyncStorage
} from "react-native";
import { Text, View, Badge, Title, Header, Content, Picker, Button } from 'native-base'
import { createBottomTabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import axios from "axios";
import { API_URL } from "../../../../config";
import Textarea from 'react-native-textarea';
import DatePicker from 'react-native-datepicker';

import { fetchDataFromAsyncStorage } from '../../../services/services';
export class checkTravels extends Component {

    constructor() {
        super();
        this.state = {
            myTravels: ['None']
        }
    };

    fetchTravels = () => {
        fetchDataFromAsyncStorage('user')
            .then(user => {
                axios.get(`${API_URL}travels?userId=${user.userId}`)
                    .then(response => {
                        console.log("TRAVELS:", response.data.travels);
                        this.setState({
                            myTravels: response.data.travels
                        });
                        return response.data.travels;
                    })
                    .catch(error => {
                        console.log(error);
                        return null;
                    });
            })
            .catch(error => {
                console.log("No user found");
            });
    }

    // componentDidUpdate() {
        
    // }

    componentWillMount() {
        this.fetchTravels();
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden />

                <Header style={{ backgroundColor: '#021630', flexDirection: 'row' }}>
                    <Icon name='md-menu' size={27} style={{
                        color: 'white', position: 'absolute',
                        left: 20, top: 15
                    }}
                        onPress={() => this.props.navigation.openDrawer()}
                    />
                    <Title style={{ top: 15 }}>My Travels</Title>

                    <View style={{ position: 'absolute', right: 20 }}>
                        <Badge style={{ top: 10, right: -10, zIndex: 1 }}><Text>2</Text></Badge>
                        <Icon size={27} active name="md-notifications" style={{ color: 'white', top: -10 }} />
                    </View>

                </Header>

                <Content>
                    <View>
                        {
                            this.state.myTravels && this.state.myTravels.map((item, index) => {
                                return (
                                    <Text key={index} style={{ color: 'white' }}>{item.destinationAdress}</Text>
                                )
                            })
                        }
                    </View>
                </Content>

            </View>
        );
    }
}

export class createTravel extends Component {
    constructor() {
        super();
        this.state = {
            travelType: '',
            conductor: '',
            startDate: null,
            startTime: null,
            endDate: null,
            endTime: null,
            type: '',
            destinationAdress: ''
        }
    };

    resetAll = () => {
        this.setState({
            travelType: '',
            conductor: '',
            startDate: null,
            startTime: null,
            endDate: null,
            endTime: null,
            type: '',
            destinationAdress: ''
        })
    }

    handleCreateTravel = () => {
        // console.log(JSON.stringify(this.state));

        axios.post(API_URL + "travels", {
            userId: this.state.connectedUser.userId,
            ...this.state
        })
            .then((response) => {
                console.log("Navigating back to checkTravels.");
                this.props.navigation.navigate('checkTravels');
            }).catch(error => alert(error));
    }

    handleTravelTypeChange = (travelType) => {
        this.setState({
            ...this.state,
            travelType: travelType
        });
    }

    handleTypeChange = (type) => {
        this.setState({
            ...this.state,
            type: type
        });
    }

    handleConductorChange = (conductor) => {
        this.setState({
            ...this.state,
            conductor: conductor
        });
    }

    handleDateChange = (type, value) => {
        this.setState({
            ...this.state,
            startDate: type === "startdate" ? value : this.state.startDate,
            startTime: type === "starttime" ? value : this.state.startTime,
            endDate: type === "enddate" ? value : this.state.endDate,
            endTime: type === "endtime" ? value : this.state.endTime
        })
    }



    handleDestinationAdressChange = (text) => {
        this.setState({
            ...this.state,
            destinationAdress: text
        });
    }

    componentWillMount() {
        AsyncStorage.getItem("user").then(user => {

            this.setState({
                connectedUser: JSON.parse(user)
            });
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden />

                <Header style={{ backgroundColor: '#021630', flexDirection: 'row' }}>
                    <Icon name='md-menu' size={27} style={{
                        color: 'white', position: 'absolute',
                        left: 20, top: 15
                    }}
                        onPress={() => this.props.navigation.openDrawer()}
                    />
                    <Title style={{ top: 15 }}>My Travels</Title>

                    <View style={{ position: 'absolute', right: 20 }}>
                        <Badge style={{ top: 10, right: -10, zIndex: 1 }}><Text>2</Text></Badge>
                        <Icon size={27} active name="md-notifications" style={{ color: 'white', top: -10 }} />
                    </View>
                </Header>
                <Content>
                    <View >
                        <Text style={styles.textStyle} >
                            Type
                          </Text>
                        <View style={styles.list}>
                            <Picker
                                selectedValue={this.state.travelType}
                                style={{
                                    height: 50, width: 300, backgroundColor: '#345B8E', color: 'white',
                                    borderColor: '#345B8E'
                                }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.handleTravelTypeChange(itemValue)
                                }>
                                <Picker.Item label="Local" value="Local" />
                                <Picker.Item label="Abroad" value="Abroad" />
                            </Picker>
                        </View>
                    </View>


                    <View>
                        <Text style={styles.textStyle} >
                            Conductor
                             </Text>
                        <View style={styles.list}>
                            <Picker
                                selectedValue={this.state.conductor}
                                style={{
                                    height: 50, width: 300, backgroundColor: '#345B8E',
                                    borderColor: '#345B8E', color: 'white'
                                }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.handleConductorChange(itemValue)
                                }>
                                <Picker.Item label="aaaa" value="aaaa" />
                                <Picker.Item label="bbbb" value="bbbb" />
                                <Picker.Item label="cccc" value="cccc" />
                            </Picker>
                        </View>
                    </View>


                    <View>
                        <Text style={styles.textStyle}>
                            From
                  </Text>
                        <DatePicker
                            style={{ width: 300, alignSelf: 'center', marginBottom: 10 }}
                            date={this.state.startDate}
                            mode="date"
                            iconSource={null}
                            placeholder="Select date"
                            format="DD-MM-YYYY"
                            minDate="01-01-2019"
                            maxDate="31-12-2019"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0,
                                },
                                dateInput: {
                                    marginTop: 10,
                                    backgroundColor: '#345B8E',
                                    borderColor: '#345B8E'

                                },
                            }}
                            onDateChange={(date) => { this.handleDateChange("startdate", date) }} />
                        <DatePicker
                            style={{ width: 300, alignSelf: 'center', marginBottom: 10 }}
                            date={this.state.startTime}
                            placeholder="Select time"
                            iconSource={null}
                            mode="time"
                            format="HH:mm"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            minuteInterval={10}
                            headerBackground="red"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0,
                                },
                                dateInput: {
                                    marginTop: 10,
                                    backgroundColor: '#345B8E',
                                    borderColor: '#345B8E'
                                },
                            }}
                            onDateChange={(time) => { this.handleDateChange("starttime", time) }}
                        />
                    </View>
                    <View>
                        <Text style={styles.textStyle}>
                            To
                             </Text>
                        <DatePicker
                            style={{ width: 300, alignSelf: 'center', marginBottom: 10 }}
                            date={this.state.endDate}
                            mode="date"
                            iconSource={null}
                            placeholder="Select date"
                            format="DD-MM-YYYY"
                            minDate="01-01-2019"
                            maxDate="31-12-2019"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0,
                                },
                                dateInput: {
                                    marginTop: 10,
                                    backgroundColor: '#345B8E',
                                    borderColor: '#345B8E'
                                },
                            }}
                            onDateChange={(date) => { this.handleDateChange("enddate", date) }}
                        />
                        <DatePicker
                            style={{ width: 300, alignSelf: 'center', marginBottom: 10 }}
                            date={this.state.endTime}
                            placeholder="Select time"
                            mode="time"
                            format="HH:mm"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            minuteInterval={10}
                            iconSource={null}

                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0,
                                },
                                dateInput: {
                                    marginTop: 10,
                                    backgroundColor: '#345B8E',
                                    borderColor: '#345B8E'
                                },
                            }}
                            onDateChange={(time) => { this.handleDateChange("endtime", time) }}
                        />
                    </View>



                    <View>
                        <Text style={styles.textStyle} >
                            Type
                </Text>
                        <View style={styles.list}>
                            <Picker
                                selectedValue={this.state.type}
                                style={{
                                    height: 50, width: 300, backgroundColor: '#345B8E', color: 'white',
                                    borderColor: '#345B8E'
                                }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.handleTypeChange(itemValue)
                                }>
                                <Picker.Item label="Administration" value="Administration" />
                                <Picker.Item label="Customer" value="Customer" />
                                <Picker.Item label="Business development" value="Business development" />
                                <Picker.Item label="Visa" value="Visa" />
                                <Picker.Item label="Other" value="Other" />
                            </Picker>
                        </View>


                        <View>
                            <Text style={styles.textStyle} >Destination adress</Text>
                            <Textarea
                                style={styles.textareaContainer}
                                onChangeText={(text) => this.handleDestinationAdressChange(text)} defaultValue={this.state.text}
                                placeholderTextColor={'white'}
                                defaultValue={this.state.destinationAdress}

                            />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', position: 'absolute', bottom: 40, alignSelf: 'center' }}>
                        <Button light
                            style={{ width: 150, marginRight: 20, width: 140, backgroundColor: '#2C9562' }}
                            onPress={() => this.handleCreateTravel()}                                >
                            <Text style={{ color: 'white', left: 35 }}>Save</Text>
                        </Button>
                        <Button light style={{ width: 150, width: 140, backgroundColor: '#D15433', }}
                            onPress={() => this.resetAll()} >
                            <Text style={{ color: 'white', left: 30 }} >Reset</Text>
                        </Button>
                    </View>
                </Content>

            </View>
        );
    }
}
export default createBottomTabNavigator({
    checkTravels: {
        screen: checkTravels,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: 'Check my travels',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-eye" color={tintColor} size={24} />
            )
        })
    },
    createTravel: {
        screen: createTravel,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: 'Create a new travel',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-create" color={tintColor} size={24} />
            )
        })
    }


}, {
        initialRouteName: 'checkTravels',
        order: ['checkTravels', 'createTravel'],
        swipeEnabled: true,
        animationEnabled: true,
        navigationOptions: {
            tabBarVisible: true
        },
        tabBarOptions: {
            activeTintColor: '#D6EAF8',
            inactiveTintColor: 'white',
            activeBackgroundColor: '#092448',
            inactiveBackgroundColor: '#021630',
        },
    });

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#021630'
    },
    list: {
        borderWidth: 1,
        width: 300,
        alignItems: 'center',
        borderColor: 'black',
        margin: 10,
        alignSelf: 'center'
    },
    textStyle: {
        left: 40,
        color: 'white',
        marginTop: 10
    },
    textareaContainer: {
        borderWidth: 1,
        width: 300,
        height: 40,
        borderColor: '#345B8E',
        backgroundColor: '#345B8E',
        marginTop: 10,
        alignSelf: 'center'
    },
});