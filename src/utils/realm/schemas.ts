import Realm from 'realm';

class Pictures extends Realm.Object {}
// @ts-ignore
Pictures.schema = {
  name: 'Pictures',
  properties: {
    _id: 'int',
    albumId: 'int',
    pictureBase64: 'string',
    latitude: 'float',
    longitude: 'float',
  },
  primaryKey: '_id',
};

class Album extends Realm.Object {}
// @ts-ignore
Album.schema = {
  name: 'Album',
  properties: {
    _id: 'int',
    user: 'string',
    name: 'string',
  },
  primaryKey: '_id',
};

// @ts-ignore
// export default new Realm({schema: [Pictures, Album]});
const databaseOptions = {
  schema: [Pictures, Album],
};

type AlbumType = {
  _id: number;
  user: string;
  name: string;
  frontPictureBase64?: string;
  pictures?: PicturesType[];
};

type PicturesType = {
  _id: number;
  albumId: number;
  pictureBase64: string;
  latitude: number;
  longitude: number;
};

export type {AlbumType, PicturesType};
export default databaseOptions;
