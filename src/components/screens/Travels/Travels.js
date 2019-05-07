
import checkTravels from './checkTravels'
import createTravel from './createTravel'
import React from 'react';

import { createMaterialTopTabNavigator } from 'react-navigation';


export default createMaterialTopTabNavigator({
  'Check my travels': { 
    screen: checkTravels
   },
  'Create a new travel': { 
    screen: createTravel 
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


