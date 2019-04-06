import React from 'react';
import { SafeAreaView, ScrollView, Image, ImageBackground } from 'react-native'
import Login from './components/screens/Login';
import { Icon } from 'native-base';
import { createDrawerNavigator, createAppContainer, DrawerItems } from 'react-navigation'
import Dashboard from './components/screens/Dashboard';
import Signup from './components/screens/Signup';
import Events from './components/screens/Events';
import NewRequest from './components/screens/NewRequest';
import AttendanceTime from './components/screens/AttendanceTime';
import Setting from './components/screens/Setting';
import History from './components/screens/History';
import Displacements from './components/screens/Displacements';
import userPic from './assets/img/userPic.jpg';
import bgm from './assets/img/b.jpg';
import Pm from './components/screens/Pm';
import leaveIcon from  './assets/img/leaveIcon.png'
import AttendanceTimeIcon from './assets/img/attendanceTime.png'
import DisplacementsLogo from './assets/img/DisplacementsLogo.png';
import pmLogo from './assets/img/pm.png'
import eventsLogo from './assets/img/eventsLogo.png'
export default class App extends React.Component  {
  render() {
    return (
      <AppContainer />
    )
  }
}
const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <ImageBackground style={{ height: 160, alignItems: 'center', justifyContent: 'center' }} source={bgm}>
      <Image source={userPic} style={{ borderRadius: 100, height: 145, width: 145 , borderWidth:2, borderColor:'#FFFCFD'}}></Image>
    </ImageBackground>
    <ScrollView style={{ backgroundColor: '#FFFCFD' }}>
      <DrawerItems {...props}
      />
    </ScrollView>
  </SafeAreaView>
)
const AppDrawNavigator = createDrawerNavigator(
  {
    'Dashboard': {
      screen: Dashboard,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Icon name="md-home" />
        )
      })
    },
    
    'Leave History': {
      screen: History,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Image source={leaveIcon} style={{height:25,width:25}} />
          )
      })
    },

    'Attendance time': {
      screen: AttendanceTime,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Image source={AttendanceTimeIcon} style={{height:32,width:32}} />
          )
      })
    },

    'Displacements': {
      screen: Displacements,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Image source={DisplacementsLogo} style={{height:26,width:26}} />
          )
      })
    },
   
    'New request': {
      screen: NewRequest,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Icon name="md-add"  />
        )
      })
    },

    'Project management': {
      screen: Pm,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Image source={pmLogo} style={{width:32,height:32}}  />
          )
      })
    },

      Events: {
      screen: Events,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Image source={eventsLogo} style={{width:35,height:35}}  />
          )
      })
    },

    Settings: {
      screen: Setting,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Icon name="md-settings" size={20}  />
        )
      })
    },

    Logout: {
      screen: Login,
      navigationOptions: ({ navigation }) => ({
        drawerLockMode: "locked-closed",
        drawerIcon: (
          <Icon name="md-log-out" />
        )
      })
    },

    Signup: {
      screen: Signup,
      navigationOptions: ({ navigation }) => ({
        drawerLockMode: "locked-closed",
        drawerLabel: () => null,
      })
    },
  },
  {
    initialRouteName: "Logout",
    contentComponent: CustomDrawerComponent
  },
);

const AppContainer = createAppContainer(AppDrawNavigator);

