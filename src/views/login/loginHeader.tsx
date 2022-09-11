import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

const dimensions = Dimensions.get('window');

function LoginHeader() {
  return <View style={styles.container} />;
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0E0E0',
    position: 'absolute',
    top: 0,
    height: dimensions.height,
    width: dimensions.width,
    // borderBottomEndRadius: 50,
    // borderBottomStartRadius: 50,
    transform: [{skewY: '45deg'}],
  },
});
export default LoginHeader;
