const React = require('react-native');

const { StyleSheet, Dimensions } = React;
let {height, width} = Dimensions.get('window');


export default {
  container: {
    backgroundColor: '#FBFAFA',

  },
  headerContainer:{
    height: height/3,
    top: -1,
  },
  leftContainer:{
    flex: 1,
  },
  rightContainer:{
    flex: 1,
  },
  bodyContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    //borderWidth: 3,
    width: width-20,
  },
  contentCotainer:{
    flex: 1,
    backgroundColor: '#fff',
    top: -1,
  },
  logo:{
    fontSize: 100,
    color: 'white',
  },
  textUserLogin:{
    fontSize: 14,
    color: 'white',
  }
};
