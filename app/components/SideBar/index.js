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

class SideBar extends Component {
  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: '#fff', top: -1 }}
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
