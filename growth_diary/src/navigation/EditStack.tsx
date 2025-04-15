import EditPage from '@/screens/EditPage';
import ViewPage from '@/screens/ViewPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  viewPage: undefined;
  editPage: undefined;
};

const EditNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="viewPage"
        component={ViewPage}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="editPage"
        component={EditPage}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default EditNavigation;
