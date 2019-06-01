
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

