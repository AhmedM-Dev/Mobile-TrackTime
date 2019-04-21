import React from 'react';
import { SafeAreaView, ScrollView, Image, ImageBackground, AsyncStorage } from 'react-native'
import Login from './components/screens/Login';
import Logout from './components/screens/Logout';
import { Icon, View } from 'native-base';
import { createDrawerNavigator, createAppContainer, DrawerItems } from 'react-navigation'
import Dashboard from './components/screens/Dashboard';
import Signup from './components/screens/Signup';
import Events from './components/screens/Events';
import NewRequest from './components/screens/NewRequest';
import AttendanceTime from './components/screens/AttendanceTime';
import Setting from './components/screens/Setting';
import History from './components/screens/History';
import Avatar from './components/screens/Avatar';
import Displacements from './components/screens/Displacements';
import userPic from './assets/img/userPic.jpg';
import bgm from './assets/img/background.jpg';
import Pm from './components/screens/Pm';
import leaveIcon from './assets/img/leaveIcon.png'
import AttendanceTimeIcon from './assets/img/attendanceTime.png'
import DisplacementsLogo from './assets/img/DisplacementsLogo.png';
import pmLogo from './assets/img/pm.png';
import eventsLogo from './assets/img/eventsLogo.png';



export default class App extends React.Component {

  //   state = {
  //   jobTitle: "",
  // }

  componentWillMount() {
    // AsyncStorage.removeItem("user");
  }


  render() {

    // if((this.state.jobTitle === JSON.stringify("admin"))){
    //  return ( <AppContainer />)
    // }
    // else { return  ( <AppContainer2 />)
    // }

    return (
      <AppContainer />

    )
  }
}
const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <ImageBackground style={{ height: 160, alignItems: 'center', justifyContent: 'center' }} source={bgm}>
      <Image source={userPic} style={{ borderRadius: 100, height: 140, width: 140, borderWidth: 2, borderColor: '#104E77' }}></Image>
    </ImageBackground>
    <ScrollView style={{ backgroundColor: '#F2F7F9' }}>
      <DrawerItems {...props}
      />
    </ScrollView>
  </SafeAreaView>
)
const AppDrawNavigator = createDrawerNavigator(
  {

    'Dashboard': {
      screen: Dashboard,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Icon name="md-home" />
        )
      })
    },

    'Leave History': {
      screen: History,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Image source={leaveIcon} style={{ height: 25, width: 25 }} />
        )
      })
    },

    'Attendance time': {
      screen: AttendanceTime,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Image source={AttendanceTimeIcon} style={{ height: 32, width: 32 }} />
        )
      })
    },

    'Travels': {
      screen: Displacements,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Image source={DisplacementsLogo} style={{ height: 26, width: 26 }} />
        )
      })
    },

    'New request': {
      screen: NewRequest,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Icon name="md-add" />
        )
      })
    },

    'Project management': {
      screen: Pm,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Image source={pmLogo} style={{ width: 32, height: 32 }} />
        )
      })
    },

    Events: {
      screen: Events,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Image source={eventsLogo} style={{ width: 35, height: 35 }} />
        )
      })
    },

    Settings: {
      screen: Setting,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Icon name="md-settings" size={20} />
        )

      })
    },


    Login: {
      screen: Login,
      navigationOptions: ({ navigation }) => ({
        drawerLockMode: "locked-closed",
        drawerLabel: () => null,
      })
    },

    Logout: {
      screen: Login,
      params: {acion: "logout"},
      navigationOptions: ({ navigation }) => ({
        drawerLockMode: "locked-closed",
      })
    },

    Avatar: {
      screen: Avatar,
      navigationOptions: ({ navigation }) => ({
        drawerLockMode: "locked-closed",

        drawerLabel: () => null,
      })
    },

    Signup: {
      screen: Signup,
      navigationOptions: ({ navigation }) => ({
        drawerLockMode: "locked-closed",
        drawerLabel: () => null,
      })
    },
  },


  {
    initialRouteName: "Login",
    contentComponent: CustomDrawerComponent
  },
);
// const AppDrawer = createDrawerNavigator(
//   {
//     Login: {
//       screen: Login,
//       navigationOptions: ({ navigation }) => ({
//         drawerLockMode: "locked-closed",
//         drawerLabel: () => null, 
//       })
//     },
//     'Dashboard': {
//       screen: Dashboard,
//       navigationOptions: ({ navigation }) => ({
//         drawerIcon: (
//           <Icon name="md-home" />
//         )
//       })
//     },

//     'Leave History': {
//       screen: History,
//       navigationOptions: ({ navigation }) => ({
//         drawerIcon: (
//           <Image source={leaveIcon} style={{ height: 25, width: 25 }} />
//         )
//       })
//     },
//   },
//   {
//     initialRouteName: "Dashboard",
//     contentComponent: CustomDrawerComponent
//   },
//   );

const AppContainer = createAppContainer(AppDrawNavigator)

// const AppContainer2=createAppContainer(AppDrawer)