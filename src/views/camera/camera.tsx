import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Button,
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Camera,
  CameraPermissionRequestResult,
  useCameraDevices,
} from 'react-native-vision-camera';
import MyButton from '../../components/button';
import {useAlbum} from '../../contexts/useAlbum';
var RNFS = require('react-native-fs');

import {useIsForeground} from '../../hooks/useIsForeground';
import colors from '../../utils/colors';

const SIZE_BUTTON = 80;

function CameraView() {
  const devices = useCameraDevices();
  const isAppForeground = useIsForeground();
  const route = useRoute();
  const navigation = useNavigation();
  const {addPicture} = useAlbum();
  const {albumId} = route.params as {albumId: number};
  const camera = useRef<Camera>(null);

  const [cameraPermission, setCameraPermissions] =
    useState<CameraPermissionRequestResult>();

  const [takenPictureUrl, setTakenPictureUrl] = useState<string>();
  const [takenPictureBase64Url, setTakenPictureBase64Url] = useState<string>();

  useEffect(() => {
    requestPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestPermissions = async () => {
    const permissions = await Camera.requestCameraPermission();
    setCameraPermissions(permissions);
    if (cameraPermission === 'denied') {
      Alert.alert(
        'Camera permissions denied',
        'Open app settings to provide it',
        [
          {
            text: 'Open settings',
            onPress: Linking.openSettings,
          },
          {
            text: 'Cancel',
          },
        ],
      );
    }
  };

  const takePicture = async () => {
    const photo = await camera.current?.takePhoto({
      qualityPrioritization: 'speed',
    });
    if (photo?.path) {
      const base64image = await RNFS.readFile(photo.path, 'base64');
      setTakenPictureUrl(photo.path);
      setTakenPictureBase64Url(`data:image/jpeg;base64,${base64image}`);

      //   const blob = await getBlob(photo?.path);
      //   console.log({blob});
    }
  };

  const savePicture = async () => {
    try {
      await addPicture({
        _id: +new Date(),
        albumId,
        pictureBase64: takenPictureBase64Url as string,
        latitude: 0,
        longitude: 0,
      });
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('An error has ocurred, try again later');
    }
  };

  const repeatPicture = () => {
    setTakenPictureUrl(undefined);
    setTakenPictureBase64Url(undefined);
  };

  if (cameraPermission === 'denied') {
    return (
      <View style={styles.permissions}>
        <Button title="Request permissions" onPress={requestPermissions} />
      </View>
    );
  }
  if (devices.back == null) {
    return (
      <View style={styles.container}>
        <Text style={styles.textDevice}>Must open a physical device</Text>
      </View>
    );
  }
  if (takenPictureUrl) {
    return (
      <SafeAreaView style={StyleSheet.absoluteFill}>
        <Image
          source={{uri: takenPictureUrl}}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonsWidth}>
            <MyButton text="Save picture" onPress={savePicture} />
            <Button
              title="Repeat"
              color={colors.white}
              onPress={repeatPicture}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <View style={StyleSheet.absoluteFill}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={devices.back}
        isActive={isAppForeground}
        photo
      />
      <TouchableOpacity style={styles.button} onPress={takePicture} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDevice: {
    color: colors.inputLabel,
    fontSize: 18,
  },
  button: {
    width: SIZE_BUTTON,
    height: SIZE_BUTTON,
    borderRadius: SIZE_BUTTON / 2,
    borderColor: colors.white,
    position: 'absolute',
    alignSelf: 'center',
    borderWidth: 5,
    bottom: 20,
  },
  buttonsContainer: {
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    bottom: 20,
  },
  buttonsWidth: {
    width: '50%',
  },
});

export default CameraView;
