
import React from 'react';
import { Text, View,Button } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import LeaveRequest from './LeaveRequest'
import AttendanceCorrection from './Attendance correction'


 export default createMaterialTopTabNavigator({
    'Attendance correction Request': { 
    screen: AttendanceCorrection
   },
   'Leave request': { 
    screen: LeaveRequest
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




