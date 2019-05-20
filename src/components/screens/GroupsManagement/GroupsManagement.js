
import React from 'react';
import { Text, View,Button } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import addGroup from './addGroup.js'
import removeGroup from './removeGroup.js'
import updateGroup from './UpdateGroup'

export default createMaterialTopTabNavigator({
  Add: { 
    screen: addGroup
   },
   Update: { 
    screen: updateGroup
  },
  Remove: { 
    screen: removeGroup
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

