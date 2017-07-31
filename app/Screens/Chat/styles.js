const React = require('react-native');

const { StyleSheet, Dimensions } = React;
let {height, width} = Dimensions.get('window');


export default {
  container: {
    backgroundColor: '#FBFAFA',

  },
  header:{
    height: height/2.5,

  },
  leftContainer:{
    flex:1,
  },
  rightContainer:{
    flex:1,
  },
  bodyContainer:{
    //width:250,
    //paddingLeft:70,
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  messageContainer:{
    backgroundColor: '#eeeeee'
  }
};
