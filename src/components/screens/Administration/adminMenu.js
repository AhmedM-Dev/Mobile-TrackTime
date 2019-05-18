import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Image } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';
import { Icon, Content, Text, View } from 'native-base';
import Background from '../../../assets/img/backgroundM.jpg';
import addUserIcon from '../../../assets/img/addUser.png';
import updateUserIcon from '../../../assets/img/updateUserIcon.png';
import removeUserIcon from '../../../assets/img/removeUserIcon.png';
import eventsIcon from '../../../assets/img/eventsLogo.png';


export default class adminMenu extends Component {

    render() {
        return (
            <View style={styles.container} >
                <Content>
                    <Icon
                        name="md-menu"
                        style={{
                            color: 'black',
                            left: 10,
                            top: 30
                        }}
                        onPress={() => this.props.navigation.openDrawer()} />
                    <View style={{ top: 90, marginBottom: 30, alignItems: 'center' }}>
                        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}> ADMINISTRATION </Text>
                        <Text style={{ color: 'black', fontSize: 20 , opacity:0.9}}> MENU </Text>
                    </View>
                    <View style={{ top: 110, marginBottom: 120 }}>
                        <Button
                            icon={
                                <Image source={addUserIcon} style={{ height: 20, width: 20, left: -80 }}></Image>
                            }
                            buttonStyle={{
                                backgroundColor: "black",
                                borderRadius: 20,
                                width: 280,
                                height: 50,
                                marginBottom: 10, borderColor: 'gray', borderWidth: 1
                            }}
                            titleStyle={{
                                color: 'white',
                                top: -1,
                                left: -30,
                            }}
                            title="Employee management"
                            onPress={() => this.props.navigation.navigate('EmployeeManagement')}
                        />
                      

                        <Button
                            icon={
                                <Image source={eventsIcon} style={{ height: 20, width: 20, left: -70 }}></Image>
                            }
                            buttonStyle={{
                                backgroundColor: "black",
                                borderRadius: 20,
                                width: 280,
                                height: 50,
                                marginBottom: 10, borderColor: 'gray', borderWidth: 1
                            }}
                            titleStyle={{
                                color: 'white',
                                top: -1,
                                left: -50,
                                paddingLeft:20

                            }}
                            title="Events management"
                            onPress={() => this.props.navigation.navigate('EventsManagement')}
                        />

<Button
                            icon={
                                <Image source={eventsIcon} style={{ height: 20, width: 20, left: -70 }}></Image>
                            }
                            buttonStyle={{
                                backgroundColor: "black",
                                borderRadius: 20,
                                width: 280,
                                height: 50,
                                marginBottom: 10, borderColor: 'gray', borderWidth: 1
                            }}
                            titleStyle={{
                                color: 'white',
                                top: -1,
                                left: -50,
                                paddingLeft:20

                            }}
                            title="Groups management"
                            onPress={() => this.props.navigation.navigate('GroupsManagement')}
                        />

                        <Button
                            icon={
                                <Icon name="md-happy" size={20} style={{ color: 'white', fontSize: 22, left: -65 }} />
                            }
                            buttonStyle={{
                                backgroundColor: "black",
                                borderRadius: 20,
                                width: 280,
                                height: 50,
                                marginBottom: 10, borderColor: 'gray', borderWidth: 1
                            }}
                            titleStyle={{
                                color: 'white',
                                top: -1,
                                left: -45,
                                paddingLeft:20

                            }}
                            title="holidays management"
                            onPress={() => this.props.navigation.navigate('addHolidays')}
                        />
                    </View>

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
});