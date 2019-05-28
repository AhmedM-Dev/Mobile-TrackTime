import React, { Component } from 'react';
import { StatusBar, ImageBackground, Image, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Container, Content, View, Text,  } from 'native-base'
import ActionButton from 'react-native-circular-action-menu';
import titleIcon from '../../../assets/img/titleIcon.png';
import axios from "axios";
import { API_URL } from "../../../../config";
import Background from '../../../assets/img/backgroundM.jpg';
import ImagePicker from 'react-native-image-picker';
import StyledInput from '../../ui/Input/addEventInput';
import DatePicker from 'react-native-datepicker';
import motifIcon from '../../../assets/img/detailsIcon.png'
import priceIcon from '../../../assets/img/priceIcon.png'
import { Button } from 'react-native-elements';
import  Textarea  from 'react-native-textarea'



export default class updateEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
    
        }
    }
   

    render() {
        return (
            <View style={styles.container} >
                <Content>
                    <Icon
                        name="md-arrow-dropleft"
                        style={{
                            color: 'black',
                            margin: 15,
                            top:10,
                        }}
                        onPress={() => this.props.navigation.navigate('Administration')} />


                    <View style={{marginTop:10}}>

                    <Button
              icon={
                <Icon
                  name="md-log-out"
                  style={{ color: 'white', marginRight: 10, fontSize: 18 , left:-81 }}
                />
              }
              buttonStyle={{
                backgroundColor: 'black',
                borderRadius: 20,
                borderColor:'white',
                borderWidth: 2 ,
                width: 300,
                alignSelf: 'center',
                marginBottom:5
              }}
              titleStyle={{
                 color:'white'
              }}
              title="Set new event image"
              onPress={() => alert('hbfud')}
            />
                        <StyledInput image={titleIcon} text={'New Title'} textColor={'white'} />
                        <View>
              <Textarea
                containerStyle={styles.textareaContainer}
                style={styles.textarea}
                // onChangeText={this.handleDetailsChange}
                defaultValue={this.state.details}
                placeholder={'Details'}
                placeholderTextColor={'white'}
                underlineColorAndroid={'transparent'}
              />
            </View>

                        <DatePicker
                            style={{ width: 300, alignSelf: 'center', marginBottom: 5, color: 'white' , marginTop:5 }}
                            date={this.state.startDate}
                            mode="date"
                            iconSource={null}
                            placeholder="New start date"

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
                                    backgroundColor: 'black',
                                    borderColor: 'gray',
                                    borderRadius:20

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
                            placeholder="New start time"
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
                                    backgroundColor: 'black',
                                    borderColor: 'gray',
                                    borderRadius:20

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


                        <DatePicker
                            style={{ width: 300, alignSelf: 'center', marginBottom: 5 }}
                            date={this.state.endDate}
                            mode="date"
                            iconSource={null}
                            placeholder="New end date"
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
                                    backgroundColor: 'black',
                                    borderColor: 'gray',
                                    borderRadius:20
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
                            style={{ width: 300, alignSelf: 'center' , marginBottom:70}}
                            date={this.state.endTime}
                            placeholder="new end time"
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
                                    borderRadius:20

                                },
                                dateInput: {
                                    marginTop: 10,
                                    backgroundColor: 'black',
                                    borderColor: 'gray',
                                    borderRadius:20

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





                    <ActionButton
                        buttonColor="black"
                        btnOutRange="#C8593C"
                        icon={<Icon name='md-arrow-dropup' style={styles.actionButtonIcon} />}
                        degrees={180}
                        size={40}
                        radius={50}

                    // outRangeScale={0.5}       
                    >

                        <ActionButton.Item
                            buttonColor='#C9CF57'
                            title="Reset"
                            onPress={() => alert('refresh')} >
                            <Icon
                                name="md-refresh"
                                style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        <ActionButton.Item
                            buttonColor='#006B4C'
                            title="Save"
                            onPress={() => { this.handleAddUser() }}>
                            <Icon
                                name="md-done-all"
                                style={styles.actionButtonIcon}

                            />
                        </ActionButton.Item>
                    </ActionButton>
                </Content>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#E7E7E7',
    },


    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',

    },

    instructions2: {
        color: 'white',
        marginBottom: 15,
        fontSize: 16
    },
    textareaContainer: {
        height: 180,
        padding: 5,
        backgroundColor: 'black',
        borderColor: 'gray',
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10
      },
      textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 14,
        color: 'white',
        paddingLeft: 10,
        paddingRight: 10
      },

});