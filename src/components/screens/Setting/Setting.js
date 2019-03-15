import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import SettingsList from 'react-native-setting-list';
import { Container, Card, Content, CardItem, } from 'native-base';

import { Header, } from 'react-native-elements';

import s from '../../../assets/img/S.png'

export default class App extends Component {
    constructor() {
        super();
        this.onValueChange = this.onValueChange.bind(this);
        this.state = { switchValue: false };
    }

    render() {
        return (
            <Container>
                <StatusBar hidden />
                <Header
                    leftComponent={{
                        icon: 'menu',
                        color: '#fff',
                        onPress: () => alert('menu')
                    }
                    }

                    centerComponent={{
                        text: 'My settings',
                        style: { color: '#fff', fontSize: 18 }
                    }}
                    rightComponent={{
                        icon: 'home',
                        color: '#fff',
                        onPress: () => alert('home')
                    }
                    }
                    backgroundColor="#052D8F"
                />

                <View style={{ top: 100 , paddingBottom:120 }}>
                    <Image source={s}></Image>
                </View>
    <Content>
                <Card >
                <CardItem>
                    <SettingsList underlayColor='grey' >

                        <SettingsList.Header headerText='EDIT PROFILE' headerStyle={{ color: '#0A415B', marginTop: 30, marginBottom: 30 }} />
                        <SettingsList.Item title='User name' titleStyle={{ color: 'black', marginTop: 25, marginBottom: 25 }} />
                        <SettingsList.Item title='Password' titleStyle={{ color: 'black', marginTop: 25, marginBottom: 25 }} />
                        <SettingsList.Item title='Email' titleStyle={{ color: 'black', marginTop: 25, marginBottom: 25 }} />
                        <SettingsList.Item title='Profile picture' titleStyle={{ color: 'black', marginTop: 25, marginBottom: 25 }} />
                        <SettingsList.Item
                            hasNavArrow={false}
                            switchState={this.state.switchValue}
                            switchOnValueChange={this.onValueChange}
                            hasSwitch={true}
                            title='njknujnjil' titleStyle={{ color: 'black', marginTop: 25, marginBottom: 25 }} />
                        <SettingsList.Header headerText='EDIT APPLICATION' headerStyle={{ color: '#0A415B', marginTop: 30, marginBottom: 30 }} />
                        <SettingsList.Item title='Language' titleStyle={{ color: 'black', marginTop: 25, marginBottom: 25 }} />
                        <SettingsList.Item title='Theme' titleStyle={{ color: 'black', marginTop: 25, marginBottom: 25 }} />
                        <SettingsList.Item title='Logout' titleStyle={{ color: 'black', marginTop: 25, marginBottom: 25 }} />
                    </SettingsList>
                    </CardItem>

                </Card></Content>
            </Container>
        );
    }

    onValueChange(value) {
        this.setState({ switchValue: value });
    }
}