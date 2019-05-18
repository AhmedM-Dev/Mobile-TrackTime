import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, StatusBar, ImageBackground, Text, StyleSheet, TouchableOpacity ,TouchableHighlight} from 'react-native';
import SettingsList from 'react-native-setting-list';
import { Container, Header, Content, List, ListItem, Icon, Left, Body, Right, Switch, Button, Title } from 'native-base';
import ImagePicker from 'react-native-image-picker';

import { changeTheme } from "./actions";

import userPic from '../../../assets/img/userPic.jpg'
import bgst from '../../../assets/img/bgst.jpg'
import langIcon from '../../../assets/img/langIcon.png'
import themeIcon from '../../../assets/img/themeIcon.png'
import EmailIcon from '../../../assets/img/emailB.png';
import PasswordIcon from '../../../assets/img/passwordB.png';
import NameIcon from '../../../assets/img/nameB.png';
import unsubscribeIcon from '../../../assets/img/uns.png';


const options = {
  title: '',
  takePhotoButtonTitle: 'Take photo',
  chooseFromLibraryButtonTitle: 'Choose from library',
};

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      pic: null,
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

  handleThemeChange = (value) => {
    console.log("theme", value);
    this.props.changeTheme(value ? 'light' : 'dark');
  }


  render() {
    return (
     

      <Container style={{ backgroundColor: this.props.theme.settingContainerColor }}>

<Header style={{ backgroundColor:this.props.theme.settingsHeaderColor, flexDirection: 'row' }}>
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
  backgroundColor:  this.props.theme.settingsHeaderColor ,
  height: 150,
  borderBottomLeftRadius: 120,
  flexDirection: 'row'
  , alignItes: 'center',
  justifyContent: 'center',
  zIndex:2
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
      borderColor: this.props.theme.imageSettingsBorderColor,
    }}></Image>
  </TouchableHighlight>
  <View style={{ width: 150, top: 35 }}>
    <Text style={{ color: this.props.theme.fontColor, fontWeight: 'bold' }}>Asma ben Ahmed</Text>
    <Text style={{ color:  this.props.theme.fontColor, fontWeight: 'bold' }}>Admin </Text>
  </View>
</View>

<Content>
  <View style={{ width: 280, borderLeftColor: this.props.theme.barColor , borderLeftWidth: 2, alignSelf: 'center' ,marginTop:30 }}>

    <SettingsList borderColor={this.props.theme.settingContainerColor}  >

      {/* <SettingsList.Header
        hasNavArrow={false}
        headerText='Account settings'
        borderHide={'Both'}
        headerStyle={{
          fontSize: 18,
          color: this.props.theme.fontColor,
          marginLeft: 10,
          fontWeight: 'bold',
         
        }}
        backgroundColor= {this.props.theme.settingContainerColor}  
        borderColor='red'
      /> */}

      <SettingsList.Item
        icon={
          <View style={styles.headerIcon}></View>
        }
        hasNavArrow={false}
        itemWidth={50}
        titleStyle={{ color: this.props.theme.fontColor, fontSize: 16 }}
        title='First name'
        borderHide={'Both'}
        backgroundColor= {this.props.theme.settingContainerColor}    />


      <Text style={{ left: 30, top: -10 , color: this.props.theme.informationsColor , marginBottom:-10}}>Asma</Text>

      <SettingsList.Item
         icon={
          <View style={styles.headerIcon}></View>
        }
        hasNavArrow={false}
        itemWidth={50}
        titleStyle={{ color: this.props.theme.fontColor, fontSize: 16 }}
        title='Last name'
        borderHide={'Both'}
        backgroundColor= {this.props.theme.settingContainerColor}  
      />
      <Text style={{ left: 30, top: -10 , color: this.props.theme.informationsColor , marginBottom:-10}}>Ben ahmed</Text>



      <SettingsList.Item
        icon={
          <View style={styles.headerIcon}></View>
        }
        hasNavArrow={false}
        itemWidth={50}
        titleStyle={{ color: this.props.theme.fontColor, fontSize: 16 }}
        title='Email'
        borderHide={'Both'}
        backgroundColor= {this.props.theme.settingContainerColor}  
      />
      
      <Text style={{ left: 30, top: -10 , color: this.props.theme.informationsColor , marginBottom:-10}}>asma.bahmed19@hotmail.com</Text>

        <SettingsList.Item
          icon={
            <View style={styles.headerIcon}></View>
          }
          hasNavArrow={false}
          itemWidth={50}
          titleStyle={{ color: this.props.theme.fontColor, fontSize: 16 }}
          title='Password'
          borderHide={'Both'}
          backgroundColor= {this.props.theme.settingContainerColor}  
        />

{/* <SettingsList.Header
        hasNavArrow={false}
        headerText='Application settings'
        borderHide={'Both'}
        headerStyle={{
          fontSize: 18,
          color: this.props.theme.fontColor,
          marginLeft: 10,
          fontWeight: 'bold'

        }}
        backgroundColor= {this.props.theme.settingContainerColor}  
      /> */}
 <SettingsList.Item
        icon={
          <View style={styles.headerIcon}></View>
        }
        hasNavArrow={false}
        itemWidth={50}
        titleStyle={{ color: this.props.theme.fontColor, fontSize: 16 }}
        title='Language'
        borderHide={'Both'}
        backgroundColor= {this.props.theme.settingContainerColor}  
      />
      
      <Text style={{ left: 30, top: -10 , color: this.props.theme.informationsColor , marginBottom:-10}}>English</Text>


<SettingsList.Item
          icon={
            <View style={styles.headerIcon}></View>
          }
          hasNavArrow={false}
          itemWidth={50}
          titleStyle={{ color: this.props.theme.fontColor, fontSize: 16 }}
          title='Light theme'
          borderHide={'Both'}
          backgroundColor= {this.props.theme.settingContainerColor}  
        />
<Switch onValueChange={this.handleThemeChange} value={this.props.theme.preset === 'dark' ? false : true } style={{top:-30}} />
   
    </SettingsList>



  </View>
</Content>
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
    backgroundColor: '#2CA96E',
    marginRight: -7,
    height: 15, width: 15,
    borderRadius: 100,
    alignSelf: 'center', left: -7
  }

});

const mapStateToProps = state => {
  return {
      theme: state.settingsReducer.theme,
  }
}

const mapDispatchToProps = dispatch => ({
  changeTheme(value) { dispatch(changeTheme(value)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);