import React from 'react';
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
        defaultValue={props.defaultValue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#AFCDDE',
    opacity: 0.4,
    width: 300,
    height: 55,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#AFCDDE',
    borderWidth: 1,
    borderRadius: 30
  },

  inputs: {
    marginLeft: 16,
    flex: 1,
    color: 'white'
  },

  inputIcon: {
    width: 20,
    height: 20,
    marginLeft: 15,
    justifyContent: 'center'
  },
});