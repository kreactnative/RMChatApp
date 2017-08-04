import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';

import { StyleProvider } from 'native-base';

import {
  createRouter,
  NavigationProvider,
  StackNavigation
} from '@expo/ex-navigation';

import { Provider } from 'react-redux';

import Login from './Screens/Login';
import Signup from './Screens/Signup';
import ForgetPassword from './Screens/ForgetPassword';
import FriendsList from './Screens/FriendsList';
import Chat from './Screens/Chat';
import Channel from './Screens/Channel';
import RabbitLog from './Screens/RabbitLog';

import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

import configureStore from './config/configureStore';


const Router = createRouter(() => ({
  login: () => Login,
  signup: () => Signup,
  forgetPassword: () => ForgetPassword,
  friendsList: () => FriendsList,
  chat: () => Chat,
  channel: () => Channel,
  rabbitlog: () => RabbitLog,
}));

class RmChatApp extends Component {
  constructor(props){
    super(props);
    console.disableYellowBox = true;
    console.ignoredYellowBox = true;
    console.ignoredYellowBox = ['Warning: Each', "Warning: Failed prop type"];
  }
  render() {
    const store = configureStore();
    console.log(store);
    return (
      <Provider store={ store }>
        <StyleProvider style={getTheme(platform)}>
          <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content"/>
            <NavigationProvider router={Router}>
              <StackNavigation initialRoute={Router.getRoute('chat') } />
            </NavigationProvider>
          </View>
        </StyleProvider>
      </Provider>
    );
  }
}
export default RmChatApp;
