import React from 'react';
import {Button, StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../utils/colors';

function MyButton() {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>Continue</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MyButton;
