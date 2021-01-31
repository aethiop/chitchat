import WebviewCrypto from 'react-native-webview-crypto';
import 'react-native-get-random-values';
import AsyncStorage from '@react-native-async-storage/async-storage';

import React, {useMemo, useEffect} from 'react';
import {StyleSheet} from 'react-native';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Authentication} from './src/contexts/Authentication';
import {AuthNavigator} from './src/navigators/AuthNavigator';
import {MainNavigator} from './src/navigators/MainNavigator';
import {User} from './src/contexts/User';
import useAuth from './src/hooks/useAuth';
import useHelper from './src/hooks/useHelper';

const Root = createStackNavigator();

const App = () => {
  const {auth, state, app, user, gun} = useAuth();
  const {actions} = useHelper();

  const renderScreen = () => {
    return (
      <Root.Navigator screenOptions={{headerShown: false}}>
        {state.user ? (
          <Root.Screen name={'Main'}>
            {() => (
              <User.Provider value={{user: state.user, actions: actions}}>
                <MainNavigator></MainNavigator>
              </User.Provider>
            )}
          </Root.Screen>
        ) : (
          <Root.Screen name="Authentication" component={AuthNavigator} />
        )}
      </Root.Navigator>
    );
  };

  return (
    <Authentication.Provider value={auth}>
      <NavigationContainer>
        <WebviewCrypto />
        {renderScreen()}
      </NavigationContainer>
    </Authentication.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
