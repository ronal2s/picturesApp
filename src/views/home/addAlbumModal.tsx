import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import MyButton from '../../components/button';
import Spacer from '../../components/spacer';
import MyTextInput from '../../components/textInput';
import {useAlbum} from '../../contexts/useAlbum';
import {useUser} from '../../contexts/useUser';
import colors from '../../utils/colors';
import {dimensions} from '../../utils/helpers';

type AddAlbumModalProps = {
  open: boolean;
  onClose: () => void;
};

function AddAlbumModal({open, onClose}: AddAlbumModalProps) {
  const {addAlbum} = useAlbum();
  const {user} = useUser();
  const [name, setName] = useState('');

  const onCreateAlbum = async () => {
    try {
      await addAlbum({
        _id: +new Date(),
        user,
        name,
      });
      Alert.alert('Album created');
      onClose();
    } catch (error) {
      console.error(error);
      Alert.alert('An error has ocurred');
    }
  };

  return (
    <ReactNativeModal isVisible={open} onBackdropPress={onClose} avoidKeyboard>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Create new album</Text>
        <MyTextInput label="Album name" onChangeText={setName} />
        <Spacer vertical={10} />
        <MyButton text="Create Album" onPress={onCreateAlbum} />
      </View>
    </ReactNativeModal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    minHeight: dimensions.height / 4,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: colors.inputLabel,
  },
});

export default AddAlbumModal;
