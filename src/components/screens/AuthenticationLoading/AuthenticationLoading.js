import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View ,Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import companyLogo from '../../../assets/img/proxym.png'

export default class AuthenticationLoading extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const user = await AsyncStorage.getItem('user');

        this.props.navigation.navigate(user ? 'App' : 'Auth');
    };

    render() {
        return (
            <View style={styles.container}>
              <Image source={companyLogo} style={{marginBottom:50}}></Image>

                <ActivityIndicator size={80} color="#2594DA" />
                <StatusBar hidden={true} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        backgroundColor: 'black',
    }
});