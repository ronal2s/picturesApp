import {useNavigation} from '@react-navigation/native';
import React, {createContext, useContext, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import Keys from '../utils/enums/keys';
import Views from '../utils/enums/views';

type UserContextType = {
  setUser: (user: string) => void;
  user: string;
  signOut: () => void;
};

export const UserContext = createContext<UserContextType>({
  setUser: () => {},
  user: '',
  signOut: () => {},
});

export function UserProvider({children}: {children: React.ReactNode}) {
  // const navigation = useNavigation<any>();
  const [user, setUser] = useState<string>('');

  const signOut = async () => {
    EncryptedStorage.removeItem(Keys.CurrentUser);
    // navigation.replace(Views.Login);
    setUser('');
  };

  return (
    <UserContext.Provider value={{user, setUser, signOut}}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
