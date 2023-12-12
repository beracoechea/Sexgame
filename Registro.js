import { Text, View, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const Registro = ({ navigation }) => {
  const [name, setNombre] = useState('');
  const [password, setContraseña] = useState('');

  const addUser = async () => {
    try {
      const userRef = await firestore().collection('USERS').where('name', '==', name).get();

      if (userRef.empty) {
        await firestore().collection('USERS').add({
          name: name,
          password: password,
        });

        console.log('Usuario agregado exitosamente a Firestore');
        setNombre('');
        setContraseña('');

        // Redirige a la pantalla de inicio de sesión (login)
        navigation.navigate('Login');
      } else {
        Alert.alert('Nombre de usuario existente', 'El nombre de usuario ya existe. Por favor, elige otro nombre.');
      }
    } catch (e) {
      console.error('Error al agregar el usuario a Firestore:', e);
    }
  };

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
          style={styles.input}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.touchableOpacity} onPress={addUser}>
          <Text style={styles.buttonText}>Add User</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Registro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
    justifyContent: 'center',
  },
  touchableOpacity: {
    backgroundColor: 'red',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'silver',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    color: 'black',
    width: '80%',
  },
});