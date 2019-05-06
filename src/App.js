import React from 'react';
import { SafeAreaView, ScrollView, Image, ImageBackground, TouchableHighlight, Text, } from 'react-native';
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator, createAppContainer, DrawerItems } from 'react-navigation';
import { Icon, Badge, View } from 'native-base';
import { Button } from 'react-native-elements';
import { Provider } from 'react-redux';

import store from '../src/store';

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
import Displacements from './components/screens/Travels';
import Pm from './components/screens/Pm';

import { logout } from './services/services';

import pmLogo from './assets/img/pm.png'
import userPic from './assets/img/userPic.jpg';
import bgm from './assets/img/background.jpg';
import eventsLogo from './assets/img/eventsLogo.png'
import leaveIcon from './assets/img/leaveIcon.png'
import AttendanceTimeIcon from './assets/img/attendanceTime.png'
import DisplacementsLogo from './assets/img/DisplacementsLogo.png';
import { fetchDataFromAsyncStorage } from './services/services';

const UserContext = React.createContext({
  user: {},
  attendances: [],
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
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
      <ImageBackground style={{ height: 180, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }} source={bgm}>
        <TouchableHighlight onPress={() => props.navigation.navigate('Settings')}>
          <Image source={userPic} style={{
            borderRadius: 100,
            height: 140,
            width: 140,
            borderWidth: 2,
            borderColor: '#104E77',
            left: -10,
            marginRight: 10
          }}></Image>
        </TouchableHighlight>
        <View style={{ width: 80 }}>
          <Text style={{ color: 'white' }}>Asma  </Text>
          <Text style={{ color: 'white' }}>ben Ahmed</Text>
          <Text style={{ color: '#AFC9D6' }}>Admin </Text>
        </View>
      </ImageBackground>
      <ScrollView style={{ backgroundColor: '#021630' }}
      >
        <DrawerItems {...props}
          // activeTintColor='red' 
          activeBackgroundColor='#092448'
          // inactiveTintColor='red'
          //  inactiveBackgroundColor='transparent' 
          inactiveLabelStyle={{ color: '#D2D1D1' }}
          activeLabelStyle={{ color: 'white' }}
        // activeLabelStyle={{color: 'red'}}
        />


        <Button
          icon={
            <Icon
              name="md-log-out"
              style={{ color: "#D4E8EE", marginRight: 10, fontSize: 18 }}
            />
          }
          buttonStyle={{
            backgroundColor: "#03234B",
            borderRadius: 0,
            width: 270,
            alignSelf: 'center',
          }}
          titleStyle={{
            color: '#D4E8EE',
            top: -1
          }}
          title="Logout"
          onPress={() => _signOutAsync()}
        />
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
          <Icon name="md-home" style={{ color: 'white', fontSize: 22 }} />
        )
      })
    },

    'Leave History': {
      screen: History,
      navigationOptions: ({ navigation }) => ({

        drawerIcon: (
          <Image source={leaveIcon} style={{ height: 22, width: 22 }} />
        )
      })
    },

    'Attendance time': {
      screen: AttendanceTime,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Image source={AttendanceTimeIcon} style={{ height: 18, width: 18 }} />
        )
      })
    },

    'Travels': {
      screen: Displacements,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Image source={DisplacementsLogo} style={{ height: 18, width: 18 }} />
        )
      })
    },

    'New request': {
      screen: NewRequest,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Icon name="md-add" style={{ color: 'white', fontSize: 22 }} />
        )
      })
    },

    'Project management': {
      screen: Pm,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Icon name="md-construct" size={20} style={{ color: 'white', fontSize: 22 }} />
        )
      })
    },

    'Events': {
      screen: Events,

      navigationOptions: ({ navigation }) => ({

        drawerIcon: (
          <Image source={eventsLogo} style={{ width: 22, height: 22 }} />
        ),

      })
    },

    'Settings': {                                                                                                                                                                                                                                                                                                                                                                                                                                                      
      screen: Setting,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Icon name="md-settings" size={20} style={{ color: 'white', fontSize: 22 }} />
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
