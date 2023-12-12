import { Text, View, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [name, setNombre] = useState('');
  const [password, setContraseña] = useState('');
  const navigation = useNavigation();

  async function handleLogin() {
    try {
      const userRef = await firestore()
        .collection('USERS')
        .where('name', '==', name)
        .where('password', '==', password)
        .get();

      if (!userRef.empty) {
        // Usuario autenticado exitosamente
        navigation.navigate('Modo', {
          userName: name,
        });
      } else {
        // El usuario no existe o la contraseña no coincide
        Alert.alert('Inicio de sesión fallido', 'Verifica tu nombre de usuario y contraseña.');
      }
    } catch (e) {
      console.error('Error al iniciar sesión:', e);
    } finally {
      // Limpiar campos después de intento de inicio de sesión
      setNombre('');
      setContraseña('');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nombre"
          value={name}
          onChangeText={(text) => setNombre(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={(text) => setContraseña(text)}
          secureTextEntry={true}
          style={styles.input}
        />

        <TouchableOpacity style={styles.touchableOpacity} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Color de fondo negro
    padding: 10,
    justifyContent: 'center', // Centra verticalmente
  },
  inputContainer: {
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra horizontalmente
  },
  input: {
    backgroundColor: 'silver',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    color: 'black',
    width: '80%', // Ajusta el ancho del TextInput
  },
  touchableOpacity: {
    backgroundColor: 'red', // Cambiar a tu color rojo apasionado
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});