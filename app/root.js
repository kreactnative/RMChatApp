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

import Login from './Screens/Login'
import Signup from './Screens/Signup'
import ForgetPassword from './Screens/ForgetPassword'
import FriendsList from './Screens/FriendsList'
import Chat from './Screens/Chat'
import Channel from './Screens/Channel'

import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';


const Router = createRouter(() => ({
  login: () => Login,
  signup: () => Signup,
  forgetPassword: () => ForgetPassword,
  friendsList: () => FriendsList,
  chat: () => Chat,
  channel: () => Channel,
}));

class RmChatApp extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(platform)}>
        <View style={{ flex: 1 }}>
          <StatusBar barStyle="light-content"/>
          <NavigationProvider router={Router}>
            <StackNavigation initialRoute={Router.getRoute('login') } />
          </NavigationProvider>
        </View>
      </StyleProvider>
    );
  }
}
export default RmChatApp;
