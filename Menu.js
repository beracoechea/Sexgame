import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';



import Dados from './Dados';
import Ruleta from './Ruleta';

const Tab = createBottomTabNavigator();

const Menu = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Ruleta"
        component={Ruleta}
        options={{
          headerShown: false,
          tabBarLabel: 'Ruleta',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="empire" color={color} size={35} />
          ),
        }}
      />
      <Tab.Screen
        name="Dados"
        component={Dados}
        options={{
          headerShown: false,
          tabBarLabel: 'Dados',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="dice" color={color} size={35} />
          ),
        }}
      />
     
    </Tab.Navigator>
  );
};

export default Menu;
