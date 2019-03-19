import React from 'react';
import { StyleSheet, View, Image, TextInput } from 'react-native';

export default StyledInput = (props) => {
    return (
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={props.image} />
          <TextInput 
            name={props.name}
            onChange={props.onChange}
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
        backgroundColor: 'gray',
        opacity: 0.8,
        width: 300,
        height: 60,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius : 30

    
      },
     
    
      inputs: {
        marginLeft: 16,
        flex: 1,
        color: 'white'
      },
      
      inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
      },
    
})