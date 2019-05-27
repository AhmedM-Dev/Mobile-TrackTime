
import { createMaterialTopTabNavigator } from 'react-navigation';
import LeaveRequest from './LeaveRequest'
import AttendanceCorrection from './Attendance correction'

export default createMaterialTopTabNavigator({
  'New Request': {
    screen: LeaveRequest
  },
  'Attendance correction Request': {
    screen: AttendanceCorrection
  },
},
  {
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'black',
      pressColor: '#2CA96E',
      tabStyle: {

      },

      indicatorStyle: {
        backgroundColor: '#2CA96E'
      },

      style: {
        backgroundColor: 'white'
      }
    },
  }
);