import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FloatingButton from './floatingButton';
import colors from '../../utils/colors';
import {capitalizeText, dimensions} from '../../utils/helpers';
import {AlbumType, PicturesType} from '../../utils/realm/schemas';
import Views from '../../utils/enums/views';
import PictureModal from './pictureModal';

const BOX_SIZE = dimensions.width * 0.3;

function Album() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const {album} = route.params as {album: AlbumType};

  const [modalPicture, setModalPicture] = useState(false);
  const [picture, setPicture] = useState<PicturesType>();

  useEffect(() => {
    if (album.name) {
      navigation.setOptions({
        title: capitalizeText(album.name),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeModal = () => {
    setModalPicture(false);
  };
  const openPicture = (item: PicturesType) => {
    setPicture(item);
    setModalPicture(true);
  };

  const renderItem = ({item}: {item: PicturesType}) => {
    return (
      <TouchableOpacity onPress={() => openPicture(item)}>
        <Image source={{uri: item.pictureBase64}} style={styles.image} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {!album.pictures?.length && (
        <View style={styles.emptyyBox}>
          <Text style={styles.emptyText}>No pictures in this album</Text>
        </View>
      )}
      <FlatList data={album.pictures} numColumns={3} renderItem={renderItem} />
      <FloatingButton album={album} />
      {Boolean(picture) && (
        <PictureModal
          open={modalPicture}
          onClose={closeModal}
          picture={picture as PicturesType}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: colors.inputLabel,
    fontSize: 18,
  },
  image: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderRadius: 10,
    margin: 5,
  },
});

export default Album;
