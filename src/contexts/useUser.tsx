import React, {createContext, useContext, useState} from 'react';

type UserContextType = {
  setUser: (user: string) => void;
  user: string;
};

export const UserContext = createContext<UserContextType>({
  setUser: () => {},
  user: '',
});

export function UserProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<string>('');

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
