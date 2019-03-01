import React, { Component } from 'react';
import Login from './src/components/screens/Login/Login'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import Signup from './src/components/screens/Signup/Signup';

import Dashboard from './src/components/screens/Dashboard';

const RootStack = createStackNavigator(
  {
    Dashboard: Dashboard,
    Signup: Signup,
    login: Login
  },
  {
    headerMode: 'none'
  },
  {
    initialRouteName: 'Dashboard',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer >

      <Login />
    </AppContainer>;
  }
}