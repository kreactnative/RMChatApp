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

import SideBar from '../../components/SideBar';

export default class RabbitLog extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
    }
    openDrawer() {
      this._drawer._root.open();
    }
    closeDrawer() {
      this._drawer._root.close();
    }
    render() {
        return (
          <Drawer
            ref={(ref) => { this._drawer = ref; }}
            content={<SideBar navigator={this.props.navigator} />}
            onClose={() => this.closeDrawer()}
          >
          <Container>
            <Header>
              <Left>
                <Button
                  transparent
                  onPress={() => this.openDrawer()}
                >
                  <Icon name='menu' />
                </Button>
              </Left>
              <Body>
                <Title>Rabbit Log</Title>
              </Body>
              <Right />
            </Header>
            <Content>

            </Content>
          </Container>
          </Drawer>
        );
    }
}
