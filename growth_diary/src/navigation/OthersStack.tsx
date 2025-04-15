import OthersPage from '@/screens/OthersPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator();

const OthersNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="othersPage"
        component={OthersPage}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default OthersNavigation;
