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

import styles from './styles';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state={
          messages: []
        }
        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.handleSend = this.handleSend.bind(this);
    }
    componentWillMount() {

    }
    handleSend(message = {}, rowID = null) {
     console.log(message,rowID);
     const now = moment().format();
     const rabbitMessage={
       type: 2,
       message : message.text,
       position : 'right',
       createAt: now,
       uniqueId: this.props.rabbitmq.deviceInfo.uniqueID,
     }
     //console.log(this.props);
     this.props.rabbitSendMessage(json2Str(rabbitMessage));
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
        const userId=this.props.rabbitmq.deviceInfo.uniqueID;
        this.props.rabbitmq.publicMessages.map((d, i) => {
          const messageServer=str2Json(d);

          let message={
            text: messageServer.message,
            position: (messageServer.uniqueId!=userId && messageServer.type!=1) ? 'left' : messageServer.position,
            date: moment(messageServer.createAt,'YYYY-MM-DD HH:mm:ss').toDate(),
            uniqueId: messageServer.uniqueId,
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
            <Content style={styles.messageContainer}>
            <GiftedMessenger
                ref={(c) => this._GiftedMessenger = c}
                styles={{
                  container: {
                    width: Dimensions.get('window').width,
                  },
                  bubbleLeft: {
                    backgroundColor: '#e6e6eb',
                    marginRight: 70,
                  },
                  bubbleRight: {
                    backgroundColor: '#007aff',
                    marginLeft: 70,
                  },
                }}
                autoFocus={false}
                messages={messages}
                handleSend={() => {}} //push message to json stack trace or locally save it
                onErrorButtonPress={() => {}}
                maxHeight={Dimensions.get('window').height - 90}
                loadEarlierMessagesButton={false}
                onLoadEarlierMessages={() => {}}
                handleSend={(message,rowID)=> { this.handleSend(message,rowID); }}
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
