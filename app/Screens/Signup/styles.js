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
  contentContainer:{
    marginTop: 500,
  },
  indicatorContainer: {
      backgroundColor: 0x00000020,
      height: 48
  },
  indicatorText: {
      fontSize: 14,
      color: 0xFFFFFF99
  },
  indicatorSelectedText: {
      fontSize: 14,
      color: 0xFFFFFFFF
  },
  selectedBorderStyle: {
      height: 3,
      backgroundColor: 'white'
  },
  statusBar: {
      height: 24,
      backgroundColor: 0x00000044
  },
  toolbarContainer: {
      height: 56,
      backgroundColor: 0x00000020,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16
  },
  backImg: {
      width: 16,
      height: 17
  },
  titleTxt: {
      marginLeft: 36,
      color: 'white',
      fontSize: 20
  }
};
