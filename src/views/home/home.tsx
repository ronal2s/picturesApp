import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import AlbumCard from '../../components/albumCard';
import NewAlbumButton from '../../components/newAlbum';
import Spacer from '../../components/spacer';
import {useAlbum} from '../../contexts/useAlbum';
import Views from '../../utils/enums/views';
import {AlbumType} from '../../utils/realm/schemas';
import AddAlbumModal from './addAlbumModal';

function Home() {
  const navigation = useNavigation<any>();
  const {albums} = useAlbum();
  const [modalAlbum, setModalAlbum] = useState(false);

  const openModal = () => {
    setModalAlbum(true);
  };

  const closeModal = () => {
    setModalAlbum(false);
  };

  const openAlbum = async (album: AlbumType) => {
    navigation.navigate(Views.Album, {album});
  };

  const renderItem = ({index, item}: {index: number; item: AlbumType}) => {
    const isLastItem = index === albums.length - 1;
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{flexDirection: isLastItem ? 'row' : undefined}}>
        <AlbumCard key={item._id} album={item} onPress={openAlbum} />
        {isLastItem && <NewAlbumButton onPress={openModal} />}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Spacer vertical={10} />
      <FlatList data={albums} renderItem={renderItem} numColumns={3} />

      <AddAlbumModal open={modalAlbum} onClose={closeModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Home;
