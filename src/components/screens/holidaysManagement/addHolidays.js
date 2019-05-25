import React from 'react';
import { Text, View,Button } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import add from './add'
import update from './updateHoliday'
import remove from './removeHoliday'

export default createMaterialTopTabNavigator({
  ADD: { 
    screen: add
   },
   UPDATE: { 
    screen: update
  },
  REMOVE: { 
    screen: remove
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
