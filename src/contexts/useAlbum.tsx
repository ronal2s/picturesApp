import React, {createContext, useContext, useEffect, useState} from 'react';
import Realm from 'realm';
import Collections from '../utils/enums/collections';
import databaseOptions, {AlbumType, PicturesType} from '../utils/realm/schemas';
import {useUser} from './useUser';

type AlbumContextType = {
  addAlbum: (album: AlbumType) => void;
  addPicture: (picture: PicturesType) => void;
  albums: AlbumType[];
};

export const AlbumContext = createContext<AlbumContextType>({
  addAlbum: () => {},
  addPicture: () => {},
  albums: [],
});

export function AlbumProvider({children}: {children: React.ReactNode}) {
  const [realm, setRealm] = useState<Realm>();
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const {user} = useUser();

  useEffect(() => {
    setupRealm();
    getData();
    if (user) {
      // realm?.removeListener('change', getData);
      // console.log('user: ', user);
      realm?.addListener('change', getData);
    }
    return () => {
      realm?.removeListener('change', getData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const setupRealm = async () => {
    setRealm(await Realm.open(databaseOptions as any));
  };

  const addAlbum = (album: AlbumType) => {
    realm?.write(() => {
      return realm.create(Collections.Album, album);
    });
  };

  const addPicture = (picture: PicturesType) => {
    realm?.write(() => {
      return realm.create(Collections.Pictures, picture);
    });
  };

  const getData = () => {
    const albumsObjects = realm
      ?.objects(Collections.Album)
      .filtered(`user = '${user}'`);
    if (albumsObjects?.length) {
      const albumsWithPictures = [...albumsObjects];
      for (let i = 0; i < albumsWithPictures.length; i++) {
        const album = albumsWithPictures[i] as any as AlbumType;
        const pictures = realm
          ?.objects(Collections.Pictures)
          .filtered(`albumId = ${album._id}`) as any as PicturesType[];

        if (pictures.length) {
          album.frontPictureBase64 = pictures[0].pictureBase64;
          album.pictures = pictures;
        }
      }
      setAlbums(albumsWithPictures as any as AlbumType[]);
    } else {
      setAlbums([]);
    }
  };

  return (
    <AlbumContext.Provider value={{addAlbum, addPicture, albums}}>
      {children}
    </AlbumContext.Provider>
  );
}

export const useAlbum = () => useContext(AlbumContext);
