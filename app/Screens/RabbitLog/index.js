import React, { Component } from 'react';
import {
  Container,
  Header,
  Left,
  List,
  ListItem,
  Button,
  Icon,
  Body,
  Title,
  Right,
  Content,
  Drawer,
  Text,
  Thumbnail,
} from 'native-base';

import {
  StyleSheet,
  View,
  ScrollView
} from 'react-native';

import moment from 'moment';
import { connect } from 'react-redux';

import SideBar from '../../components/SideBar';
import { GiftedChat } from 'react-native-gifted-chat';

import { rabbitSendMessage } from '../../actions/rabbitmq';
import { json2Str, str2Json } from '../../util';

class RabbitLog extends Component {
    constructor(props) {
        super(props);
        this.state={
          messages: [],
        };
        this.closeDrawer = this.closeDrawer.bind(this);
        this._renderListRabbitLog = this._renderListRabbitLog.bind(this);
    }
    componentWillMount() {
      this.setState({
        messages: [
          {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://facebook.github.io/react/img/logo_og.png',
            },
          },
        ],
      });
    }
    onSend(messages = []) {
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }));
    }
    openDrawer() {
      this._drawer._root.open();
    }
    closeDrawer() {
      this._drawer._root.close();
    }

    _renderListRabbitLog (rabbitmq){
      console.log(rabbitmq);
      if(rabbitmq && rabbitmq.publicMessages){
        console.log(rabbitmq.publicMessages);
        return rabbitmq.publicMessages.map((d, i) => {
          return (
            <ListItem avatar key={i}>
              <Left>
                <Thumbnail source={{ uri: 'http://img1.jurko.net/avatar_6736.gif' }} />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>{d}</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
           )
        })
      }
      return null;
    }
    render() {
      console.log(this.props.rabbitmq.publicMessages);
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
                <Title>Rabbit Logs</Title>
              </Body>
              <Right />
            </Header>
            <Content>
              {/*<List>
                { this._renderListRabbitLog(this.props.rabbitmq) }
              </List>
              */}
              <GiftedChat
                messages={this.state.messages}
                onSend={(messages) => this.onSend(messages)}
                user={{
                  _id: 1,
                }}
              />
            </Content>
          </Container>
          </Drawer>
        );
    }
}

const bindActions = (dispatch) => ({
  rabbitSendMessage: message => dispatch(rabbitSendMessage(message)),
});

const mapStateToProps = (state) => {
  return {
    rabbitmq: state.rabbitmq,
  }
};

export default connect(mapStateToProps, bindActions)(RabbitLog);
