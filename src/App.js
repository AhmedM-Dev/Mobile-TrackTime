import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, ScrollView, Image, ImageBackground, TouchableHighlight, Text, } from 'react-native';
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator, createAppContainer, DrawerItems } from 'react-navigation';
import { Icon, Badge, View } from 'native-base';
import { Button } from 'react-native-elements';
import { Provider } from 'react-redux';

import store from '../src/store';

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
import Pm from './components/screens/Pm';

import { logout } from './services/services';

import pmLogo from './assets/img/pm.png'
import userPic from './assets/img/userPic.jpg';
import bgm2 from './assets/img/background2.jpg';
import bgm from './assets/img/background.jpg';
import eventsLogo from './assets/img/eventsLogo.png'
import leaveIcon from './assets/img/leaveIcon.png'
import AttendanceTimeIcon from './assets/img/attendanceTime.png'
import DisplacementsLogo from './assets/img/DisplacementsLogo.png';
import { fetchDataFromAsyncStorage } from './services/services';

const AppContext = React.createContext({
  theme: {}
});

export default class App extends React.Component {
  render() {
    // console.log("store", store.getState().settingsReducer);
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
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



const mapStateToProps = state => {
  return {
    theme: state.settingsReducer.theme,
    user: state.authReducer.user,
    avatar: state.authReducer.avatar
  }
}

/**
 * Customizing Drawer navigator view
 * @param {*} props 
 */
const CustomDrawerComponent = connect(mapStateToProps)((props) => {

  const _signOutAsync = () => {
    logout(props.navigation);
  };

  const { background, activeBackgroundColor, activeLabelStyle, inactiveLabelStyle, logoutFontColor, logoutBackground, userBackground } = props.theme.menu;

  return (
    <AppContext.Provider value={{ theme: props.theme }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground style={{ height: 180, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }} source={props.theme.preset === 'light' ? bgm2 : bgm}>
          <TouchableHighlight onPress={() => props.navigation.navigate('Settings')}>
            <Image source={{ uri: props.avatar && props.avatar.photo }} style={{
              borderRadius: 100,
              height: 140,
              width: 140,
              borderWidth: 2,
              borderColor: '#104E77',
              left: -10,
              marginRight: 10
            }}></Image>
          </TouchableHighlight>
          <View style={{ width: 80 }}>
            <Text style={{ color: props.theme.fontColor }}>{props.user.displayName}</Text>
            <Text style={{ color: props.theme.fontColor }}>{props.user.job_title}</Text>
          </View>
        </ImageBackground>
        <ScrollView style={{ backgroundColor: background }}>
          <DrawerItems {...props}
            // labelStyle={{ color: props.theme.fontColor }}
            // activeTintColor='red' 
            activeBackgroundColor={activeBackgroundColor}
            // inactiveTintColor='red'
            //  inactiveBackgroundColor='transparent' 
            inactiveLabelStyle={{ color: inactiveLabelStyle }}
            activeLabelStyle={{ color: activeLabelStyle }}
          // activeLabelStyle={{color: 'red'}}
          />

          <Button
            icon={
              <Icon
                name="md-log-out"
                style={{ color: logoutFontColor, marginRight: 10, fontSize: 18 }}
              />
            }
            buttonStyle={{
              backgroundColor: logoutBackground,
              borderRadius: 0,
              width: 270,
              alignSelf: 'center',
            }}
            titleStyle={{
              color: logoutFontColor,
              top: -1
            }}
            title="Logout"
            onPress={() => _signOutAsync()}
          />
        </ScrollView>
      </SafeAreaView>
    </AppContext.Provider>
  );
});

// const itemColor = store.getState().settingsReducer.theme.menu.activeLabelStyle;

/**
 * Creating Drawer Navigator
 */
const AppDrawNavigator = createDrawerNavigator(
  {
    'Dashboard': {
      screen: Dashboard,
      navigationOptions: () => ({
        drawerIcon: (
          <AppContext.Consumer>
            {value => <Icon name="md-home" style={{ color: value.theme.menu.activeLabelStyle, fontSize: 22 }} />}
          </AppContext.Consumer>
        )
      })
    },

    'Leave History': {
      screen: History,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <AppContext.Consumer>
            {value => <Icon name="walk" style={{ color: value.theme.menu.activeLabelStyle, fontSize: 22 }} />}
          </AppContext.Consumer>
        )
      })
    },

    'Attendance time': {
      screen: AttendanceTime,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <AppContext.Consumer>
            {value => <Icon name="time" style={{ color: value.theme.menu.activeLabelStyle, fontSize: 22 }} />}
          </AppContext.Consumer>
        )
      })
    },

    'Travels': {
      screen: Displacements,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <AppContext.Consumer>
            {value => <Icon name="jet" style={{ color: value.theme.menu.activeLabelStyle, fontSize: 22 }} />}
          </AppContext.Consumer>
        )
      })
    },

    'New request': {
      screen: NewRequest,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <AppContext.Consumer>
            {value => <Icon name="md-add" style={{ color: value.theme.menu.activeLabelStyle, fontSize: 22 }} />}
          </AppContext.Consumer>
        )
      })
    },

    'Project management': {
      screen: Pm,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <AppContext.Consumer>
            {value => <Icon name="md-construct" style={{ color: value.theme.menu.activeLabelStyle, fontSize: 22 }} />}
          </AppContext.Consumer>
        )
      })
    },

    'Events': {
      screen: Events,

      navigationOptions: ({ navigation }) => ({

        drawerIcon: (
          <AppContext.Consumer>
            {value => <Icon name="calendar" style={{ color: value.theme.menu.activeLabelStyle, fontSize: 22 }} />}
          </AppContext.Consumer>
        ),

      })
    },

    'Settings': {
      screen: Setting,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <AppContext.Consumer>
            {value => <Icon name="md-settings" style={{ color: value.theme.menu.activeLabelStyle, fontSize: 22 }} />}
          </AppContext.Consumer>
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
