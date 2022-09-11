import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import colors from '../utils/colors';
type MyTextInputProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  isPassword?: boolean;
  onChangeText?: (text: string) => void;
};
function MyTextInput({
  label,
  value,
  placeholder,
  onChangeText,
  isPassword = false,
}: MyTextInputProps) {
  return (
    <View>
      {Boolean(label) && <Text style={styles.label}>{label}</Text>}
      <View style={styles.spacer} />
      <TextInput
        value={value}
        style={styles.input}
        placeholder={placeholder}
        autoCapitalize={'none'}
        secureTextEntry={isPassword}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.inputLabel,
  },
  spacer: {
    marginBottom: 2,
  },
  input: {
    //   backgroundColor: 'red',
    height: 45,
    width: '100%',
    borderColor: colors.inputBorder,
    // borderBottomWidth: 1,
    // borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    shadowColor: 'rgba(149, 157, 165, 0.2)',
    shadowOffset: {
      height: 8,
      width: 24,
    },
  },
});

export default MyTextInput;
