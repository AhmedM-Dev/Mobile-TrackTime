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
            marginLeft={props.marginLeft}
            marginTop={props.marginTop}
            backgroundColor={props.backgroundColor}
            style={{
                backgroundColor: '#072152',
                marginBottom: 10,
                flexDirection: 'row',
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 20,
                alignSelf:'center'
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