import React from 'react';
import { SafeAreaView, ScrollView, Image, ImageBackground, TouchableHighlight, AsyncStorage, Button } from 'react-native'
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator, createAppContainer, DrawerItems } from 'react-navigation'
import { Icon, View } from 'native-base';

import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import AuthenticationLoading from "./components/screens/AuthenticationLoading";
import Dashboard from './components/screens/Dashboard';
import Events from './components/screens/Events';
import NewRequest from './components/screens/NewRequest';
import AttendanceTime from './components/screens/AttendanceTime';
import Setting from './components/screens/Setting';
import History from './components/screens/History';
import Avatar from './components/screens/Avatar';
import Displacements from './components/screens/Displacements';
import Pm from './components/screens/Pm';

import { logout } from './services/services';

import pmLogo from './assets/img/pm.png'
import userPic from './assets/img/userPic.jpg';
import bgm from './assets/img/background.jpg';
import eventsLogo from './assets/img/eventsLogo.png'
import leaveIcon from './assets/img/leaveIcon.png'
import AttendanceTimeIcon from './assets/img/attendanceTime.png'
import DisplacementsLogo from './assets/img/DisplacementsLogo.png';
import logoutIcon from './assets/img/sign-out.svg';

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    )
  }
}

/**
 * Creating a stack navigator for authentication screens
 */
const AuthStack = createStackNavigator({
  'Login': {
    screen: Login,
    navigationOptions: () => ({
      header: null
    })
  }
});

/**
 * Customizing Drawer navigator view
 * @param {*} props 
 */
const CustomDrawerComponent = (props) => {

  const _signOutAsync = () => {
    logout(props.navigation);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground style={{ height: 160, alignItems: 'center', justifyContent: 'center' }} source={bgm}>
        <TouchableHighlight onPress={() => props.navigation.navigate('Settings')}>
          <Image source={userPic} style={{ borderRadius: 100, height: 140, width: 140, borderWidth: 2, borderColor: '#104E77' }}></Image>
        </TouchableHighlight>
      </ImageBackground>
      <ScrollView style={{ backgroundColor: '#F2F7F9' }}>
        <DrawerItems {...props} />
        <Button title="Logout" onPress={() => _signOutAsync()} />
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * Creating Drawer Navigator
 */
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
          <Image source={leaveIcon} style={{ height: 25, width: 25 }} />
        )
      })
    },

    'Attendance time': {
      screen: AttendanceTime,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Image source={AttendanceTimeIcon} style={{ height: 32, width: 32 }} />
        )
      })
    },

    'Travels': {
      screen: Displacements,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Image source={DisplacementsLogo} style={{ height: 26, width: 26 }} />
        )
      })
    },

    'New request': {
      screen: NewRequest,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Icon name="md-add" />
        )
      })
    },

    'Project management': {
      screen: Pm,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Image source={pmLogo} style={{ width: 32, height: 32 }} />
        )
      })
    },

    'Events': {
      screen: Events,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Image source={eventsLogo} style={{ width: 35, height: 35 }} />
        )
      })
    },

    'Settings': {
      screen: Setting,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Icon name="md-settings" size={20} />
        )

      })
    },

    'Avatar': {
      screen: Avatar,
      navigationOptions: ({ navigation }) => ({
        drawerLockMode: "locked-closed",

        drawerLabel: () => null,
      })
    },

    'Signup': {
      screen: Signup,
      navigationOptions: ({ navigation }) => ({
        drawerLockMode: "locked-closed",
        drawerLabel: () => null,
      })
    },
  },
  {
    initialRouteName: "Dashboard",
    contentComponent: CustomDrawerComponent
  },
);

/**
 * Application Container
 */
const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthenticationLoading,
    App: AppDrawNavigator,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
));
