import React, { Component } from 'react';
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  Content,
  Drawer,
  Text
} from 'native-base';
import {
  StyleSheet,
  View,
  ScrollView
} from 'react-native';

import styles from './styles';

class SideBar extends Component {
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
          <Button transparent>
            <Text>Action</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
export default SideBar;
