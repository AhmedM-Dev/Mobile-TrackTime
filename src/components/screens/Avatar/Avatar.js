import React, { Component } from 'react';
import { StatusBar, ImageBackground, Image, StyleSheet, Text, View } from 'react-native';
import {Button} from 'react-native-elements'
import{Icon} from 'native-base'
import Background from '../../../assets/img/background.jpg';
import avatar from '../../../assets/img/avatar.png'
import ImagePicker from 'react-native-image-picker';

const options = {
    title: '',
    takePhotoButtonTitle: 'Take photo',
    chooseFromLibraryButtonTitle: 'Choose from library',
  };

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          avatarSource: null,
          pic: null
        }
      }
      myfun = () => {
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          }
          else if (response.error) {
            console.log('Image Picker Error: ', response.error);
          }
    
          else {
            let source = { uri: response.uri };
            this.setState({
              avatarSource: source,
              pic: response.data
            });
          }
        });
      }
      uploadPic = () => {
        RNFetchBlob.fetch('POST', 'https://unentertaining-sect.000webhostapp.com/war/upload.php', {
          Authorization: "Bearer access-token",
          otherHeader: "foo",
          'Content-Type': 'multipart/form-data',
        }, [
            { name: 'image', filename: 'avatar.png', data: this.state.pic }
          ]).then((resp) => {
            console.log(resp);
            alert('your image uploaded successfully');
            this.setState({ avatarSource: null })
          })
      }    
  render() {
    return (
      <ImageBackground style={styles.container} source={Background}>
        <StatusBar hidden />

        <Text style={{ color:'#104E77' , fontSize:30 , top:80 }}> Upload your image  </Text>
        <View>
       <Image source={this.state.avatarSource} style={{
            height:250,width:250 , borderWidth:2, borderColor:'#104E77',top:50, position:'absolute' , top:130 , alignSelf:'center' , borderRadius:200
       }}>
       </Image>
        <Icon name="md-camera"
                onPress={this.myfun}
                style={{ position: "absolute", top: 300, color: "#B3D8E3", left: 105 }} />
       
       </View>

        
        <Button
          buttonStyle={{
            height: 50,
            width: 200,
            backgroundColor: '#19678F',
            borderWidth: 1,
            borderRadius: 30,
            borderColor: '#19678F',
            position:'relative',
            top: 450,
            padding: 10,
            opacity:0.7,
          }}
          title=" Validate"
          onPress={() => this.props.navigation.navigate('Dashboard')} />

      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
   
});