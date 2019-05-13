import React, { Component } from 'react';
import { StatusBar, ImageBackground, Image, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Container, Content, View, Text } from 'native-base'
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


const options = {
    title: '',
    takePhotoButtonTitle: 'Take photo',
    chooseFromLibraryButtonTitle: 'Choose from library',
};


export default class adminMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null,
            pic: null,
            startDate: null,
            startTime: null,
            endDate: null,
            endTime: null,
        }
    }
    myfun = () => {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('Image Picker Error: ', response.error);
            }

            else {
                let source = { uri: response.uri };
                this.setState({
                    avatarSource: source,
                    pic: response.data
                });
            }
        });
    }
    uploadPic = () => {
        RNFetchBlob.fetch('POST', 'https://unentertaining-sect.000webhostapp.com/war/upload.php', {
            Authorization: "Bearer access-token",
            otherHeader: "foo",
            'Content-Type': 'multipart/form-data',
        }, [
                { name: 'image', filename: 'avatar.png', data: this.state.pic }
            ]).then((resp) => {
                console.log('your image uploaded successfully');
                this.setState({ avatarSource: null })
            })
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


    render() {
        return (
            <ImageBackground style={styles.container} source={Background}>
                <Content>
                    <Icon
                        name="md-arrow-round-back"
                        style={{
                            color: 'white',
                            margin: 15,
                            top:10
                        }}
                        onPress={() => this.props.navigation.navigate('Administration')} />


                        <Text style={{color:'white' , alignSelf:'center' , top:-30 , marginBottom:-20}}> Add event </Text>

                    <View >
                        <Image source={this.state.avatarSource}
                            style={{
                                marginBottom: 20,
                                alignSelf: 'center',
                                height: 150,
                                width: 300,
                                borderWidth: 2,
                                borderColor: 'black',
                                borderRadius:20,
                                top:10
                            }} />



                        <Icon name="md-download"
                            onPress={this.myfun}
                            style={{ position: "absolute", top: 120, color: "white", left: 260 , opacity:0.7 }} />

                    </View>

                    <View>
                        <StyledInput image={titleIcon} text={'Title'} textColor={'white'} />
                        <StyledInput image={motifIcon} text={'Datails'} textColor={'white'} />
                        <StyledInput image={priceIcon} text={'Price'} textColor={'white'} />


                        <DatePicker
                            style={{ width: 300, alignSelf: 'center', marginBottom: 5, color: 'white' , marginTop:5 }}
                            date={this.state.startDate}
                            mode="date"
                            iconSource={null}
                            placeholder="Start date"

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
                            placeholder="Start time"
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
                            placeholder="End date"
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
                            placeholder="End time"
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
                        buttonColor="transparent"
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
            </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',

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


});