import React from 'react';
import {createContext, useEffect, useState} from 'react';
import Realm from 'realm';
import Collections from '../utils/enums/collections';
import databaseOptions, {AlbumType} from '../utils/realm/schemas';
import {getCurrentUser} from '../utils/secureStorage';

type AlbumContextType = {
  addAlbum: (album: AlbumType) => void;
  getAlbums: () => AlbumType[];
};

export const AlbumContext = createContext<AlbumContextType>({
  addAlbum: () => {},
  getAlbums: () => [],
});

export function AlbumProvider({children}: {children: React.ReactNode}) {
  const [realm, setRealm] = useState<Realm>();
  const [user, setUser] = useState();
  //   const user = 'ronal2s';
  useEffect(() => {
    setupRealm();
    getCurrentUser().then(results => {
      if (results) {
        console.log('current: ', results);
      }
    });
  }, []);

  const setupRealm = async () => {
    setRealm(await Realm.open(databaseOptions as any));
  };

  const addAlbum = (album: AlbumType) => {
    realm?.write(() => {
      realm.create(Collections.Album, album);
    });
  };

  const getAlbums = () => {
    const albums = realm?.objects(Collections.Album);
    return albums?.filtered(`user = ${user}`) as any as AlbumType[];
  };

  return (
    <AlbumContext.Provider value={{addAlbum, getAlbums}}>
      {children}
    </AlbumContext.Provider>
  );
}
