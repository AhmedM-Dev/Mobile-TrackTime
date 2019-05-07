import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Image } from 'react-native';
import { CheckBox, Button } from 'react-native-elements'
import { Icon, Content , Text, View } from 'native-base'
import Background from '../../../assets/img/backgroundM.jpg';
import addUserIcon from '../../../assets/img/addUser.png';
import updateUserIcon from '../../../assets/img/updateUserIcon.png';
import removeUserIcon from '../../../assets/img/removeUserIcon.png';
import eventsIcon from '../../../assets/img/eventsLogo.png';


export default class adminMenu extends Component {

    render() {
        return (
            <ImageBackground style={styles.container} source={Background}>
            <Content>
                <Icon
                    name="md-menu"
                    style={{
                        color: 'white',
                        left: 10,
                        top: 30
                    }}
                    onPress={() => this.props.navigation.openDrawer()} />
                <View style={{ top: 90, marginBottom: 30 ,alignItems:'center'}}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}> ADMINISTRATION </Text>
                    <Text style={{ color: 'white', fontSize: 20 }}> MENU </Text>
                </View>
                <View style={{ top: 110 , marginBottom:120}}>
                <Button
                        icon={
                            <Image source={addUserIcon} style={{ height: 20, width: 20 , left:-80}}></Image>
                        }
                        buttonStyle={{
                            backgroundColor: "black",
                            borderRadius: 20,
                            width: 280,
                            height:50,
                            marginBottom: 10 , borderColor: 'gray' , borderWidth:1
                        }}
                        titleStyle={{
                            color: 'white',
                            top: -1,
                            left: -58
                        }}
                        title="Add user"
                        onPress={() => this.props.navigation.navigate('addUser')}
                    />
                    <Button
                    icon={
                        <Image source={updateUserIcon} style={{ height: 20, width: 20 , left:-70}}></Image>
                    }
                    buttonStyle={{
                        backgroundColor: "black",
                        borderRadius: 20,
                        width: 280,
                        height:50,
                        marginBottom: 10 , borderColor: 'gray' , borderWidth:1
                    }}
                    titleStyle={{
                        color: 'white',
                        top: -1,
                        left: -48
                    }}
                    title="Update user"
                    onPress={() => this.props.navigation.navigate('updateUser')}
                    />

<Button
                        icon={
                            <Image source={removeUserIcon} style={{ height: 20, width: 20 , left:-65}}></Image>
                        }
                        buttonStyle={{
                            backgroundColor: "black",
                            borderRadius: 20,
                            width: 280,
                            height:50,
                            marginBottom: 10 , borderColor: 'gray' , borderWidth:1
                        }}
                        titleStyle={{
                            color: 'white',
                            top: -1,
                            left: -45
                        }}
                        title="Remove user"
                        onPress={() => this.props.navigation.navigate('removeUser')}
                    />

<Button
                        icon={
                            <Image source={eventsIcon} style={{ height: 20, width: 20 , left:-70}}></Image>
                        }
                        buttonStyle={{
                            backgroundColor: "black",
                            borderRadius: 20,
                            width: 280,
                            height:50,
                            marginBottom: 10 , borderColor: 'gray' , borderWidth:1
                        }}
                        titleStyle={{
                            color: 'white',
                            top: -1,
                            left: -50
                        }}
                        title="Add Events"
                        onPress={() => this.props.navigation.navigate('addEvent')}
                    />

<Button
                        icon={
                            <Icon name="md-happy" size={20} style={{ color: 'white', fontSize: 22 , left:-65 }} />
                        }
                        buttonStyle={{
                            backgroundColor: "black",
                            borderRadius: 20,
                            width: 280,
                            height:50,
                            marginBottom: 10 , borderColor: 'gray' , borderWidth:1
                        }}
                        titleStyle={{
                            color: 'white',
                            top: -1,
                            left: -45
                        }}
                        title="Add holidays"
                        onPress={() => this.props.navigation.navigate('addHolidays')}
                    />
                </View>

</Content>

            </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',

    },


});