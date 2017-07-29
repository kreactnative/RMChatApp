import React, {Component} from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { Container, Header, Content, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import styles from './styles';

export default class Login extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
          <Container>
            <Header style={styles.header}>
              <Left/>
              <Body>
                <Title>RMChat</Title>
              </Body>
              <Right/>
            </Header>
            <Content>
            <Grid>
              <Row></Row>
              <Row></Row>
            </Grid>
            </Content>
          </Container>
        );
    }
}
