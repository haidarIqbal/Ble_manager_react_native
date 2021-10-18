/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import OuterNavigation from './navigation/OuterNavigation';
const App = ({navigation}) => {
  return (
    <NavigationContainer>
      <OuterNavigation />
    </NavigationContainer>
  );
};

export default App;
