import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import AddIcon from '../../assets/icons/add.svg';

import colors from '../utils/colors';

function FloatingButton({text, onPress}: {text: string; onPress: () => void}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <AddIcon width={20} height={20} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    width: 50,
    height: 50,
    position: 'absolute',
    borderRadius: 50,
    top: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // right: 10,
    // bottom: 0,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FloatingButton;
