import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import AddIcon from '../../../assets/icons/camera.svg';

import {useNavigation} from '@react-navigation/native';
import Spacer from '../../components/spacer';
import colors from '../../utils/colors';
import Views from '../../utils/enums/views';
import {dimensions} from '../../utils/helpers';

const SIZE = 70;
const ICON_SIZE = 30;

function FloatingButton({albumId}: {albumId: number}) {
  const navigation = useNavigation<any>();

  const onPress = () => {
    navigation.navigate(Views.Camera, {albumId});
  };

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
