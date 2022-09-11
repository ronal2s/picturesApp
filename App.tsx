import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AlbumProvider} from './src/contexts/useAlbum';
import {UserProvider} from './src/contexts/useUser';
import Views from './src/utils/enums/views';
import Album from './src/views/album/album';
import Home from './src/views/home/home';
import Loading from './src/views/loading/loading';
import Login from './src/views/login/login';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <UserProvider>
      <AlbumProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={Views.Loading}
              component={Loading}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={Views.Login}
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={Views.Home}
              component={Home}
              // options={{headerShown: false}}
            />
            <Stack.Screen
              name={Views.Album}
              component={Album}
              // options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AlbumProvider>
    </UserProvider>
  );
};

export default App;
