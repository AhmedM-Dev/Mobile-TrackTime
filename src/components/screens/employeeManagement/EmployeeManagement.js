
import React from 'react';
import { Text, View,Button } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import addEmployee from './addEmployee.js'
import updateEmployee from './updateEmployee.js'
import deleteEmployee from './deleteEmployee.js'

export default createMaterialTopTabNavigator({
  Add: { 
    screen: addEmployee
   },
  Update: { 
    screen: updateEmployee
  },
  Remove: { 
    screen: deleteEmployee
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

