import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, StatusBar, ImageBackground, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SettingsList from 'react-native-setting-list';
import { Container, Header, Content, List, ListItem, Icon, Left, Body, Right, Switch, Button, Title } from 'native-base';

import { changeTheme } from "./actions";

import userPic from '../../../assets/img/userPic.jpg'
import bgst from '../../../assets/img/bgst.jpg'
import langIcon from '../../../assets/img/langIcon.png'
import themeIcon from '../../../assets/img/themeIcon.png'
import ImagePicker from 'react-native-image-picker';
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
      // <Container style={{ backgroundColor: '#DDE3F3' }}>
      //   <StatusBar hidden />

      //   <ImageBackground source={bgst} style={{ flex: 1, height: 180 }}>
      //     <Icon name='md-settings' style={{
      //       color: 'white', position: 'absolute',
      //       left: 40, top: 20
      //     }}
      //       onPress={() => this.props.navigation.navigate('Dashboard')}
      //     />
      //     <Title style={{ top: 15, left: -50, fontSize: 24 }}>Settings</Title>

      //   </ImageBackground>

      //   <View style={{ backgroundColor: 'white', height: 510, width: 340, left: 10, top: -60, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
      //     <Content>
      //       <View >
      //         <Image source={this.state.avatarSource} style={{ marginTop: 15, marginBottom: 10, alignSelf: 'center', height: 150, width: 150, borderRadius: 100, borderWidth: 2, borderColor: '#104E77' }} />
      //         <Icon name="md-camera"
      //           onPress={this.myfun}
      //           style={{ position: "absolute", top: 100, color: "#3A5793", left: 235 }} />

      //       </View>

      //       <SettingsList borderColor='#DDE3F3' defaultItemSize={50} >

      //         <SettingsList.Item
      //           hasNavArrow={false}
      //           title='Account settings'
      //           titleStyle={{ color: '#3B5998', fontWeight: 'bold', justifyContent: 'center', fontSize: 16 }}
      //           itemWidth={50}
      //           borderHide={'Both'}
      //           backgroundColor={'white'}

      //         />
      //         <Text style={{ left: 15, top: -10 }}>Manage informations about you</Text>

      //         <SettingsList.Item
      //           icon={
      //             <Image style={styles.iconStyle} source={NameIcon} />
      //           }
      //           hasNavArrow={false}
      //           itemWidth={50}
      //           titleStyle={{ color: 'black', fontSize: 16 }}
      //           title='First name'
      //           borderHide={'Both'}
      //         />

      //         <SettingsList.Item
      //           icon={
      //             <Image style={styles.iconStyle} source={NameIcon} />
      //           }
      //           hasNavArrow={false}
      //           itemWidth={50}
      //           titleStyle={{ color: 'black', fontSize: 16 }}
      //           title='Last name'
      //           borderHide={'Both'}
      //         />

      //         <SettingsList.Item
      //           icon={

      //             <Image style={styles.iconStyle} source={PasswordIcon} />

      //           }
      //           hasNavArrow={false}
      //           itemWidth={50}
      //           titleStyle={{ color: 'black', fontSize: 16 }}
      //           title='Password'
      //           borderHide={'Both'}
      //         />
      //         <SettingsList.Item
      //           icon={

      //             <Image style={styles.iconStyle} source={EmailIcon} />

      //           }
      //           hasNavArrow={false}
      //           itemWidth={50}
      //           titleStyle={{ color: 'black', fontSize: 16 }}
      //           title='Email'
      //           borderHide={'Both'}
      //         />
      //         <SettingsList.Item
      //           hasNavArrow={false}
      //           title='Application settings'
      //           titleStyle={{ color: '#3B5998', fontWeight: 'bold', justifyContent: 'center', fontSize: 16 }}
      //           itemWidth={50}
      //           borderHide={'Both'}
      //           backgroundColor={'white'}
      //         />

      //         <SettingsList.Item
      //           icon={
      //             <Image style={styles.iconStyle} source={langIcon} />
      //           }
      //           hasNavArrow={false}
      //           itemWidth={50}
      //           titleStyle={{ color: 'black', fontSize: 16, justifyContent: 'center' }}
      //           title='Language'
      //           borderHide={'Both'}
      //         />

      //         <SettingsList.Item
      //           icon={
      //             <Image style={styles.iconStyle} source={themeIcon} />
      //           }
      //           hasNavArrow={false}
      //           itemWidth={50}
      //           titleStyle={{ color: 'black', fontSize: 16, justifyContent: 'center' }}
      //           title='Theme'
      //           borderHide={'Both'}
      //         />

      //         <Switch value={false} />

      //         <SettingsList.Item
      //           icon={
      //             <Image style={styles.iconStyle} source={unsubscribeIcon} />
      //           }
      //           hasNavArrow={false}
      //           itemWidth={50}
      //           titleStyle={{ color: 'black', fontSize: 16, justifyContent: 'center' }}
      //           title='Unsubscribe'
      //           borderHide={'Both'}
      //         />


      //       </SettingsList>
      //     </Content>

      //   </View>


      //   <View style={{ flexDirection: 'row', position: 'absolute', bottom: 20, left: 10 }}>
      //     <Button light
      //       style={{ width: 340, top: 10, width: 340, backgroundColor: '#3A5793' }}
      //     >
      //       <Text style={{ color: 'white', left: 135 }}>Save updates</Text>
      //     </Button>
      //   </View>


      // </Container>

      <Container style={{ backgroundColor: this.props.theme.backgroundColor }}>
        <StatusBar hidden />
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Settings</Title>
          </Body>
        </Header>
        <Content>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#FF9501" }}>
                <Icon active name="airplane" />
              </Button>
            </Left>
            <Body>
              <Text>Theme</Text>
            </Body>
            <Right>
              <Switch onValueChange={this.handleThemeChange} value={this.props.theme.preset === 'dark' ? false : true } />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="wifi" />
              </Button>
            </Left>
            <Body>
              <Text>Wi-Fi</Text>
            </Body>
            <Right>
              <Text>GeekyAnts</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="bluetooth" />
              </Button>
            </Left>
            <Body>
              <Text>Bluetooth</Text>
            </Body>
            <Right>
              <Text>On</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
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