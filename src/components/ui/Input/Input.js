import React from 'react';
import { StyleSheet, View, Image, TextInput } from 'react-native';

export default StyledInput = (props) => {
    return (
        <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={props.image} />
            <TextInput style={styles.inputs}
                placeholder={props.text}
                placeholderTextColor={props.textColor}
                keyboardType="email-address"
            />

        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: 'transparent',
        // borderRadius:30,
        width: 300,
        height: 60,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        top: -25,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        opacity: 0.5,

    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        color: 'white'
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    }
})