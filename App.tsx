import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Views from './src/utils/enums/views';
import Login from './src/views/login/login';
import Home from './src/views/home/home';
import {AlbumProvider} from './src/contexts/useAlbum';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AlbumProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={Views.Login}
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Views.Home}
            component={Home}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AlbumProvider>
  );
};

export default App;
