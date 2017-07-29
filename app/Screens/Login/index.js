import React, {Component} from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Item,
  Label,
  Input,
  Body,
  Left,
  Right,
  Icon,
  Form,
  Text
} from "native-base";

import styles from './styles';



export default class Login extends Component {
    constructor(props) {
        super(props);
        this.login=this.login.bind(this);
    }
    login(){
      if(this.props.navigator)
        this.props.navigator.push('channel');
    }
    render() {
        return (
          <Container style={styles.container}>
            <Header style={styles.header}>
              <Left style={styles.leftContainer}/>
              <Body style={styles.bodyContainer}>
                <Icon name='person' style={styles.logo}/>
              </Body>
              <Right style={styles.leftContainer} />
            </Header>
            <Content>
              <Form>
                <Item floatingLabel>
                  <Label>Username</Label>
                  <Input />
                </Item>
                <Item floatingLabel last>
                  <Label>Password</Label>
                  <Input />
                </Item>
              </Form>
              <Button block style={{ margin: 15, marginTop: 50 }} onPress={this.login}>
                <Text>Sign In</Text>
              </Button>
            </Content>
          </Container>
        );
    }
}