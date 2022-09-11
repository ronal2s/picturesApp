import EncryptedStorage from 'react-native-encrypted-storage';
import Keys from './enums/keys';

async function createUser(user: string, pin: string) {
  try {
    const userList = await getUserList();
    userList.push({user, pin});
    await EncryptedStorage.setItem(Keys.UserList, JSON.stringify(userList));

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function getUserList(): Promise<Array<{user: string; pin: string}>> {
  try {
    const list = await EncryptedStorage.getItem(Keys.UserList);
    if (list !== undefined) {
      return JSON.parse(list as string);
    }
    return [];
  } catch (error) {
    return [];
  }
}

async function userExists(user: string, pin: string) {
  try {
    const list = await getUserList();
    return list.find(item => item.user === user && item.pin === pin);
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function removeAllUsers() {
  try {
    await EncryptedStorage.removeItem(Keys.UserList);
    return true;
  } catch (error) {
    return false;
  }
}

async function saveKeyValue(key: string, value: string) {
  try {
    await EncryptedStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function getCurrentUser() {
  try {
    return await EncryptedStorage.getItem(Keys.CurrentUser);
  } catch (error) {
    return null;
  }
}

export {
  createUser,
  getUserList,
  userExists,
  removeAllUsers,
  saveKeyValue,
  getCurrentUser,
};
