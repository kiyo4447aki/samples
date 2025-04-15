import TopPage from '@/screens/TopPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator();

const TopNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="topPage"
        component={TopPage}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default TopNavigation;
