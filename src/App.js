import React from 'react';
import { SafeAreaView, ScrollView, Image, ImageBackground, TouchableHighlight, Text, } from 'react-native'
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator, createAppContainer, DrawerItems } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Badge, View } from 'native-base';
import { Button } from 'react-native-elements'
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import AuthenticationLoading from "./components/screens/AuthenticationLoading";
import Dashboard from './components/screens/Dashboard';
import Events from './components/screens/Events';
import NewRequest from './components/screens/NewRequest';
import AttendanceTime from './components/screens/AttendanceTime';
import Setting from './components/screens/Setting';
import History from './components/screens/History';
import Avatar from './components/screens/Avatar';
import Displacements from './components/screens/Travels';
import Notifications from './components/screens/Notifications';
import Pm from './components/screens/Pm';
import { logout } from './services/services';
import userPic from './assets/img/userPic.jpg';
import bgm from './assets/img/background.jpg';
import eventsLogo from './assets/img/eventsLogo.png'
import leaveIcon from './assets/img/leaveIcon.png'
import AttendanceTimeIcon from './assets/img/attendanceTime.png'
import DisplacementsLogo from './assets/img/DisplacementsLogo.png';
import { fetchDataFromAsyncStorage } from './services/services';
import Holidays from './components/screens/Holidays';
import Administration from './components/screens/Administration/adminMenu'
import addEvent from './components/screens/eventManagement/addEvent'
import addHolidays from './components/screens/holidaysManagement/addHolidays'
import adminIcon from './assets/img/Admin.png'
import addUser from './components/screens/employeeManagement/addEmployee'
import removeUser from './components/screens/employeeManagement/deleteEmployee'
import updateUser from './components/screens/employeeManagement/updateEmployee'
export default class App extends React.Component {




  state = {
    jobTitle: '',
    firstName: '',
    lastName: ''
  }
  componentWillMount() {
    fetchDataFromAsyncStorage('user')
      .then(user => {
        let connected = user;
        this.setState({
          jobTitle: connected.job_title,
          firstName: connected.first_name,
          lastName: connected.last_name,
        })
      })
      .catch(error => console.log(error));
  }
  render() {
    return (
      <AppContainer />
    )
  }
}

/**
 * Creating a stack navigator for authentication screens
 */
const AuthStack = createStackNavigator({
  'Login': {
    screen: Login,
    navigationOptions: () => ({
      header: null
    })
  }
});

/**
 * Customizing Drawer navigator view
 * @param {*} props 
 */
const CustomDrawerComponent = (props) => {

  const _signOutAsync = () => {
    logout(props.navigation);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{backgroundColor:'black' , height:100 ,flexDirection:'row' , justifyContent:'center',alignItems:'center'}}>
        <TouchableHighlight onPress={() => props.navigation.navigate('Settings')}>
          <Image source={userPic} style={{
            borderRadius: 100,
            height: 75,
            width: 75,
            borderWidth: 2,
            borderColor: '#ECECEC',
            marginRight:20
          }}></Image>
        </TouchableHighlight>
    <View style={{width:150}}>
    <Text style={{ color: 'white' }}>Asma ben Ahmed</Text>
        <Text style={{ color: '#ECECEC' }}>Admin </Text>
    </View>
      </View>
      <ScrollView style={{ backgroundColor: 'black' }}
      >
        <DrawerItems {...props}
        style={{
          borderWidth:1,
          borderColor:'white'
        }}
          // activeTintColor='red' 
          activeBackgroundColor='#1A6441'
          // inactiveTintColor='red'
          //  inactiveBackgroundColor='transparent' 
          inactiveLabelStyle={{ color: '#D2D1D1' }}
          activeLabelStyle={{ color: 'white' }}
        // activeLabelStyle={{color: 'red'}}
        />


        <Button
          icon={
            <Icon
              name="md-log-out"
              style={{ color: "#D4E8EE", marginRight: 10, fontSize: 20, left:-81 }}
            />
          }
          buttonStyle={{
            backgroundColor: "black",
            borderRadius: 0,
            width: 280,
            alignSelf: 'center',
          }}
          titleStyle={{
            color: 'white',
            top: -1, 
            left:-58
          }}
          title="Logout"
          onPress={() => _signOutAsync()}
        />


      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * Creating Drawer Navigator
 */



const AppDrawNavigator = createDrawerNavigator(
  {
    'Administration': {
      screen: Administration,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Image source={adminIcon} style={{ height: 18, width: 18 }} />
        )
    
      })
    },
    'Dashboard': {
      screen: Dashboard,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Icon name="md-home" style={{ color: 'white', fontSize: 20 }} />
        )
      })
    },

    'Leave history': {
      screen: History,
      navigationOptions: ({ navigation }) => ({

        drawerIcon: (
          <Image source={leaveIcon} style={{ height: 20, width: 20 }} />
        )
      })
    },

    'Attendance time': {
      screen: AttendanceTime,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Icon name="md-timer" style={{ color: 'white', fontSize: 20 }} />
        )
      })
    },

    'Travels': {
      screen: Displacements,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Image source={DisplacementsLogo} style={{ height: 18, width: 18 }} />
        )
      })
    },

    'New request': {
      screen: NewRequest,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Icon name="md-add" style={{ color: 'white', fontSize: 20 }} />
        )
      })
    },

    'Project management': {
      screen: Pm,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Icon name="md-construct" size={20} style={{ color: 'white', fontSize: 20 }} />
        )
      })
    },

    'Events': {
      screen: Events,

      navigationOptions: ({ navigation }) => ({

        drawerIcon: (
          <Image source={eventsLogo} style={{ width: 20, height: 20 }} />
        ),

      })
    },

     
    'Holidays': {
      screen: Holidays,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Icon name="md-happy" size={20} style={{ color: 'white', fontSize: 20 }} />
        )

      })
    },

    
    'Settings': {
      screen: Setting,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <Icon name="md-settings" size={20} style={{ color: 'white', fontSize: 20 }} />
        )

      })
    },


    'Avatar': {
      screen: Avatar,
      navigationOptions: ({ navigation }) => ({
        drawerLockMode: "locked-closed",

        drawerLabel: () => null,
      })
    },

    'addUser': {
      screen: addUser,
      navigationOptions: ({ navigation }) => ({
        drawerLockMode: "locked-closed",

        drawerLabel: () => null,
      })
    },
    'removeUser': {
      screen: removeUser,
      navigationOptions: ({ navigation }) => ({
        drawerLockMode: "locked-closed",

        drawerLabel: () => null,
      })
    },
    'updateUser': {
      screen: updateUser,
      navigationOptions: ({ navigation }) => ({
        drawerLockMode: "locked-closed",

        drawerLabel: () => null,
      })
    },
    'addEvent': {
      screen: addEvent,
      navigationOptions: ({ navigation }) => ({
        drawerLockMode: "locked-closed",

        drawerLabel: () => null,
      })
    },

    'addHolidays': {
      screen: addHolidays,
      navigationOptions: ({ navigation }) => ({
        drawerLockMode: "locked-closed",

        drawerLabel: () => null,
      })
    },

    'Notifications': {
      screen: Notifications,
      navigationOptions: ({ navigation }) => ({
        drawerLockMode: "locked-closed",
        drawerLabel: () => null,
      })
    },

    'Signup': {
      screen: Signup,
      navigationOptions: ({ navigation }) => ({
        drawerLockMode: "locked-closed",
        drawerLabel: () => null,
      })
    },
  },

  {
    initialRouteName: "Dashboard",
    contentComponent: CustomDrawerComponent

  },
);

/**
 * Application Container
 */
const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthenticationLoading,
    App: AppDrawNavigator,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
));
