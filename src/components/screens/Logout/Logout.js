import React from "react";
import { View, Text, Button, AsyncStorage } from "react-native";

export default class Logout extends React.Component {

    componentWillMount() {
        console.log("OPTION:", this.props);

        // AsyncStorage.removeItem("user")
        // .then(res => this.props.navigation && this.props.navigation.navigate('Login'))
        // .catch(err => console.error(err));
    }

    // componentDidUpdate() {
    //     AsyncStorage.removeItem("user")
    //     .then(res => this.props.navigation && this.props.navigation.navigate('Login'))
    //     .catch(err => console.error(err));
    // }

    render() {
        // this.props.navigation && this.props.navigation.navigate('Login');
        return(
            <View>
                <Text>User logged out !!</Text>
                <Button title="Redirect to Login" onPress={() => this.props.navigation && this.props.navigation.navigate('Login')} />
            </View>
        );
    }
}