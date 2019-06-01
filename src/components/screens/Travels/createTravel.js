import React, { Component } from "react";
import {
    StatusBar,
    StyleSheet,
    TextInput
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { Text, View, Content, Picker, Button, Container, Icon } from 'native-base'
import axios from "axios";
import { API_URL } from "../../../../config";
import DatePicker from 'react-native-datepicker';
import ActionButton from 'react-native-circular-action-menu';
import { connect } from 'react-redux';

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
            <Container style={styles.container} >
                <StatusBar hidden />

                <Content>


                    <View style={styles.cardStyle}>
                        <View>

                            <DatePicker
                                style={{ width: 300, alignSelf: 'center', marginBottom: 5, marginTop: 20, color: 'white' }}
                                date={this.state.startDate}
                                mode="date"
                                iconSource={null}
                                placeholder="Select begin date"
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
                                        color: this.props.theme.backgroundColor,
                                        borderColor: '#1C1C1C',
                                        borderWidth: 1,
                                        borderRadius: 20
                                    },
                                    placeholderText: {
                                        color: 'white'
                                    },
                                    dateText: {
                                        color: 'white'
                                    }
                                }}
                                onDateChange={(date) => { this.handleDateChange("startdate", date) }} />
                            <DatePicker
                                style={{ width: 300, alignSelf: 'center', marginBottom: 5 }}
                                date={this.state.startTime}
                                placeholder="Select begin time"
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
                                        backgroundColor: '#1C1C1C',
                                        borderColor: '#1C1C1C',
                                        borderWidth: 1,
                                        borderRadius: 20
                                    },
                                    placeholderText: {
                                        color: 'white'
                                    },
                                    dateText: {
                                        color: 'white'
                                    }
                                }}
                                onDateChange={(time) => { this.handleDateChange("starttime", time) }}
                            />
                        </View>
                        <View>

                            <DatePicker
                                style={{ width: 300, alignSelf: 'center', marginBottom: 5 }}
                                date={this.state.endDate}
                                mode="date"
                                iconSource={null}
                                placeholder="Select end date"
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
                                        backgroundColor: '#1C1C1C',
                                        borderColor: '#1C1C1C',
                                        borderWidth: 1,
                                        borderRadius: 20
                                    },
                                    placeholderText: {
                                        color: 'white'
                                    },
                                    dateText: {
                                        color: 'white',
                                    }
                                }}
                                onDateChange={(date) => { this.handleDateChange("enddate", date) }}
                            />
                            <DatePicker
                                style={{ width: 300, alignSelf: 'center', marginBottom: 20 }}
                                date={this.state.endTime}
                                placeholder="Select end time"
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
                                        backgroundColor: '#1C1C1C',
                                        borderColor: '#1C1C1C',
                                        borderWidth: 1,
                                        borderRadius: 20
                                    },
                                    placeholderText: {
                                        color: 'white'
                                    },
                                    dateText: {
                                        color: 'white'
                                    }
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
                                    selectedValue={this.state.travelType}
                                    style={styles.pickerStyle}
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
                                    style={styles.pickerStyle}
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
                            <Text style={styles.textStyle} >
                                Type
                             </Text>
                            <View style={styles.list}>
                                <Picker
                                    selectedValue={this.state.type}
                                    style={styles.pickerStyle}
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
                        </View>

                        <TextInput
                            name="destinationAdres"
                            onChangeText={(text) => this.handleDestinationAdressChange(text)} defaultValue={this.state.text}
                            style={styles.textareaContainer}
                            placeholder="Destination adress"
                            placeholderTextColor="white"
                            defaultValue={this.state.destinationAdress}
                        />

                        <ActionButton
                            buttonColor="transparent"
                            btnOutRange="transparent"
                            icon={<Icon name='md-arrow-dropup' style={styles.ButtonIcon} />}
                            degrees={180}
                            size={40}
                            radius={50}
                        // outRangeScale={0.5}       
                        >
                     
                            <ActionButton.Item
                                buttonColor='green'
                                title="Save"
                                onPress={() => this.handleCreateTravel()}>
                                <Icon
                                    name="md-done-all"
                                    style={styles.actionButtonIcon}

                                />
                            </ActionButton.Item>
                            <ActionButton.Item
                                buttonColor='red'
                                title="Reset"
                                onPress={() => this.resetAll()}  >
                                <Icon
                                    name="md-refresh"
                                    style={styles.actionButtonIcon} />
                            </ActionButton.Item>





                        </ActionButton>


                        {/* <View style={{ flexDirection: 'row', position: 'absolute', bottom: 40, alignSelf: 'center' }}>
                        <Button light
                            style={{ width: 150, marginRight: 20, width: 140, backgroundColor: '#2C9562' }}
                            onPress={() => this.handleCreateTravel()}                                >
                            <Text style={{ color: 'white', left: 35 }}>Save</Text>
                        </Button>
                        <Button light style={{ width: 150, width: 140, backgroundColor: '#D15433', }}
                            onPress={() => this.resetAll()} >
                            <Text style={{ color: 'white', left: 30 }} >Reset</Text>
                        </Button>
                    </View> */}

                    </View>
                </Content>

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    cardStyle: {
        marginTop: 20,
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: 340,
        backgroundColor: '#ECECEC',
        borderColor: '#ECECEC',
        borderRadius: 50
    },
    list: {
        borderWidth: 1,
        width: 300,
        alignSelf: 'center',
        marginTop: -25,
        borderRadius: 20,
        zIndex: 4,
        backgroundColor: '#1C1C1C'
    },


    pickerStyle: {
        height: 50,
        width: 300,
        color: 'white',
        backgroundColor: 'transparent',
        zIndex: 5
    },
    textStyle: {
        color: 'white',
        marginTop: 10,
        width: 300,
        paddingLeft: 10,
        top: 10,
        left: 180,
        zIndex: 2000,
        opacity: 0.3
    },
    textareaContainer: {
        borderWidth: 1,
        width: 300,
        height: 40,
        borderColor: '#1C1C1C',
        backgroundColor: '#1C1C1C',
        alignSelf: 'center',
        color: 'white',
        paddingLeft: 10,
        marginBottom: 120,
        marginTop: 5,
        borderWidth: 1,
        borderRadius: 20

    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },

    ButtonIcon: {
        fontSize: 20,
        height: 22,
        color: '#4470B2',
    },

});

const mapStateToProps = state => {
    return {
      sendingRequest: state.requestsReducer.sendingRequest,
      theme: state.settingsReducer.theme
    }
  }
  
  const mapDispatchToProps = dispatch => ({
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(createTravel);
  