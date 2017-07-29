import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';

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

const Router = createRouter(() => ({
  login: () => Login,
  signup: () => Signup,
  forgetPassword: () => ForgetPassword,
  friendsList: () => FriendsList,
  chat: () => Chat
}));

class RmChatApp extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content"/>
        <NavigationProvider router={Router}>
          <StackNavigation initialRoute={Router.getRoute('login') } />
        </NavigationProvider>
      </View>
    );
  }
}
export default RmChatApp;
