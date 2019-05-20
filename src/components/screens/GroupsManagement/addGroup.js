import React, { Component } from 'react';
import { StatusBar, ImageBackground, Image, StyleSheet, Platform, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Container, Content, View, Text } from 'native-base'
import ActionButton from 'react-native-circular-action-menu';
import titleIcon from '../../../assets/img/titleIcon.png';
import leaderIcon from '../../../assets/img/leader.png';
import axios from "axios";
import { API_URL } from "../../../../config";
import Background from '../../../assets/img/backgroundM.jpg';
import ImagePicker from 'react-native-image-picker';
import StyledInput from '../../ui/Input/addEventInput';
import { connect } from 'react-redux';

import { addGroup } from './actions';



class addGroups extends Component {
    constructor() {
        super();
        this.state = {
            name:'',
            poleLead:''
        }
    }
    handleGroupName = (text) => {
        this.setState({
            ...this.state,
            name: text
        });
    }
    handlePoleLead = (text) => {
        this.setState({
            ...this.state,
            poleLead: text
        });
    }
    handleAddGroup = () => {
        const { name, poleLead } = this.state;
        if (name !== '' && poleLead !== '') {
            this.props.addGroup(this.state);
        }

        else {
            ToastAndroid.show("All infos are required.", ToastAndroid.LONG);
        }
    }

    render() {
        return (
            <View style={styles.container} >
                <Content>
                    <Icon
                        name="md-keypad"
                        style={{
                            color: 'black',
                            margin: 15,
                            top: 10
                        }}
                        onPress={() => this.props.navigation.navigate('Administration')} />



                    <View style={{ marginBottom: 80, marginTop: 100 }}>
                        <StyledInput image={titleIcon} text={'Group name'} textColor={'white'} onChange={this.handleGroupName} />
                        <StyledInput image={leaderIcon} text={'Pole Lead'} textColor={'white'} onChange={this.handlePoleLead} />
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
                            onPress={() => { this.handleAddGroup() }}>
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
        justifyContent: 'center'
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



const mapStateToProps = state => {
    return {
        loading: state.loadingReducer.loading,
        user: state.authReducer.user,
        theme: state.settingsReducer.theme,
    }
}

const mapDispatchToProps = dispatch => ({
    addGroup(group) { dispatch(addGroup(group)) },
    getGroups() { dispatch(getGroups()) },
});

export default connect(mapStateToProps, mapDispatchToProps)(addGroups);