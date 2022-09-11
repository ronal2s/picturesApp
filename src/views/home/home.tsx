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

  const renderItem = ({item}: {item: AlbumType}) => {
    return <AlbumCard key={item._id} album={item} onPress={openAlbum} />;
  };

  return (
    <View style={styles.container}>
      <Spacer vertical={10} />
      <FlatList
        data={albums}
        renderItem={renderItem}
        numColumns={3}
        ListFooterComponent={<NewAlbumButton onPress={openModal} />}
      />
      <AddAlbumModal open={modalAlbum} onClose={closeModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    // backgroundColor: 'red',
  },
});
export default Home;
