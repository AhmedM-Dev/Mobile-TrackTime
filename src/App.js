import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, ScrollView, Image, ImageBackground, TouchableHighlight, Text, } from 'react-native';
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator, createAppContainer, DrawerItems } from 'react-navigation';
import { Icon, View } from 'native-base';
import { Button } from 'react-native-elements';
import { Provider } from 'react-redux';
import store from '../src/store';
import Administration from "./components/screens/Administration";
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import AuthenticationLoading from "./components/screens/AuthenticationLoading";
import Dashboard from './components/screens/Dashboard';
import Events from './components/screens/Events';
import NewRequest from './components/screens/NewRequest';
import AttendanceTime from './components/screens/AttendanceTime';
import AppIntro from './components/screens/AppIntro';
import Setting from './components/screens/Setting';
import History from './components/screens/History';
import Avatar from './components/screens/Avatar';
import Displacements from './components/screens/Travels';
import addHolidays from './components/screens/holidaysManagement/addHolidays';
import EmployeeManagement from './components/screens/employeeManagement/EmployeeManagement';
import addUser from './components/screens/employeeManagement/addEmployee';
import removeUser from './components/screens/employeeManagement/deleteEmployee';
import updateUser from './components/screens/employeeManagement/updateEmployee';
import Holidays from './components/screens/Holidays';
import GroupsManagement from './components/screens/GroupsManagement/GroupsManagement';
import EventsManagement from './components/screens/eventManagement/EventsManagement';
import addEvent from './components/screens/eventManagement/addEvent';
import removeEvent from './components/screens/eventManagement/removeEvent';
import updateEvent from './components/screens/eventManagement/updateEvent';
import Calendar from './components/screens/Calendar/Calendar';
import { logout } from './services/services';
import Notifications from './components/screens/Notifications';
import addWorkingHours from './components/screens/WorkingHoursManagement/Add'
import WorkingHoursManagement from './components/screens/WorkingHoursManagement'
import { logoutWithRedux } from './store/actions';
import NotificationsBell from './components/ui/NotificationsBell';
import ScoreFormula from './components/screens/ScoreFormula';

import Bulletin from './components/screens/Bulletin';

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

const mapDispatchToProps = dispatch => ({
  logoutWithRedux() { dispatch(logoutWithRedux()) }
});

/**
 * Customizing Drawer navigator view
 * @param {*} props 
 */
const CustomDrawerComponent = connect(mapStateToProps, mapDispatchToProps)((props) => {

  const _signOutAsync = () => {
    logout(props.navigation);
    props.logoutWithRedux();
  };


  if (!props.user.email) {
    return <></>
  } else {

    const menu = {
      ...props,
      items: props.user.businessRole === 'Administrator' ? props.items : props.items.filter(item => item.key !== 'Administration')
    }

    const { background, activeBackgroundColor, activeLabelStyle, inactiveLabelStyle, logoutFontColor, logoutBackground, userBackground } = props.theme.menu;

    return (
      <AppContext.Provider value={{ theme: props.theme }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ backgroundColor: '#020B1C', height: 120, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableHighlight onPress={() => props.navigation.navigate('Settings')}>
              <Image source={{ uri: props.avatar && props.avatar.photo }} style={{
                borderRadius: 100,
                height: 85,
                width: 85,
                borderWidth: 2,
                borderColor: '#ECECEC',
                marginRight: 20
              }}></Image>
            </TouchableHighlight>
            <View style={{ width: 150 }}>
              {/* <Text style={{ color: 'white' }}>{`${props.user.firstName} ${props.user.lastName}`}</Text> */}
              <Text style={{ color: 'white' }}>{props.user.firstName ? props.user.firstName : ''} {props.user.lastName ? props.user.lastName : ''}</Text>
              <Text style={{ color: 'white' }}>{props.user.jobTitle}</Text>
            </View>
          </View>
          <ScrollView style={{ backgroundColor: background }}>
            <DrawerItems {...menu}
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
                  style={{ color: logoutFontColor, marginRight: 10, fontSize: 18, left: -81 }}
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
                top: -1,
                left: -55
              }}
              title="Logout"
              onPress={() => _signOutAsync()}
            />
          </ScrollView>
        </SafeAreaView>
      </AppContext.Provider>
    );
  }

});

// const itemColor = store.getState().settingsReducer.theme.menu.activeLabelStyle;

/**
 * Creating Drawer Navigator
 */
const AppDrawNavigator = createDrawerNavigator(
  {
    'Administration': {
      screen: Administration,
      navigationOptions: () => ({
        drawerIcon: (
          <AppContext.Consumer>
            {value => <Icon name="md-keypad" style={{ color: value.theme.menu.activeLabelStyle, fontSize: 22 }} />}
          </AppContext.Consumer>
        )
      })
    },

    'Bulletin': {
      screen: Bulletin,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <AppContext.Consumer>
            {value => <Icon name="md-settings" style={{ color: value.theme.menu.activeLabelStyle, fontSize: value.theme.menu.fontSize }} />}
          </AppContext.Consumer>
        )
      })
    },

    'About TrackTime': {
      screen: AppIntro,
      navigationOptions: ({ navigation }) => ({
        drawerLockMode: "locked-closed",
        drawerIcon: (
          <AppContext.Consumer>
            {value => <Icon name="md-information" style={{ color: value.theme.menu.activeLabelStyle, fontSize: 35 }} />}
          </AppContext.Consumer>
        )
      })
    },

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

    'Attendances': {
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
            {value => <Icon name="md-navigate" style={{ color: value.theme.menu.activeLabelStyle, fontSize: 22 }} />}
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

    // 'Project management': {
    //   screen: Pm,
    //   navigationOptions: ({ navigation }) => ({
    //     drawerIcon: (
    //       <AppContext.Consumer>
    //         {value => <Icon name="md-construct" style={{ color: value.theme.menu.activeLabelStyle, fontSize: 22 }} />}
    //       </AppContext.Consumer>
    //     )
    //   })
    // },

    'Events': {
      screen: Events,

      navigationOptions: ({ navigation }) => ({

        drawerIcon: (
          <AppContext.Consumer>
            {value => <Icon name="md-bookmark" style={{ color: value.theme.menu.activeLabelStyle, fontSize: 22 }} />}
          </AppContext.Consumer>
        ),

      })
    },

    'Holidays': {
      screen: Holidays,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <AppContext.Consumer>
            {value => <Icon name="md-happy" size={20} style={{ color: value.theme.menu.activeLabelStyle, fontSize: 20 }} />}
          </AppContext.Consumer>
        )
      })
    },

    'Calendar': {
      screen: Calendar,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <AppContext.Consumer>
            {value => <Icon name="calendar" size={20} style={{ color: value.theme.menu.activeLabelStyle, fontSize: 20 }} />}
          </AppContext.Consumer>
        )
      })
    },

    'Notifications': {
      screen: Notifications,

      navigationOptions: ({ navigation }) => ({

        drawerIcon: (
          <View style={{ height: 50 }}>
            <View style={{ left: 200, top: 10 }}>
              <NotificationsBell />
            </View>
            <AppContext.Consumer>
              {value => <Icon name="md-notifications" style={{ color: value.theme.menu.activeLabelStyle, fontSize: 22, top: -30, left: 8 }} />}
            </AppContext.Consumer>
          </View>
        ),
        // navigationOptions: ({ navigation }) => ({
        //   drawerLabel: () => null,
        // })

      })
    },

    'Settings': {
      screen: Setting,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: (
          <AppContext.Consumer>
            {value => <Icon name="md-settings" style={{ color: value.theme.menu.activeLabelStyle, fontSize: value.theme.menu.fontSize }} />}
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

    'addUser': {
      screen: addUser,
      navigationOptions: ({ navigation }) => ({
        drawerLockMode: "locked-closed",
        drawerLabel: () => null,
      })
    },

    'EmployeeManagement': {
      screen: EmployeeManagement,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: () => null,
      })
    },

    'addWorkingHours': {
      screen: addWorkingHours,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: () => null,
      })
    },

    'removeUser': {
      screen: removeUser,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: () => null,
      })
    },
    'updateUser': {
      screen: updateUser,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: () => null,
      })
    },

    'removeEvent': {
      screen: removeEvent,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: () => null,
      })
    },

    'EventsManagement': {
      screen: EventsManagement,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: () => null,
      })
    },

    'whm': {
      screen: WorkingHoursManagement,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: () => null,
      })
    },

    'GroupsManagement': {
      screen: GroupsManagement,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: () => null,
      })
    },

    'updateEvent': {
      screen: updateEvent,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: () => null,
      })
    },

    'addEvent': {
      screen: addEvent,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: () => null,
      })
    },

    'addHolidays': {
      screen: addHolidays,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: () => null,
      })
    },

    'ScoreFormula': {
      screen: ScoreFormula,
      navigationOptions: ({ navigation }) => ({
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
