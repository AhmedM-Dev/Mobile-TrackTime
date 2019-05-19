
import React from 'react';
import { StatusBar, StyleSheet, AsyncStorage, Image, TouchableHighlight ,     TextInput
} from 'react-native';
import {
    Container,
    Content,
    Card,
    Text,
    View,
    Picker,
    Button,
    Badge,
     Icon, 
     Header, 
     Title,
} from 'native-base';
import DatePicker from 'react-native-datepicker';
import Textarea from 'react-native-textarea';
import SimplePicker from 'react-native-simple-picker';
import NotificationsBell from "../../ui/NotificationsBell";
import axios from "axios";
import userPic from '../../../assets/img/userPic.jpg';
import { API_URL } from "../../../../config";
import ActionButton from 'react-native-circular-action-menu';

const languages = ['English', 'Frensh'];

export default class Events extends React.Component {
   

    render() {
        return (
            <Container style={{ backgroundColor: 'white' }} >
                <StatusBar hidden />

               

           
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
                                onPress={() => this.handleCreateRequest()}>
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

                            
                          
              
            </Container>
        )
    }
}

const styles = StyleSheet.create({

    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },

    ButtonIcon: {
        fontSize: 20,
        height: 22,
        color: '#2CA96E',
    },

});