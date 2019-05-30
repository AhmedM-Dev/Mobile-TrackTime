import React, { Component } from 'react';
import { StatusBar, ImageBackground, Image, StyleSheet, Platform } from 'react-native';
import { Icon, Container, Content, View, Text, Picker } from 'native-base'
import ActionButton from 'react-native-circular-action-menu';
import AdminPickers from '../../../components/ui/AdminPickers/AdminPickers'

import StyledInput from '../../ui/Input/addEventInput';





export default class addEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            holidayCAtegory: '',
            title:'',
            days: '',
            Date: ''
        }
    }

    handleHolidayCategory = (text) => {
        this.setState({
            holidayCAtegory: text
        });
    }

    handleTitle = (text) => {
        this.setState({
            title: text
        });
    }

    handleDays = (text) => {
        this.setState({
            days: text
        });
    }

    handleDate = (text) => {
        this.setState({
            Date: text
        });
    }

    render() {


        return (
            <View style={styles.container} >
                <Content>
                <Icon
            name="md-arrow-round-back"
            style={{
              color: '#DA7373',
              margin: 30,
              fontSize: 18,
              left: 20
            }}
            onPress={() => this.props.navigation.navigate('Administration')} />

                    {/* <View >
                        <AdminPickers height={45} width={300} paddingLeft={20} marginTop={40}>
                            <Picker
                                selectedValue={this.state.holidayCAtegory|| ''}
                                style={{
                                    alignSelf: 'center',
                                    marginTop: 10,
                                    marginBottom: 10,
                                    color: 'white',
                                }}
                                onValueChange={(itemValue) => this.handleHolidayCategory(itemValue)}>
                                <Picker.Item label="Celebrations" value="Celebrations" color="#021630" />
                                <Picker.Item label="Holidays" value="Holidays" color="#021630" />
                            </Picker>
                        </AdminPickers>
                    </View>

                    <View style={{ marginBottom: 80, marginTop: 10 }}>
                        <StyledInput text={'Name'} textColor={'white'} keyboardType="email-address" onChange={this.handleTitle} />
                        <StyledInput text={'Days'} textColor={'white'} keyboardType="email-address" onChange={this.handleDays} />
                        <StyledInput text={'Date'} textColor={'white'} keyboardType="email-address" onChange={this.handleDate} />
                    </View> */}





                    <ActionButton
            buttonColor="#9C9C9C"
            btnOutRange="#C8593C"
            icon={<Icon name='md-arrow-dropup' style={styles.actionButtonIcon} />}
            degrees={180}
            size={40}
            radius={50}
            outRangeScale={0.5}
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
        backgroundColor: '#D1D0D0',
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
    inputPos: {
        top: 150,
        marginBottom: 250
    },


});