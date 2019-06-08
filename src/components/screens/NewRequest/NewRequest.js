
import { createMaterialTopTabNavigator } from 'react-navigation';
import Requests from './Requests';
import LeaveRequest from './LeaveRequest'
import AttendanceCorrection from './Attendance correction'

export default createMaterialTopTabNavigator({
  'Requests': {
    screen: Requests
  },
  'New Request': {
    screen: LeaveRequest
  },
  'Attendance correction Request': {
    screen: AttendanceCorrection
  },
},
  {
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'white',
      pressColor: 'green',
      tabStyle: {

      },

      indicatorStyle: {
        backgroundColor: 'green'
      },

      style: {
        backgroundColor: '#082E76'
      }
    },
  }
);
