import React, { Component } from 'react';
import { StatusBar, ImageBackground, Image, StyleSheet, Platform } from 'react-native';
import { Icon, Container, Content, View, Text ,Picker } from 'native-base'
import ActionButton from 'react-native-circular-action-menu';
import AdminPickers from '../../../components/ui/AdminPickers/AdminPickers'

import StyledInput from '../../ui/Input/addEventInput';





export default class addEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            holidayCAtegory:'',
            days:'',
            Date:''
        }
    }

    render() {

        handleHolidayCAtegory = (text) => {
            this.setState({
              holidayCAtegory: text
            });
          }

        return (
            <View style={styles.container} >
                <Content>
                    <Icon
                        name="md-arrow-dropleft"
                        style={{
                            color: 'black',
                            margin: 15,
                            top: 10
                        }}
                        onPress={() => this.props.navigation.navigate('Administration')} />

                    <View style={styles.inputPos}>
                        <AdminPickers height={55} width={300} paddingLeft={20}>
                            <Picker
                                selectedValue={this.state.holidayCAtegory }
                                style={{
                                    alignSelf: 'center',
                                    marginTop: 10,
                                    marginBottom: 10,
                                    color: 'white',
                                }}
                                onValueChange={this.handleHolidayCAtegory}>
                                <Picker.Item label={Celebrations} value={Celebrations} color="#021630" />
                                <Picker.Item label={Holidays} value={Holidays} color="#021630" />                            </Picker>
                        </AdminPickers>
                    </View>

                    <View style={{ marginBottom: 80, marginTop: 100 }}>
                        <StyledInput text={'Name'} textColor={'white'} keyboardType="email-address" onChange={this.handleEmailChange} />
                        <StyledInput text={'Days'} textColor={'white'} keyboardType="email-address" onChange={this.handleEmailChange} />
                        <StyledInput text={'Date'} textColor={'white'} keyboardType="email-address" onChange={this.handleEmailChange} />
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
    inputPos: {
        top: 150,
        marginBottom: 250
    },


});