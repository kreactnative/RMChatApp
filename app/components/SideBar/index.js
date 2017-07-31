import React, { Component } from 'react';
import {
  Container,
  Header,
  Left,
  List,
  ListItem,
  Icon,
  Button,
  Body,
  Title,
  Right,
  Content,
  Drawer,
  Text,
  Switch
} from 'native-base';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import styles from './styles';

export default class SideBar extends Component {
  constructor(props){
    super(props)
    this._handleNavigate = this._handleNavigate.bind(this);
  }

  _handleNavigate(activeRouteName){
    if(this.props.navigator && activeRouteName)
      this.props.navigator.push(activeRouteName);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.headerContainer}>
          <Body style={styles.bodyContainer}>
            <Icon name='person' style={styles.logo}/>
            <View>
              <Text style={styles.textUserLogin}>kajaxnet@gmail.com</Text>
            </View>
          </Body>
        </Header>
        <Content
          bounces={false}
          style={styles.contentCotainer}
        >
        <List>
          <ListItem icon>
            <Left>
              <Icon style={styles.iconSideBar} name="plane" />
            </Left>
            <Body>
              <TouchableOpacity onPress={()=>{this._handleNavigate('channel');}}>
                <Text>Channel</Text>
              </TouchableOpacity>
            </Body>
            <Right/>
          </ListItem>
          <ListItem icon>
            <Left>
              <Icon style={styles.iconSideBar} name="wifi" />
            </Left>
            <Body>
              <TouchableOpacity onPress={() => {this._handleNavigate('friendsList');}}>
                <Text>Friends</Text>
              </TouchableOpacity>
            </Body>
            <Right/>
          </ListItem>
          <ListItem icon>
            <Left>
              <Icon style={styles.iconSideBar} name="plane" />
            </Left>
            <Body>
              <TouchableOpacity onPress={() => {this._handleNavigate('chat');}}>
                <Text>Chat</Text>
              </TouchableOpacity>
            </Body>
            <Right/>
          </ListItem>
          <ListItem icon>
            <Left>
              <Icon style={styles.iconSideBar} name="plane" />
            </Left>
            <Body>
              <TouchableOpacity onPress={() => {this._handleNavigate('rabbitlog');}}>
                <Text>Rabbit Logs</Text>
              </TouchableOpacity>
            </Body>
            <Right/>
          </ListItem>
          <ListItem icon>
            <Left>
              <Icon style={styles.iconSideBar} name="person" />
            </Left>
            <Body>
              <TouchableOpacity onPress={() => {this._handleNavigate('login');}}>
                <Text>Logout</Text>
              </TouchableOpacity>
            </Body>
            <Right/>
          </ListItem>
        </List>
        </Content>
      </Container>
    );
  }
}
