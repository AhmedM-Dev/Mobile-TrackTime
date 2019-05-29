import React, { useState } from 'react';
import { StyleSheet, View, Image, TextInput } from 'react-native';

export default StyledInput = (props) => {
  return (

    <View style={styles.inputContainer}>
      <Image style={styles.inputIcon} source={props.image} />
      <TextInput
        name={props.name}
        value={props.value}
        onChangeText={(text) => props.onChange(text)}
        style={styles.inputs}
        placeholder={props.text}
        placeholderTextColor={props.textColor}
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}
      />
    </View>


  );
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#072152',
    width: 300,
    height: 45,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    alignSelf:'center'
  },

  inputs: {
    marginLeft: 16,
    flex: 1,
    color: 'white'
  },

  inputIcon: {
    width: 15,
    height: 15,
    marginLeft: 15,
    justifyContent: 'center'
  },

})