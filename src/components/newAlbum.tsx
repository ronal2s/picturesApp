import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AddIcon from '../../assets/icons/add.svg';
import colors from '../utils/colors';
import {dimensions} from '../utils/helpers';

const ICON_SIZE = 40;
const BOX_SIZE = dimensions.width * 0.3;

type NewAlbumButtonTypes = {
  onPress?: () => void;
};

function NewAlbumButton({onPress}: NewAlbumButtonTypes) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.box}>
        <AddIcon width={ICON_SIZE} height={ICON_SIZE} />
      </View>
      <Text style={styles.text}>New Album</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    marginHorizontal: 5,
    marginBottom: 20,
  },
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: colors.inputLabel,
  },
});

export default NewAlbumButton;
