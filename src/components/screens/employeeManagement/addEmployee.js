import React, { Component } from 'react';
import { StatusBar, ImageBackground, Image, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Container, Content, View, Text } from 'native-base'
import ActionButton from 'react-native-circular-action-menu';
import StyledInput from '../../ui/Input/lightInput';
import EmailIcon from '../../../assets/img/Email.png';
import PasswordIcon from '../../../assets/img/password.png';
import phoneIcon from '../../../assets/img/phoneIcon.png';
import logoName from '../../../assets/img/name.png';
import groupIcon from '../../../assets/img/group.png';
import jobLogo from '../../../assets/img/jobLogo.png';
import axios from "axios";
import { API_URL } from "../../../../config";
import Background from '../../../assets/img/backgroundM.jpg';

export default class adminMenu extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            groupId: null,
            phoneNumber: '',
            email: '',
            password: null,
            jobTitle: ''

        }
    };


    handleFirstNAmeChange = (text) => {
        this.setState({
            ...this.state,
            firstName: text
        });
    }

    handleLastNameChange = (text) => {
        this.setState({
            ...this.state,
            lastName: text
        });
    }

    handleGroupIdChange = (text) => {
        this.setState({
            ...this.state,
            groupId: text
        });
    }

    handlePhoneNumberChange = (text) => {
        this.setState({
            ...this.state,
            phoneNumber: text
        });
    }

    handleEmailChange = (text) => {
        this.setState({
            ...this.state,
            email: text
        });
    }

    handlePassChange = (text) => {
        this.setState({
            ...this.state,
            pass: text
        });
    }

    handleJobTitleChange = (text) => {
        this.setState({
            ...this.state,
            jobTitle: text
        });
    }

    handleAddUser = () => {

        axios.post(API_URL + "users", {
            userId: this.state.connectedUser.userId,
            ...this.state
        })
            .then((response) => {
                alert("user added successfully")
            }).catch(error => alert(error));
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
            <ImageBackground style={styles.container} source={Background}>
                    <Content>
                <Icon
                    name="md-arrow-round-back"
                    style={{
                        color: 'white',
                        margin:15,
                        top:10
                    }}
                    onPress={() => this.props.navigation.navigate('Administration')} />
<Text style={{color:'white' , alignSelf:'center'}}> Add user </Text>
                    <View style={styles.inputPos}>
                        <StyledInput image={logoName} text={'First name'} textColor={'white'} onChange={this.handleFirstNAmeChange} />
                        <StyledInput image={logoName} text={'Last name'} textColor={'white'} onChange={this.handleLastNameChange} />
                        <StyledInput image={jobLogo} text={'Job title'} textColor={'white'} onChange={this.handleJobTitleChange} />
                        <StyledInput image={groupIcon} text={'Group ID'} textColor={'white'} onChange={this.handleGroupIdChange} />
                        <StyledInput image={phoneIcon} text={'Phone number'} textColor={'white'} onChange={this.handlePhoneNumberChange} />
                        <StyledInput image={EmailIcon} text={'Email'} textColor={'white'} keyboardType="email-address" onChange={this.handleEmailChange} />
                        <StyledInput image={PasswordIcon} text={'Password'} textColor={'white'} secureTextEntry={true} onChange={this.handlePassChange} />

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
    inputPos: {
        top:30,
        marginBottom:100
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