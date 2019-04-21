import React from 'react'
import { StatusBar, StyleSheet, AsyncStorage, Image } from 'react-native'
import {
    Container,
    Content,
    Card,
    Text,
    View,
    Picker,
    Footer,
    Button,
    FooterTab,
    Badge, Icon, Header, Title, Accordion
} from 'native-base'
import axios from "axios";
import Textarea from 'react-native-textarea';
import timeIcon from '../../../assets/img/Time.png'
import dateIcon from '../../../assets/img/date.png'
import DatePicker from 'react-native-datepicker';
import { API_URL } from "../../../../config";

export default class Displacements extends React.Component {

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
        // alert(JSON.stringify(this.state));

        axios.post(API_URL + "travels", {
            userId: this.state.connectedUser.userId,
            ...this.state
        })
            .then((response) => {
                alert(response.data);
            }).done();
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
            console.log("LOGGED", JSON.parse(user));

            this.setState({
                connectedUser: JSON.parse(user)
            });
        })
    }


    render() {


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
                    <Title style={{ top: 15 }}>My Travels</Title>

                    <View style={{ position: 'absolute', right: 20 }}>
                        <Badge style={{ top: 10, right: -10, zIndex: 1 }}><Text>2</Text></Badge>
                        <Icon active name="md-notifications" style={{ color: 'white', top: -10 }} />
                    </View>
                </Header>

                <View style={{ flexDirection: 'row', alignSelf: 'center', height: 50, marginTop: 10 }}>
                    <View style={{ width: 170, backgroundColor: '#4986B9' }}></View>
                    <View style={{ width: 170, backgroundColor: '#4986B9' }}></View>
                </View>
                <Content>
                    <View style={{ width: 340, backgroundColor: '#4986B9', alignSelf: 'center' }}>
                        <View >
                            <Text style={styles.textStyle} >
                                Type
                          </Text>
                            <View style={styles.list}>
                                <Picker
                                    selectedValue={this.state.travelType}
                                    style={{
                                        height: 50, width: 300, marginTop: 10, backgroundColor: '#245E8F', color: 'white',
                                        borderColor: '#245E8F'
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
                                        height: 50, width: 300, backgroundColor: '#245E8F',
                                        borderColor: '#245E8F', color: 'white'
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
                                        backgroundColor: '#245E8F',
                                        borderColor: '#245E8F'

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
                                        backgroundColor: '#245E8F',
                                        borderColor: '#245E8F'
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
                                        backgroundColor: '#245E8F',
                                        borderColor: '#245E8F'
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
                                        backgroundColor: '#245E8F',
                                        borderColor: '#245E8F'
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
                                        height: 50, width: 300, marginTop: 10, backgroundColor: '#245E8F', color: 'white',
                                        borderColor: '#245E8F'
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
                                    placeholderTextColor={'black'}
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
                                <Text style={{ color: 'white', left: 30 }} >Cancel</Text>
                            </Button>
                        </View>
                    </View>
                </Content>
            </Container>

        )
    }
}

const styles = StyleSheet.create({

    list: {
        width: 300,
        alignItems: 'center',
        borderColor: '#245E8F',
        color: 'white',
        alignSelf: 'center'
    },
    textStyle: {
        left: 40,
        color: 'white',
        marginTop: 10
    },
    textareaContainer: {
        width: 300,
        height: 40,
        marginTop: 10,
        padding: 10,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#245E8F',
        borderColor: '#245E8F',
        color: 'white'
    },
}
)