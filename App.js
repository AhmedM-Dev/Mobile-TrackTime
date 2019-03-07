import React, { Component } from 'react';
import Login from './src/components/screens/Login/Login'
import { createStackNavigator, createAppContainer, cre } from 'react-navigation'
import Signup from './src/components/screens/Signup/Signup';

import Dashboard from './src/components/screens/Dashboard';
import events from './src/components/screens/events';

const RootStack = createStackNavigator(
  {
    login: Login,
    Signup: Signup,
    Dashboard: Dashboard,
    events:events,
  },
  {
    headerMode: 'none'
  },

  {
    initialRouteName: 'login',
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