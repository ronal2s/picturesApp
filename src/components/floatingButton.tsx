import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';

import colors from '../utils/colors';
import {dimensions} from '../utils/helpers';
import Spacer from './spacer';

const SIZE = 70;

type FloatingButtonProps = {
  onPress: () => void;
  icon: any;
  text: string;
};

function FloatingButton({onPress, icon, text}: FloatingButtonProps) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        {Boolean(icon) && icon}
        {Boolean(icon) && <Spacer horizontal={5} />}
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: dimensions.width,
    position: 'absolute',
    alignItems: 'center',
    bottom: 10,
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
