import GraphPage from '@/screens/GraphPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator();

const GraphNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="graphPage"
        component={GraphPage}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default GraphNavigation;
