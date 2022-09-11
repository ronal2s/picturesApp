import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../utils/colors';

function MyButton({
  text,
  color = colors.primary,
  labelColor = 'white',
  onPress,
}: {
  text: string;
  color?: string;
  labelColor?: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: color}]}
      onPress={onPress}>
      <Text style={[styles.text, {color: labelColor}]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
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
