import Realm from 'realm';

class Pictures extends Realm.Object {}
// @ts-ignore
Pictures.schema = {
  name: 'Pictures',
  properties: {
    _id: 'number',
    albumId: 'number',
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
    _id: 'number',
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
};

export type {AlbumType};
export default databaseOptions;
