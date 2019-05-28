import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from "react-redux";
import { Card, Text, View } from 'native-base';

const CustomPicker = props => {
    return (
        <View style={{ 

            borderWidth: 1,
    width: 340,
    height: 50,
    paddingLeft: 20,
    alignSelf: 'center',
    borderColor: props.theme.cardBackground,
    marginTop: 2,
    borderRadius:10,
    backgroundColor:props.theme.cardBackground
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

export default connect(mapStateToProps)(CustomPicker);