import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View ,Image } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import companyLogo from '../../../assets/img/proxym.png'

import { getUserFromAsyncStorageToStore } from '../../../store/actions';

import { API_URL } from '../../../../config';

class AuthenticationLoading extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const user = await AsyncStorage.getItem('user');
        const urlFromAsyncStorage = await AsyncStorage.getItem('API_URL');

        console.log("urlFromAsyncStorage:", urlFromAsyncStorage);

        global.API_URL = urlFromAsyncStorage ? urlFromAsyncStorage : API_URL;

        if(user) {
            this.props.getUserFromAsyncStorageToStore();
            this.props.navigation.navigate('App');
        } else {
            this.props.navigation.navigate('Auth');
        }
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
        backgroundColor: '#020B1C',
    },
    // horizontal: {
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    // }
});

const mapStateToProps = state => {
    return {
        user: state.authReducer.user
    }
}

const mapDispatchToProps = dispatch => ({
    getUserFromAsyncStorageToStore() { dispatch(getUserFromAsyncStorageToStore()) },
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationLoading);
