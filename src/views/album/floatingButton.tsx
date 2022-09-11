import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import AddIcon from '../../../assets/icons/camera.svg';

import colors from '../../utils/colors';
import {dimensions} from '../../utils/helpers';
import Spacer from '../../components/spacer';

const SIZE = 70;
const ICON_SIZE = 30;

function FloatingButton({onPress}: {onPress?: () => void}) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <AddIcon fill="white" width={ICON_SIZE} height={ICON_SIZE} />
        <Spacer horizontal={5} />
        <Text style={styles.text}>Open camera</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: dimensions.width,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    width: SIZE * 2.2,
    height: SIZE - 10,
    borderRadius: SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FloatingButton;
