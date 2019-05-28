
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
    activeTintColor : 'black',
    inactiveTintColor:'black',
    pressColor :'#2CA96E',
    tabStyle :{

    },
    indicatorStyle :{
      backgroundColor:'#2CA96E'
    },
  
    style: {
      backgroundColor:'white'
    }
  },
});

