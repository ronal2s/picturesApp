import React, {createContext, useContext, useEffect, useState} from 'react';
import Realm from 'realm';
import Collections from '../utils/enums/collections';
import databaseOptions, {AlbumType, PicturesType} from '../utils/realm/schemas';
import {useUser} from './useUser';

type AlbumContextType = {
  addAlbum: (album: AlbumType) => void;
  albums: AlbumType[];
};

export const AlbumContext = createContext<AlbumContextType>({
  addAlbum: () => {},
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
      realm?.addListener('change', () => {
        console.log('Something changed');
        getData();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const setupRealm = async () => {
    setRealm(await Realm.open(databaseOptions as any));
  };

  const addAlbum = (album: AlbumType) => {
    realm?.write(() => {
      // return realm.create(Collections.Album, album);
      return realm.create(Collections.Album, album);
    });
  };

  const getData = () => {
    const albumsObjects = realm
      ?.objects(Collections.Album)
      .filtered(`user = '${user}'`);
    if (albumsObjects?.length) {
      for (let i = 0; i < albumsObjects?.length; i++) {
        const album = albumsObjects[i] as any as AlbumType;
        const pictures = realm
          ?.objects(Collections.Pictures)
          .filtered(`albumId = '${album._id}'`) as any as PicturesType[];
        if (pictures.length) {
          album.frontPictureBase64 = pictures[0].pictureBase64;
          album.pictures = pictures;
        }
      }
      setAlbums(albumsObjects as any as AlbumType[]);
    }
  };

  return (
    <AlbumContext.Provider value={{addAlbum, albums}}>
      {children}
    </AlbumContext.Provider>
  );
}

export const useAlbum = () => useContext(AlbumContext);
