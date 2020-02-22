import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import User from './pages/User';
import Main from './pages/Main';
import WebRepository from './pages/WebRepository';

const { Navigator, Screen } = createStackNavigator();

const routes = () => (
  <NavigationContainer>
    <Navigator
      initialRouteName="Main"
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#7159c1',
        },
      }}
    >
      <Screen
        name="User"
        component={User}
        options={({ route }) => ({ title: route.params.user.name })}
      />
      <Screen name="Main" component={Main} options={{ title: 'Usuários' }} />
      <Screen
        name="WebRepository"
        component={WebRepository}
        options={({ route }) => ({ title: route.params.name })}
      />
    </Navigator>
  </NavigationContainer>
);

export default routes;
