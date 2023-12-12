import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './Inicio';
import Registro from './Registro';
import Login from './Login';
import Ruleta from './Ruleta';
import Usuarios from './Usuarios';
import Modo from './Modo';
 


const Stack = createStackNavigator();

function App(): JSX.Element {

  return (


    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }}/>
        <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Ruleta" component={Ruleta} options={{ headerShown: false }}/>
        <Stack.Screen name="Usuarios" component={Usuarios}options={{headerShown: false}}/>
        <Stack.Screen name="Modo" component={Modo}options={{headerShown: false}}/>


       
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

export default App;
