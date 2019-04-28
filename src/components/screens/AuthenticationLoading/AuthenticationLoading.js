import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import { getUserFromAsyncStorageToStore } from '../../../store/actions';

class AuthenticationLoading extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const user = await AsyncStorage.getItem('user');

        if(user) {
            this.props.getUserFromAsyncStorageToStore();
            this.props.navigation.navigate('App');
        } else {
            this.props.navigation.navigate('Auth');
        }
    };

    render() {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size={80} color="#0000ff" />
                <StatusBar hidden={true} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
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