import React, { Component } from "react";
import { View, Text } from "react-native";
import Login from "./components/screens/Login";
import {
  SafeAreaView,
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";
import Dashboard from "./components/screens/Dashboard";
import Signup from "./components/screens/Signup";
import Events from "./components/screens/Events";
import NewRequest from "./components/screens/NewRequest";
import AttendanceTime from "./components/screens/AttendanceTime";
import Setting from "./components/screens/Setting";
import History from "./components/screens/History";
// import { View } from "native-base";

// const RootStack = createStackNavigator(
//   {
//     Home: {
//       screen: AttendanceTime,
//       navigationOptions: ({ navigation }) => ({
//         title: 'Testing Title',
//         headerStyle: {
//           backgroundColor: 'red'
//         },
//         headerTintColor: '#abc'
//       })
//     }
//     // AttendanceTime: AttendanceTime,
//     // History: History,
//     // Login: Login,
//     // Dashboard: Dashboard,
//     // Setting: Setting,
//     // NewRequest: NewRequest,
//     // Signup: Signup,
//     // Events: Events,
//   });

// const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

class Test extends React.Component {
  render() {
    return (
      <View>
        <Text>Hello there</Text>
      </View>
    )
  }
}

class Screen2 extends React.Component {
  render() {
    return (
      <View>
        <Text>This is screen 2</Text>
      </View>
    )
  }
}

const AppStackNavigator = createStackNavigator(
  {
    Home: Login,
    Dahsboard: Dashboard,
    Checks: AttendanceTime
  },
  {
    initialRouteName: "Checks"
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "orange"
      }
    }
  }
);

const AppDrawNavigator = createDrawerNavigator(
  {
    Home: Login,
    Dahsboard: Test,
    Other: Screen2
  },
  {
    initialRouteName: "Other"
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "orange"
      }
    }
  }
);

const AppContainer = createAppContainer(AppDrawNavigator);
