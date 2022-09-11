import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import colors from '../../utils/colors';

const dimensions = Dimensions.get('window');

function LoginHeader({color = colors.secondary}: {color?: string}) {
  return <View style={[styles.container, {backgroundColor: color}]} />;
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    height: dimensions.height,
    width: dimensions.width,
    transform: [{skewY: '45deg'}],
  },
});
export default LoginHeader;
