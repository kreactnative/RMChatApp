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
  ScrollView,
  Dimensions,
  FlatList
} from 'react-native';

import GiftedMessenger from 'react-native-gifted-messenger'
import moment from 'moment';
import { connect } from 'react-redux';

import { rabbitSendMessage } from '../../actions/rabbitmq';
import { json2Str, str2Json } from '../../util';

import SideBar from '../../components/SideBar';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state={
          messages: []
        }
        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
    }
    componentWillMount() {
      this.setState({
        messages:[
          {
            text: 'ทดสอบภาษาไทย?',
            name: 'React-Bot',
            image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
            position: 'left',
            date: new Date(2016, 3, 14, 13, 0),
            uniqueId: Math.round(Math.random() * 10000),
          },
          {
            text: "Yes, and I use Gifted Messenger!",
            name: 'Awesome Developer',
            image: null,
            position: 'right',
            date: new Date(2016, 3, 14, 13, 1),
            uniqueId: Math.round(Math.random() * 10000),
          },

        ]
      })
    }
    openDrawer() {
      this._drawer._root.open();
    }
    closeDrawer() {
      this._drawer._root.close();
    }
    render() {
      let messages=[];
      if(this.props.rabbitmq && this.props.rabbitmq.publicMessages){
        this.props.rabbitmq.publicMessages.map((d, i) => {
          const messageServer=str2Json(d);
          let message={
            text: (messageServer && messageServer.message!=undefined) ? messageServer.message : d ,
            position: (messageServer && messageServer.type==1) ? 'center' : 'left',
            date: new Date(2016, 3, 14, 13, 0),
            uniqueId: Math.round(Math.random() * 10000),
          }

          messages.push(message);
        })
      }
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
                <Title>Chat</Title>
              </Body>
              <Right />
            </Header>
            <Content>
            <GiftedMessenger
                ref={(c) => this._GiftedMessenger = c}
                styles={{
                  container: {
                    width: Dimensions.get('window').width,
                  },
                  bubbleRight: {
                    marginLeft: 70,
                    backgroundColor: "#007aff",
                  },
                }}
                autoFocus={false}
                messages={messages}
                handleSend={() => {}} //push message to json stack trace or locally save it
                onErrorButtonPress={() => {}}
                maxHeight={Dimensions.get('window').height - 90}

                loadEarlierMessagesButton={false}
                onLoadEarlierMessages={() => {}}

                senderName="Becky"
                senderImage={null}
                onImagePress={() => {}}
                displayNames={true}
                placeholder={''}
                parseText={true}
                handlePhonePress={() => {}}
                handleUrlPress={() => {}}
                handleEmailPress={() => {}}

                isLoadingEarlierMessages={false}
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

export default connect(mapStateToProps, bindActions)(Chat);
