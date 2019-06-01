
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
    activeTintColor : 'white',
    inactiveTintColor:'white',
    pressColor :'#4470B2',
    tabStyle :{

    },
    indicatorStyle :{
      backgroundColor:'#4470B2'
    },
  
    style: {
      backgroundColor:'#082E76'
    },
  },
});

