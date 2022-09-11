import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import LogoutIcon from '../../../assets/icons/logout.svg';
import AlbumCard from '../../components/albumCard';
import FloatingButton from '../../components/floatingButton';
import NewAlbumButton from '../../components/newAlbum';
import Spacer from '../../components/spacer';
import {useAlbum} from '../../contexts/useAlbum';
import {useUser} from '../../contexts/useUser';
import colors from '../../utils/colors';
import Keys from '../../utils/enums/keys';
import Views from '../../utils/enums/views';
import {AlbumType} from '../../utils/realm/schemas';
import AddAlbumModal from './addAlbumModal';

const ICON_SIZE = 25;

function Home() {
  const navigation = useNavigation<any>();
  const {user, signOut} = useUser();
  const {albums} = useAlbum();
  const [modalAlbum, setModalAlbum] = useState(false);

  useEffect(() => {
    if (!user) {
      navigation.replace(Views.Login);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const openModal = () => {
    setModalAlbum(true);
  };

  const closeModal = () => {
    setModalAlbum(false);
  };

  const openAlbum = async (album: AlbumType) => {
    navigation.navigate(Views.Album, {albumId: album._id});
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
      <FlatList
        data={albums}
        renderItem={renderItem}
        numColumns={3}
        ListEmptyComponent={<NewAlbumButton onPress={openModal} />}
      />
      <FloatingButton
        icon={<LogoutIcon fill="white" width={ICON_SIZE} height={ICON_SIZE} />}
        text="Sign out"
        onPress={signOut}
        color={colors.red}
      />
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
