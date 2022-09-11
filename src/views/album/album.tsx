import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FloatingButton from './floatingButton';
import colors from '../../utils/colors';
import {capitalizeText} from '../../utils/helpers';
import {AlbumType} from '../../utils/realm/schemas';

function Album() {
  const navigation = useNavigation();
  const route = useRoute();
  const {album} = route.params as {album: AlbumType};

  useEffect(() => {
    if (album.name) {
      navigation.setOptions({
        title: capitalizeText(album.name),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.container}>
      {!album.pictures?.length && (
        <View style={styles.emptyyBox}>
          <Text style={styles.emptyText}>No pictures in this album</Text>
        </View>
      )}
      <View></View>
      <FloatingButton />
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
});

export default Album;
