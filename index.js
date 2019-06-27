/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import { API_URL } from './config';

console.disableYellowBox = true;

// global.API_URL = API_URL;

AppRegistry.registerComponent(appName, () => App);
