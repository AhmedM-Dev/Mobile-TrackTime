import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from "react-redux";
import { Card, Text, View } from 'native-base';

const AdminPickers = props => {
    return (
        <View
            height={props.height}
            width={props.width}
            top={props.top}
            marginBottom={props.marginBottom}
            left={props.left}
            paddingLeft={props.paddingLeft}
            style={{
                backgroundColor: 'black',
                marginBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 20
            }}>
            {props.children}
        </View>
    )
}


const mapStateToProps = state => {
    return {
        theme: state.settingsReducer.theme
    }
}

export default connect(mapStateToProps)(AdminPickers);