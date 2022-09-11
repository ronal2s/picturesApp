import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Spacer from '../../components/spacer';
import {useUser} from '../../contexts/useUser';
import colors from '../../utils/colors';
import Views from '../../utils/enums/views';
import {getCurrentUser} from '../../utils/secureStorage';
import LoginLogo from '../login/loginLogo';

function Loading() {
  const {setUser} = useUser();
  const navigation = useNavigation<any>();
  useEffect(() => {
    getCurrentUser().then(user => {
      if (user) {
        setUser(user);
        setTimeout(() => {
          navigation.replace(Views.Home);
        }, 2000);
      } else {
        setTimeout(() => {
          navigation.replace(Views.Login);
        }, 2000);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.container}>
      <LoginLogo />
      <Spacer vertical={8} />
      <ActivityIndicator color={colors.secondary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  text: {
    color: 'white',
    fontSize: 36,
    fontWeight: '200',
  },
});

export default Loading;
