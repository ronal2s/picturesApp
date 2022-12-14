/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import MyButton from '../../components/button';
import DimissKeyboardView from '../../components/dimissKeyboardView';
import Spacer from '../../components/spacer';
import MyTextInput from '../../components/textInput';
import {useUser} from '../../contexts/useUser';
import colors from '../../utils/colors';
import Keys from '../../utils/enums/keys';
import Views from '../../utils/enums/views';
import {createUser, saveKeyValue, userExists} from '../../utils/secureStorage';
import LoginHeader from './loginHeader';
import LoginLogo from './loginLogo';

function Login() {
  const navigation = useNavigation<any>();
  const {setUser} = useUser();
  const [signInMode, setSignInMode] = useState(true);
  const [user, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onContinue = async () => {
    if (!user || !password) {
      Alert.alert('Username and password required');
    }

    const goHome = () => {
      setUser(user);
      saveKeyValue(Keys.CurrentUser, user);
      navigation.replace(Views.Home);
    };

    if (signInMode) {
      const exists = await userExists(user, password);
      if (exists) {
        goHome();
      } else {
        Alert.alert('Username or password are incorrect');
      }
    } else {
      const exists = await userExists(user, password);
      let response = null;
      if (!exists) {
        response = await createUser(user, password);
        Alert.alert('User created');
      }
      if (response || exists) {
        goHome();
      }
    }
  };

  const onChangeMode = () => {
    setSignInMode(!signInMode);
  };

  return (
    <DimissKeyboardView
      style={[
        styles.keyboardView,
        {backgroundColor: signInMode ? colors.primary : colors.secondary},
      ]}>
      <View style={styles.container}>
        <LoginHeader color={signInMode ? colors.secondary : colors.primary} />
        <LoginLogo />
        <Text
          style={{
            color: signInMode ? colors.primary : 'white',
            ...styles.title,
          }}>
          Pictures App
        </Text>
        <View style={styles.inputsContainer}>
          <MyTextInput
            label="Username"
            value={user}
            onChangeText={text => {
              setUsername(text.replace(/\s/g, ''));
            }}
          />
          <MyTextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            isPassword
          />
          <Spacer vertical={10} />
          <MyButton
            text={signInMode ? 'Sign in' : 'Sign up'}
            color={signInMode ? colors.primary : colors.secondary}
            labelColor={signInMode ? 'white' : colors.primary}
            onPress={onContinue}
          />
          <Button
            title={signInMode ? 'Create user' : 'Back'}
            color={signInMode ? colors.primary : colors.secondary}
            onPress={onChangeMode}
          />
        </View>
      </View>
    </DimissKeyboardView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
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
