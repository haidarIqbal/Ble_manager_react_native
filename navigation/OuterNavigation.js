import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import Login from '../screens/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from '../screens/DetailsScreen';
const Stack = createNativeStackNavigator();

class OuterNavigation extends React.Component {
  render() {
    return (
      <>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            options={{
              headerShown: false,
            }}
            component={Login}
          />
          <Stack.Screen
            name="Details"
            options={{
              headerShown: false,
            }}
            component={DetailsScreen}
          />
        </Stack.Navigator>
      </>
    );
  }
}

export default OuterNavigation;
