import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Text, StyleSheet, TouchableOpacity, TouchableHighlight, TextInput, Alert } from 'react-native';
import SettingsList from 'react-native-setting-list';
import { Container, Header, Content, Icon, Switch, Title, View } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import { startCase } from 'lodash';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-community/async-storage';

import { changeTheme, changeUserProfile, uploadPhoto } from "./actions";

import { Button } from 'react-native-elements';


const options = {
  title: '',
  takePhotoButtonTitle: 'Take photo',
  chooseFromLibraryButtonTitle: 'Choose from library',
  maxWidth: 500,
  maxHeight: 500
};

class Settings extends Component {
  state = {
    user: this.props.user,
    avatarSource: null,
    pic: null,
    email: this.props.user && this.props.user.email,
    lastPass: '',
    newPass: '',
    changed: false,
    apiUrl: global.API_URL
  };

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

        this.props.uploadPhoto({ photo: `data:${response.type};base64,${response.data}` });
      }
    });
  }

  // uploadPic = () => {
  //   RNFetchBlob.fetch('POST', 'https://unentertaining-sect.000webhostapp.com/war/upload.php', {
  //     Authorization: "Bearer access-token",
  //     otherHeader: "foo",
  //     'Content-Type': 'multipart/form-data',
  //   }, [
  //       { name: 'image', filename: 'avatar.png', data: this.state.pic }
  //     ]).then((resp) => {
  //       console.log('your image uploaded successfully');
  //       this.setState({ avatarSource: null })
  //     })
  // }

  handleThemeChange = (value) => {
    console.log("theme", value);
    this.props.changeTheme(value ? 'light' : 'dark');
  }


  handleEmailChange = (email) => {
    console.log('new email', email);
    this.setState({
      ...this.state,
      email,
      emailChanged: true,
      changed: true
    });
  }


  handleNewPassChange = (newPass) => {
    this.setState({
      ...this.state,
      newPass,
      newPassChanged: true,
      changed: true
    });
  }

  handleLastPassChange = (lastPass) => {
    this.setState({
      ...this.state,
      lastPass,
      lastPassChanged: true,
      changed: true
    });
  }

  handleChangeProfileRequest = () => {
    if (this.state.emailChanged || this.state.newPassChanged) {
      console.log('=============================================================');
      if (this.state.lastPass && this.state.lastPass.length > 0) {
        const email = (this.state.email !== this.props.user.email) && (this.state.email.length > 3) ? this.state.email : null;
        const pass = this.state.newPass.length > 0 ? this.state.newPass : null;

        if (email || pass) {
          this.props.changeUserProfile({
            userId: this.props.user.userId,
            oldPass: this.state.lastPass,
            email,
            password: pass
          });
          this.handleClear();
        }

      } else {
        Alert.alert(
          'Error',
          'To modify your password or email you must enter your current password.',
          [
            { text: 'OK' },
          ],
          { cancelable: false },
        );
      }
    }

    if (this.state.apiUrlChanged) {
      Alert.alert(
        'Confirm URL Changing',
        'Modifying API Url require the app to restart.',
        [
          { text: 'Cancel', onPress: () => console.log('dsf') },
          {
            text: 'Save & Restart', onPress: async () => {
              console.log('URL', this.state.apiUrl);
              await AsyncStorage.setItem('API_URL', this.state.apiUrl);
              RNRestart.Restart();
            }
          }
        ],
        { cancelable: false },
      );
      // this.handleClear();
    }
  }

  handleChangeApiUrl = (newUrl) => {
    console.log('newUrl', newUrl);
    this.setState({ apiUrl: newUrl, apiUrlChanged: true, changed: true }, () => console.log('apiUrl', this.state.apiUrl));
  }

  handleClear = () => {
    this.setState({
      user: this.props.user,
      avatarSource: null,
      pic: null,
      email: this.props.user && this.props.user.email,
      lastPass: '',
      newPass: '',
      changed: false,
      apiUrl: global.API_URL
    });
  }

  render() {
    return (

      <Container style={{ backgroundColor: this.props.theme.settingContainerColor }}>

        <Header style={{ backgroundColor: this.props.theme.settingsHeaderColor, flexDirection: 'row' }}>
          <Icon name='md-menu' style={{
            color: this.props.theme.imageSettingsBorderColor, position: 'absolute',
            left: 20, top: 15
          }}
            onPress={() => this.props.navigation.openDrawer()}
          />
          <Title style={{ top: 15, marginLeft: -150, color: this.props.theme.imageSettingsBorderColor }}>Settings</Title>

          {/* <NotificationsBell userId={this.state.connectedUser && this.state.connectedUser.userId} /> */}
        </Header>

        <View style={{
          zIndex: 5000,
          backgroundColor: this.props.theme.settingsHeaderColor,
          height: 150,
          borderBottomLeftRadius: 120,
          flexDirection: 'row'
          , alignItes: 'center',
          justifyContent: 'center',
          zIndex: 2
        }}>
          <TouchableHighlight onPress={this.myfun} style={{
            borderRadius: 100,
            height: 100,
            width: 100,
            marginRight: 30,
            top: 10
          }}>
            <Image source={{ uri: this.props.avatar && this.props.avatar.photo }}
              style={{
                borderRadius: 100,
                height: 100,
                width: 100,
                borderWidth: 1,
                borderColor: this.props.theme.imageSettingsBorderColor,
              }}></Image>
          </TouchableHighlight>
          <View style={{ width: 150, top: 35 }}>
            <Text style={{ color: this.props.theme.fontColor, fontWeight: 'bold' }}>{`${this.props.user && this.props.user.firstName} ${this.props.user && this.props.user.lastName}`}</Text>
            <Text style={{ color: this.props.theme.fontColor, fontWeight: 'bold' }}>{this.props.user && this.props.user.jobTitle}</Text>
          </View>
        </View>

        <Content>
          <View style={{ width: 280, borderLeftColor: this.props.theme.barColor, borderLeftWidth: 2, alignSelf: 'center', top: 40, height: 350 }}>

            <SettingsList borderColor={this.props.theme.settingContainerColor}  >


              <TextInput
                style={{
                  height: 40, color: this.props.theme.informationsColor,
                  borderColor: this.props.theme.settingContainerColor,
                  width: 250,
                  left: 20, zIndex: 1000

                }}
                onChangeText={(lastPass) => this.handleLastPassChange(lastPass)}
                // value={this.state.text}
                placeholder='Please set your last password here '
                placeholderTextColor={this.props.theme.informationsColor}
                secureTextEntry={true}
                value={this.state.lastPass}
                name="last password"
              />




              <SettingsList.Item
                icon={
                  <View style={styles.headerIcon}></View>
                }
                hasNavArrow={false}
                itemWidth={50}
                titleStyle={{ color: this.props.theme.fontColor, fontSize: 16 }}
                title='Email'
                borderHide={'Both'}
                backgroundColor={this.props.theme.settingContainerColor}
              />

              <TextInput
                style={{
                  height: 40, top: -20, marginBottom: -40, color: this.props.theme.informationsColor,
                  borderColor: this.props.theme.settingContainerColor,
                  width: 250,
                  left: 20, zIndex: 1000

                }}
                onChangeText={(email) => this.handleEmailChange(email)}
                // value={this.state.text}
                placeholder={this.props.user && this.props.user.email}
                placeholderTextColor={this.props.theme.informationsColor}
                value={this.state.email}
                name="email"
              />

              <SettingsList.Item
                icon={
                  <View style={styles.headerIcon}></View>
                }
                hasNavArrow={false}
                itemWidth={50}
                titleStyle={{ color: this.props.theme.fontColor, fontSize: 16 }}
                title='Password'
                borderHide={'Both'}
                backgroundColor={this.props.theme.settingContainerColor}
              />



              <TextInput
                style={{
                  height: 40, marginBottom: -40, top: -20, color: this.props.theme.informationsColor,
                  borderColor: this.props.theme.settingContainerColor,
                  width: 250,
                  left: 20, zIndex: 1000

                }}
                onChangeText={(newPass) => this.handleNewPassChange(newPass)}
                // value={this.state.text}
                placeholder='New one'
                placeholderTextColor={this.props.theme.informationsColor}
                secureTextEntry={true}
                value={this.state.newPass}
                name="new password"
              />

              <SettingsList.Item

                icon={
                  <View style={styles.headerIcon}></View>
                }
                hasNavArrow={false}
                itemWidth={50}
                titleStyle={{ color: this.props.theme.fontColor, fontSize: 16 }}
                title={`Theme mode (${this.props.theme && startCase(this.props.theme.preset)})`}
                borderHide={'Both'}
                backgroundColor={this.props.theme.settingContainerColor}
              />
              <Switch onValueChange={this.handleThemeChange} value={this.props.theme.preset === 'dark' ? false : true} style={{ top: -30 }} color='red' />

              <SettingsList.Item
                icon={
                  <View style={styles.apiIcon}></View>
                }
                hasNavArrow={false}
                itemWidth={50}
                titleStyle={{ color: this.props.theme.fontColor, fontSize: 16 }}
                title='API URL'
                borderHide={'Both'}
                backgroundColor={this.props.theme.settingContainerColor}
              />

              <TextInput
                style={{
                  height: 40, color: this.props.theme.informationsColor,
                  borderColor: this.props.theme.settingContainerColor,
                  width: 250,
                  left: 20

                }}
                onChangeText={(newUrl) => this.handleChangeApiUrl(newUrl)}
                placeholder='New one'
                placeholderTextColor={this.props.theme.informationsColor}
                value={this.state.apiUrl}
                name="new password"
              />

            </SettingsList>



          </View>
        </Content>
        {this.state.changed &&
          <>
            <Button
              buttonStyle={{
                backgroundColor: '#F78181',
                borderRadius: 0,
                width: 300,
                alignSelf: 'center',
                marginTop: 60, borderRadius: 10,
              }}
              titleStyle={{
                color: 'white',
                top: -1,
              }}
              title="Cancel Changes"
              onPress={this.handleClear}
            />

            <Button
              buttonStyle={{
                backgroundColor: '#4470B2',
                borderRadius: 0,
                width: 300,
                alignSelf: 'center',
                marginTop: 10, borderRadius: 10,
                marginBottom: 10
              }}
              titleStyle={{
                color: 'white',
                top: -1,
              }}
              title="Save"
              onPress={this.handleChangeProfileRequest}
            />
          </>
        }
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  iconStyle: {
    marginLeft: 15,
    marginRight: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    width: 15,
    height: 15
  },

  headerIcon: {
    backgroundColor: '#4470B2',
    marginRight: -7,
    height: 15, width: 15,
    borderRadius: 100,
    alignSelf: 'center', left: -7
  },

  apiIcon: {
    backgroundColor: '#5F4C0B',
    marginRight: -7,
    height: 15, width: 15,
    borderRadius: 100,
    alignSelf: 'center', left: -7
  }

});

const mapStateToProps = state => {
  return {
    theme: state.settingsReducer.theme,
    avatar: state.authReducer.avatar,
    user: state.authReducer.user,
  }
}

const mapDispatchToProps = dispatch => ({
  changeTheme(value) { dispatch(changeTheme(value)) },
  changeUserProfile(payload) { dispatch(changeUserProfile(payload)) },
  uploadPhoto(payload) { dispatch(uploadPhoto(payload)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
