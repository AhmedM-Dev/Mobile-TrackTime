import React, { Component } from 'react';
import { View, Image, StatusBar, ImageBackground, Text, StyleSheet, TouchableHighlight } from 'react-native';
import SettingsList from 'react-native-setting-list';
import { Container, Header, Icon, Title, Content, Button } from 'native-base';
import userPic from '../../../assets/img/userPic.jpg'
import ImagePicker from 'react-native-image-picker';
import NotificationsBell from "../../ui/NotificationsBell";

const options = {
  title: '',
  takePhotoButtonTitle: 'Take photo',
  chooseFromLibraryButtonTitle: 'Choose from library',
};

export default class Settings extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      avatarSource: null,
      pic: null
    }
  }
  myfun = () => {
    ImagePicker.showImagePicker(options, (response) => {
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
        console.log('your image uploaded successfully');
        this.setState({ avatarSource: null })
      })
  }


  render() {
    return (
      <Container style={{ backgroundColor: 'white' }}>
        <StatusBar hidden />

        <Header style={{ backgroundColor: '#ECECEC', flexDirection: 'row' }}>
          <Icon name='md-menu' style={{
            color: 'black', position: 'absolute',
            left: 20, top: 15
          }}
            onPress={() => this.props.navigation.openDrawer()}
          />
          <Title style={{ top: 15, marginLeft: -150, color: 'black' }}>Settings</Title>

          <NotificationsBell userId={this.state.connectedUser && this.state.connectedUser.userId} />
        </Header>

        <View style={{
          zIndex: 5000,
          backgroundColor: '#ECECEC',
          height: 150,
          borderBottomLeftRadius: 120,
          flexDirection: 'row'
          , alignItes: 'center',
          justifyContent: 'center'
        }}>
          <TouchableHighlight onPress={this.myfun} style={{
            borderRadius: 100,
            height: 100,
            width: 100,
            marginRight: 30,
            top: 10
          }}>
            <Image source={userPic} style={{
              borderRadius: 100,
              height: 100,
              width: 100,
              borderWidth: 1,
              borderColor: 'black',
            }}></Image>
          </TouchableHighlight>
          <View style={{ width: 150, top: 35 }}>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>Asma ben Ahmed</Text>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>Admin </Text>
          </View>
        </View>

        <Content>
          <View style={{ width: 280, borderLeftColor: '#ECECEC', borderLeftWidth: 2, alignSelf: 'center' ,marginTop:30 }}>

            <SettingsList borderColor='white'  >

              {/* <SettingsList.Header
                hasNavArrow={false}
                headerText='Account settings'
                borderHide={'Both'}
                headerStyle={{
                  fontSize: 20,
                  marginTop: 20,
                  color: 'black',
                  marginLeft: 20,
                  fontWeight: 'bold'

                }}

              /> */}
              {/* <Text style={{ left: 15, top: -10 }}>Manage informations about you</Text> */}

              <SettingsList.Item
                icon={
                  <View style={styles.headerIcon}></View>
                }
                hasNavArrow={false}
                itemWidth={50}
                titleStyle={{ color: 'black', fontSize: 16 }}
                title='First name'
                borderHide={'Both'}
              />


              <Text style={{ left: 30, top: -10 , opacity:0.5 , marginBottom:-10}}>Asma</Text>

              <SettingsList.Item
                 icon={
                  <View style={styles.headerIcon}></View>
                }
                hasNavArrow={false}
                itemWidth={50}
                titleStyle={{ color: 'black', fontSize: 16 }}
                title='Last name'
                borderHide={'Both'}
              />
              <Text style={{ left: 30, top: -10 , opacity:0.5 , marginBottom:-10}}>Ben ahmed</Text>



              <SettingsList.Item
                icon={
                  <View style={styles.headerIcon}></View>
                }
                hasNavArrow={false}
                itemWidth={50}
                titleStyle={{ color: 'black', fontSize: 16 }}
                title='Email'
                borderHide={'Both'}
              />
              
              <Text style={{ left: 30, top: -10 , opacity:0.5 , marginBottom:-10}}>asma.bahmed19@hotmail.com</Text>

                <SettingsList.Item
                  icon={
                    <View style={styles.headerIcon}></View>
                  }
                  hasNavArrow={false}
                  itemWidth={50}
                  titleStyle={{ color: 'black', fontSize: 16 }}
                  title='Password'
                  borderHide={'Both'}
                />


<Text style={{ left: 30, top: -10 , opacity:0.5 , marginBottom:-10}}>English</Text>

            </SettingsList>

          </View>
        </Content>

      </Container>
    );
  }
}
const styles = StyleSheet.create({
  // iconStyle: {
  //   marginLeft: 15,
  //   marginRight: 10,
  //   alignSelf: 'center',
  //   justifyContent: 'center',
  //   width: 15,
  //   height: 15
  // },

  headerIcon: {
    backgroundColor: '#2CA96E',
    marginRight: -7,
    height: 15, width: 15,
    borderRadius: 100,
    alignSelf: 'center', left: -7
  }
});
