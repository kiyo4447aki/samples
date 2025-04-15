import focusedCalenderImage from '@/assets/calendar3-1.png';
import calenderImage from '@/assets/calendar3.png';
import focusedGearImage from '@/assets/gear-1.png';
import gearImage from '@/assets/gear.png';
import focusedGraphImage from '@/assets/graph-up-1.png';
import graphImage from '@/assets/graph-up.png';
import pencilImage from '@/assets/pencil-1.png';
import focusedPencilImage from '@/assets/pencil.png';

import TabIcon from '@/components/comonns/TabIcon';

import { defaultTheme } from '@/consts/theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import EditNavigation from './EditStack';
import GraphNavigation from './GraphStack';
import OthersNavigation from './OthersStack';
import TopNavigation from './TopStack';

const Tab = createBottomTabNavigator();

const TabNabigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: defaultTheme.mainColor,
          tabBarInactiveTintColor: defaultTheme.letter,
        }}
      >
        <Tab.Screen
          name="topTab"
          component={TopNavigation}
          options={{
            headerShown: false,
            title: '記録',
            tabBarIcon: ({ focused, size }) => {
              return (
                <TabIcon
                  focused={focused}
                  size={size}
                  defaultIcon={pencilImage}
                  focusedIcon={focusedPencilImage}
                ></TabIcon>
              );
            },
          }}
        />
        <Tab.Screen
          name="graphTab"
          component={GraphNavigation}
          options={{
            headerShown: false,
            title: 'グラフ',
            tabBarIcon: ({ focused, size }) => {
              return (
                <TabIcon
                  focused={focused}
                  size={size}
                  defaultIcon={graphImage}
                  focusedIcon={focusedGraphImage}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="editTab"
          component={EditNavigation}
          options={{
            headerShown: false,
            title: '編集',
            tabBarIcon: ({ focused, size }) => {
              return (
                <TabIcon
                  focused={focused}
                  size={size}
                  defaultIcon={calenderImage}
                  focusedIcon={focusedCalenderImage}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="othersTab"
          component={OthersNavigation}
          options={{
            headerShown: false,
            title: 'その他',
            tabBarIcon: ({ focused, size }) => {
              return (
                <TabIcon
                  focused={focused}
                  size={size}
                  defaultIcon={gearImage}
                  focusedIcon={focusedGearImage}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNabigation;
