import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import SampleLogo from '../../../assets/login/lens.png';

function LoginLogo() {
  return (
    <View style={styles.box}>
      <Image source={SampleLogo} style={styles.picture} resizeMode="contain" />
    </View>
  );
}

const SIZE = 100;
const styles = StyleSheet.create({
  box: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'rgba(149, 157, 165, 0.2)',
    shadowOffset: {
      height: 8,
      width: 24,
    },
    justifyContent: 'center',
    alignItems: 'center',
  },
  picture: {
    width: SIZE - 40,
    height: SIZE - 40,
  },
});

export default LoginLogo;
