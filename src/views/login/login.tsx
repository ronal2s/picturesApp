import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MyButton from '../../components/button';
import DimissKeyboardView from '../../components/dimissKeyboardView';
import Spacer from '../../components/spacer';
import MyTextInput from '../../components/textInput';
import colors from '../../utils/colors';
import LoginHeader from './loginHeader';
import LoginLogo from './loginLogo';

function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  return (
    <DimissKeyboardView style={styles.keyboardView}>
      <View style={styles.container}>
        <LoginHeader />
        <LoginLogo />
        <View style={styles.inputsContainer}>
          <MyTextInput label="Phone Number" onChangeText={setPhoneNumber} />
          <Spacer vertical={10} />
          <MyButton />
        </View>
      </View>
    </DimissKeyboardView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputsContainer: {
    width: 200,
    marginTop: 20,
  },
});

export default Login;
