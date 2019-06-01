
import checkTravels from './checkTravels';
import createTravel from './createTravel';

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
  });


