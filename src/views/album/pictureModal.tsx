import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import colors from '../../utils/colors';
import {dimensions} from '../../utils/helpers';
import {PicturesType} from '../../utils/realm/schemas';

type PictureModalProps = {
  open: boolean;
  onClose: () => void;
  picture: PicturesType;
};

function PictureModal({open, onClose, picture}: PictureModalProps) {
  return (
    <ReactNativeModal
      isVisible={open}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="right">
      <View style={styles.modalContent}>
        <Image
          source={{uri: picture.pictureBase64}}
          style={[StyleSheet.absoluteFill, styles.picture]}
        />
      </View>
    </ReactNativeModal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    minHeight: dimensions.height * 0.7,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: colors.inputLabel,
  },
  picture: {
    borderRadius: 10,
  },
});

export default PictureModal;
