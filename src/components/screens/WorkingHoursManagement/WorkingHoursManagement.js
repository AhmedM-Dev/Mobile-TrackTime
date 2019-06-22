
import React from 'react';
import { Text, View, Button } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import add from './Add'
import view from './Update'

export default createMaterialTopTabNavigator({
  Add: {
    screen: add
  },
  View: {
    screen: view
  },
},
  {
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'white',
      pressColor: '#4470B2',
      tabStyle: {

      },
      indicatorStyle: {
        backgroundColor: '#4470B2'
      },

      style: {
        backgroundColor: '#082E76'
      },
    },
  });

