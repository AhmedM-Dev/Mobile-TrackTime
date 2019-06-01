
import React from 'react';
import { Text, View,Button } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import Celebrations from './Celebrations.js'
import Leaves from './Leaves.js'

export default createMaterialTopTabNavigator({
  
  Celebrations: { 
    screen: Celebrations
   },
  Leaves: { 
    screen: Leaves
  },
},
{
  tabBarOptions: {
    activeTintColor : 'white',
    inactiveTintColor:'white',
    pressColor :'green',
    tabStyle :{

    },
    indicatorStyle :{
      backgroundColor:'green'
    },
  
    style: {
      backgroundColor:'#082E76'
    }
  },
});

