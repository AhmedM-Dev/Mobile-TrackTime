import React from 'react';
import { StatusBar, StyleSheet, AsyncStorage, ImageBackground } from 'react-native';
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
} from 'native-base';
import DatePicker from 'react-native-datepicker';
import Textarea from 'react-native-textarea';
import timeIcon from '../../../assets/img/Time.png';
import dateIcon from '../../../assets/img/date.png';

import axios from "axios";

import { API_URL } from "../../../../config";

export default class Events extends React.Component {
    constructor() {
        super();
        this.state = {
            PickerValue: '',
            startDate: null,
            startTime: null,
            endDate: null,
            endTime: null,
            category: "Paid leave",
            motif: ''
        }
    };

    resetAll = () => {
        this.setState({
            PickerValue: '',
            startDate: null,
            startTime: null,
            endDate: null,
            endTime: null,
            category: "Paid leave",
            motif: ''
        })
      }

    handleCreateRequest = () => {
        // console.log(JSON.stringify(this.state));

        axios.post(API_URL + "requests", {
            userId: this.state.connectedUser.userId,
            ...this.state
        })
            .then((response) => {
                console.log(response.data);
            }).done();
    }

    handleCategoryChange = (category) => {
        this.setState({
            ...this.state,
            category: category
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

    handleMotifChange = (text) => {
        this.setState({
            ...this.state,
            motif: text
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
            <Container style={{ backgroundColor: '#021630' }} >
                <StatusBar hidden />

                <Header style={{ backgroundColor: '#021630', flexDirection: 'row' }}>
                    <Icon name='md-menu' style={{
                        color: 'white', position: 'absolute',
                        left: 20, top: 15
                    }}
                        onPress={() => this.props.navigation.openDrawer()}
                    />
                    <Title style={{ top: 15 }}>New request</Title>

                    <View style={{ position: 'absolute', right: 20 }}>
                        <Badge style={{ top: 10, right: -10, zIndex: 1 }}><Text>2</Text></Badge>
                        <Icon active name="md-notifications" style={{ color: 'white', top: -10 }} />
                    </View>
                </Header>

                <Content>

                            <View >
                                <Text style={styles.textStyle} >
                                    Category <Text style={{color:'red' , zIndex:555}}> * </Text>
                                 </Text>
                                <View style={styles.autorisationList}>
                                    <Picker
                                        selectedValue={this.state.category}
                                        style={{ height: 50, width: 300 , color:'white' , alignSelf:'center' , }}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.handleCategoryChange(itemValue)
                                        }>
                                        <Picker.Item label="Paid leave" value="Paid leave" />
                                        <Picker.Item label="Additional days" value="Additional days" />
                                        <Picker.Item label="Unpaid leave" value="Unpaid leave" />
                                        <Picker.Item label="Sick leave" value="Sick leave" />
                                        <Picker.Item label="Paternity leave" value="Paternity leave" />
                                        <Picker.Item label="Maternity leave" value="Maternity leave" />
                                        <Picker.Item label="Wedding leave" value="Wedding leave" />
                                        <Picker.Item label="Son's circumcision " value="Son's circumcision " />
                                        <Picker.Item label="Son's/Daughter's wedding" value="Son's/Daughter's wedding" />
                                        <Picker.Item label="Spouse's death" value="Spouse's death" />
                                        <Picker.Item label="Mother's/Father's death" value="Mother's/Father's death" />
                                        <Picker.Item label="Son's/Daughter's death" value="Son's/Daughter's death" />
                                        <Picker.Item label="Brother's/Sister's death" value="Brother's/Sister's death" />
                                        <Picker.Item label="Grandfather's/Grandmother's death" value="Grandfather's/Grandmother's death" />
                                        <Picker.Item label="Other" value="Other" />
                                    </Picker>
                                </View>
                            </View>
                            <View >
                                <Text style={styles.textStyle}>
                                    From <Text style={{color:'red' , zIndex:555}}> * </Text>
                               </Text>
                                <DatePicker
                                    style={{ width: 300, alignSelf: 'center', marginBottom: 10 ,  }}
                                    date={this.state.startDate}
                                    mode="date"
                                    iconSource={null}
                                    placeholder="Select date"
                                    format="DD-MM-YYYY"
                                    minDate="01-01-2019"
                                    textStyle={
{                                        color:'white'
}                                    }
                                    maxDate="31-12-2019"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 20,
                                            top: 4,
                                            marginLeft: 0
                                        },
                                        dateInput: {
                                            backgroundColor: '#345B8E',
                                            borderColor: '#345B8E',
                                            marginTop:10,
                                        }
                                    }}
                                    onDateChange={(date) => { this.handleDateChange("startdate", date) }}
                                />

                                <DatePicker
                                    style={{ width: 300, alignSelf: 'center' }}
                                    date={this.state.startTime}
                                    placeholder="Select time"
                                    iconSource={null}
                                    mode="time"
                                    format="HH:mm"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    minuteInterval={10}

                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 0
                                        },
                                        dateInput: {
                                            backgroundColor: '#345B8E',
                                            borderColor: '#345B8E'
                                        }
                                    }}
                                    onDateChange={(time) => { this.handleDateChange("starttime", time) }}
                                />
                            </View>
                            <View >
                                <Text style={styles.textStyle}>
                                    To <Text style={{color:'red' , zIndex:555}}> * </Text>
                              </Text>
                                <DatePicker
                                    style={{ width: 300, alignSelf: 'center', marginBottom: 10, marginTop: 10 }}
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
                                            marginLeft: 0
                                        },
                                        dateInput: {
                                            backgroundColor: '#345B8E',
                                            borderColor: '#345B8E'
                                        }
                                    }}
                                    onDateChange={(date) => { this.handleDateChange("enddate", date) }}
                                />
                                <DatePicker
                                    style={{ width: 300, alignSelf: 'center' }}
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
                                            marginLeft: 0
                                        },
                                        dateInput: {
                                            backgroundColor: '#345B8E',
                                            borderColor: '#345B8E'
                                        }
                                    }}
                                    onDateChange={(time) => { this.handleDateChange("endtime", time) }}
                                />
                            </View>
                            <View >
                                <Text style={styles.textStyle}>
                                Motif </Text>
                                <Textarea
                                    style={styles.textareaContainer}
                                    onChangeText={(text) => this.handleMotifChange(text)}
                                    defaultValue={this.state.motif}
                                    placeholderTextColor={'black'}
                                />

                            </View>

                            <View style={{ flexDirection: 'row', position: 'absolute', bottom: 10, alignSelf:'center' }}>
                                <Button light
                                    style={{ width: 150, marginRight: 20, width: 140, backgroundColor: '#2C9562' }}
                                    onPress={() => this.handleCreateRequest()}
                                >
                                    <Text style={{ color: 'white', left: 35 }}>Send</Text>
                                </Button>
                                <Button light style={{ width: 150,  width: 140, backgroundColor: '#D15433',}}
                                             onPress={() => this.resetAll()}  >
                                    <Text style={{ color: 'white', left: 30 }} >Reset</Text>
                                </Button>
                            </View>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({


    cardStyle: {
        marginTop:10,
        padding:10,
        alignSelf: 'center',
        width: 340,
        backgroundColor: '#345B8E',
        borderColor: '#345B8E'
    },

    autorisationList: {
        borderWidth: 1,
        width: 300,
        margin: 10,
        borderColor:'#345B8E',
        backgroundColor:'#345B8E',
        alignSelf:'center',
    },
    textStyle: {
        left: 40,
        color:'white',
        marginTop:10
    },
    textareaContainer: {
        borderWidth: 1,
        width: 300,
        height: 80,
        position: 'relative',
        marginTop:10,
        padding: 5,
        backgroundColor: '#345B8E',
        borderColor: '#345B8E',
        alignSelf: 'center',
        color:'white'
    },

});