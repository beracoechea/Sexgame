import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Inicio from './Inicio';
import Ruleta from './Ruleta';
import Usuarios from './Usuarios';
import Modo from './Modo';
import RuletaPareja from './RuletaPareja';
import Menu from './Menu'
import Posicion_Diaria from './Dados';
import PP from './PP';
import CPuntos from './CPuntos';
 


const Stack = createStackNavigator();

function App(): JSX.Element {

  return (


    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }}/>
        <Stack.Screen name="RuletaPareja" component={RuletaPareja} options={{ headerShown: false }}/>
        <Stack.Screen name="Usuarios" component={Usuarios}options={{headerShown: false}}/>
        <Stack.Screen name="Modo" component={Modo}options={{headerShown: false}}/>
        <Stack.Screen name="Ruleta" component={Ruleta} options={{ headerShown: false }}/>
        <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }}/>
        <Stack.Screen name="PosicionDiaria" component={Posicion_Diaria} options={{ headerShown: false }}/>
        <Stack.Screen name="PP"component={PP} options={{headerShown:false}}/>




      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

export default App;
