
import React from 'react';
import { Text, View,Button } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import addEvent from './addEvent.js'
import updateEvent from './updateEvent.js'
import deleteEvent from './removeEvent.js'

export default createMaterialTopTabNavigator({
  Add: { 
    screen: addEvent
   },
  Update: { 
    screen: updateEvent
  },
  Remove: { 
    screen: deleteEvent
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

