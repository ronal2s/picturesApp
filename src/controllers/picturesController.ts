import Realm, { Collection } from 'realm';
import Collections from '../utils/enums/collections';
import databaseOptions from '../utils/realm/schemas';

class AlbumController {
  // function create(name: string) {
  //     // const realm = await Realm.open(databaseOptions as any);
  //     // (await realm.open(databaseOptions)).write(() => )
  //     // realm.
  //     // return 1;
  // }

  async function add(userId: string, name: string) {
    const realm = await Realm.open(databaseOptions as any);
    realm.write(() => {
        realm.create(Collections.Album, {
            _id: + new Date(),
            userId,
            name,
        })
    })
  }
}

export default AlbumController;
