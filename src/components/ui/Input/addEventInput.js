import React, { useState } from 'react';
import { StyleSheet, View, Image, TextInput } from 'react-native';

export default StyledInput = (props) => {
  const style = props.style ? props.style : {};

  console.log("Style prop", props.style);

  return (

    <View style={{ ...styles.inputContainer, ...style }}>
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
    marginBottom: 3,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    alignSelf: 'center'
  },

  inputs: {
    flex: 1,
    color: 'white',
    paddingLeft: -15
  },

  inputIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
    justifyContent: 'center'
  }
});
