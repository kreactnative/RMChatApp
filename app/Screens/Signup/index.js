import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Image,
    Platform
} from 'react-native';
import {
  Container,
  Header,
  Form,
  Left,
  Item,
  List,
  Label,
  Input,
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
import styles from './styles';
import { IndicatorViewPager, PagerTitleIndicator } from 'rn-viewpager'

class Signup extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        bgColor: new Animated.Value(0)
    }

    _setBgColor = Animated.event([{bgColor: this.state.bgColor}])

    _renderTitleIndicator () {
        return (
            <PagerTitleIndicator
                style={styles.indicatorContainer}
                itemTextStyle={styles.indicatorText}
                selectedItemTextStyle={styles.indicatorSelectedText}
                selectedBorderStyle={styles.selectedBorderStyle}
                titles={['Personal', 'Profile', 'Login']}
            />
        )
    }

    _onPageScroll (scrollData) {
        let {offset, position} = scrollData
        if (position < 0 || position >= 2) return
        this._setBgColor({bgColor: offset + position})
    }

    render() {
      let bgColor = this.state.bgColor.interpolate({
          inputRange: [0, 1, 2],
          outputRange: ['hsl(187, 74%, 47%)', 'hsl(89, 47%, 54%)', 'hsl(12, 97%, 59%)']
      })
        return (
          <Container>
            <Header>
              <Left/>
              <Body>
                <Title>Signup</Title>
              </Body>
              <Right />
            </Header>
            <Content>
              <Animated.View style={{flex: 1, backgroundColor: bgColor, paddingTop: 2}} >
                  <IndicatorViewPager
                      style={{flex: 1, flexDirection: 'column-reverse'}}
                      indicator={this._renderTitleIndicator()}
                      onPageScroll={this._onPageScroll.bind(this)}
                  >
                    <View style={{backgroundColor:'cadetblue'}}>
                        <Text>page one</Text>
                    </View>
                    <View style={{backgroundColor:'cornflowerblue'}}>
                        <Text>page two</Text>
                    </View>
                    <View style={{backgroundColor:'#1AA094'}}>
                        <Text>page three</Text>
                    </View>
                  </IndicatorViewPager>
              </Animated.View>
            </Content>
          </Container>
        );
    }
}
export default Signup;
