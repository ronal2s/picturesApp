import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PictureIcon from '../../assets/icons/mountain.svg';
import colors from '../utils/colors';
import {capitalizeText, dimensions} from '../utils/helpers';
import {AlbumType} from '../utils/realm/schemas';

const ICON_SIZE = 40;
const BOX_SIZE = dimensions.width * 0.3;

type AlbumCardProps = {
  album: AlbumType;
  onPress: (album: AlbumType) => void;
};

function AlbumCard({album, onPress}: AlbumCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(album)}>
      <View style={styles.box}>
        <PictureIcon fill="white" width={ICON_SIZE} height={ICON_SIZE} />
      </View>
      <Text style={styles.text}>{capitalizeText(album.name)}</Text>
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

export default AlbumCard;
