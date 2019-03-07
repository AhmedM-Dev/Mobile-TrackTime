import React, { Component } from 'react';
import Login from './components/screens/Login';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import Signup from './components/screens/Signup';
import Events from './components/screens/Events';

import Dashboard from './components/screens/Dashboard';
import NewRequest from './components/screens/NewRequest';

const RootStack = createStackNavigator(
  { 
    NewRequest: NewRequest,
    Events: Events,
    Dashboard: Dashboard,
    Login: Login,
    Signup: Signup,
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
    return <AppContainer >

      <Login />
    </AppContainer>;
  }
}