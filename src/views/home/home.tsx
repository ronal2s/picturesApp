import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import AlbumCard from '../../components/album';
import NewAlbumButton from '../../components/newAlbum';
import Spacer from '../../components/spacer';
import {useAlbum} from '../../contexts/useAlbum';
import {AlbumType} from '../../utils/realm/schemas';
import AddAlbumModal from './addAlbumModal';

function Home() {
  const {addAlbum, albums} = useAlbum();
  const [modalAlbum, setModalAlbum] = useState(false);
  console.log('Albums: ', albums);
  const openModal = () => {
    setModalAlbum(true);
  };

  const closeModal = () => {
    setModalAlbum(false);
  };
  // useEffect(() => {
  //   const albums = getAlbums();
  //   console.log({albums: albums[0]});
  // }, []);

  const onPress = async () => {
    // const test = await addAlbum({
    //   _id: +new Date(),
    //   name: 'test',
    //   user: 'ronal2s',
    // });
    // console.log({test});
  };

  const renderItem = ({item}: {item: AlbumType}) => {
    return <AlbumCard key={item._id} album={item} />;
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
      {/* <NewAlbumButton onPress={openModal} /> */}
      <AddAlbumModal open={modalAlbum} onClose={closeModal} />
      {/* <FloatingButton onPress={onPress} /> */}
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
