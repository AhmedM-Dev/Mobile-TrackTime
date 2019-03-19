import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import Login from './components/screens/Login';
import { createDrawerNavigator, createAppContainer } from 'react-navigation'
import Dashboard from './components/screens/Dashboard';
import Signup from './components/screens/Signup';
import Events from './components/screens/Events';
import NewRequest from './components/screens/NewRequest';
import AttendanceTime from './components/screens/AttendanceTime';
import Setting from './components/screens/Setting'
import History from './components/screens/History'
import Displacements from './components/screens/Displacements'


export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    )
  }
}

const AppDrawNavigator = createDrawerNavigator(
  {
    Dashboard: Dashboard,
    Login: {
      screen: Login,
      navigationOptions: ({ navigation }) => ({
        drawerLockMode: "locked-closed"
      })
    },
    NewRequest: NewRequest,
    Displacements: Displacements,
    History: History,
    Signup: {
      screen: Signup,
      navigationOptions: ({ navigation }) => ({
        drawerLockMode: "locked-closed"
      })
    },
    AttendanceTime: AttendanceTime,
    Events: Events,
    Setting: Setting,
  },
  {
    initialRouteName: "Login"
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "orange"
      }
    }
  }
);

const AppContainer = createAppContainer(AppDrawNavigator);