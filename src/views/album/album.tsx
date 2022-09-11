import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import FloatingButton from '../../components/floatingButton';
import {capitalizeText} from '../../utils/helpers';

function Album() {
  const navigation = useNavigation();
  const route = useRoute();
  const {album} = route.params as any;

  useEffect(() => {
    navigation.setOptions({
      title: capitalizeText(album.name),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.container}>
      <View></View>
      <FloatingButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'blue',
  },
});

export default Album;
