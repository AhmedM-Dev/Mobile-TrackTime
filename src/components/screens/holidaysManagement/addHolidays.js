import React, { Component } from 'react';
import { StatusBar, ImageBackground, Image, StyleSheet, Platform, AsyncStorage } from 'react-native';
import { Icon, Container, Content, View, Text } from 'native-base'
import ActionButton from 'react-native-circular-action-menu';
import StyledInput from '../../ui/Input/lightInput';
import EmailIcon from '../../../assets/img/Email.png';
import PasswordIcon from '../../../assets/img/password.png';
import axios from "axios";
import { API_URL } from "../../../../config";
import Background from '../../../assets/img/backgroundM.jpg';

export default class adminMenu extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: null,

        }
    };


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
 <Text style={{color:'white' , alignSelf:'center'}}> Add holidays </Text>

                    <View style={styles.inputPos}>
                    <StyledInput image={EmailIcon} text={'Name'} textColor={'white'} keyboardType="email-address" onChange={this.handleEmailChange} />
                    <StyledInput image={EmailIcon} text={'Days'} textColor={'white'} keyboardType="email-address" onChange={this.handleEmailChange} />
                    {/* just for celebrations */}
                    <StyledInput image={EmailIcon} text={'Date'} textColor={'white'} keyboardType="email-address" onChange={this.handleEmailChange} />

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

inputPos:{
    top:150,
    marginBottom:250
},

actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
    
},

});