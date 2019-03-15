import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import Login from './components/screens/Login';
import { SafeAreaView, createStackNavigator, createAppContainer } from 'react-navigation'
import Dashboard from './components/screens/Dashboard';
import Signup from './components/screens/Signup';
import Events from './components/screens/Events';
import NewRequest from './components/screens/NewRequest';
import AttendanceTime from './components/screens/AttendanceTime';
import Setting from './components/screens/Setting'
import History from './components/screens/History'


const RootStack = createStackNavigator(
  {
    AttendanceTime: AttendanceTime,
    History: History,
    Login: Login,
    Dashboard: Dashboard,
    Setting: Setting,
    NewRequest: NewRequest,
    Signup: Signup,
    Events: Events,
  },
  {
    headerMode: 'none'
  },
  {
    initialRouteName: 'Login',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return (
      <AppContainer >
        <StatusBar hidden />
        <Login />
      </AppContainer>
    )
  }
}