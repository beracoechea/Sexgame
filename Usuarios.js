import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Ionicons from 'react-native-vector-icons/Ionicons';

const Usuarios = () => {
  const [nombre1, setNombre1] = useState('');
  const [nombre2, setNombre2] = useState('');
  const navigation = useNavigation(); 

  const handleJuegoPresionado = (tipo) => {
    // Ahora, además de pasar el tipo, también pasamos los nombres de los participantes
    navigation.navigate('RuletaPareja', { tipo: tipo, participantes: [nombre1, nombre2] });
    };

  const handleButtonPress = () => {
    if (nombre1.trim() === '' || nombre2.trim() === '') {
      Alert.alert('Campos vacíos', 'Ambos nombres deben estar completos antes de continuar.');
    } else {
      handleJuegoPresionado('alguna_variable');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jugadores:</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del primer jugador"
        value={nombre1}
        onChangeText={(text) => setNombre1(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Nombre del segundo jugador"
        value={nombre2}
        onChangeText={(text) => setNombre2(text)}
      />

      <TouchableOpacity style={styles.iconButton} onPress={handleButtonPress}>
      <Ionicons name="game-controller" color="#000000" size={30} style={styles.iconImage} />
        <Text style={styles.buttonText}> Jugar</Text>
      </TouchableOpacity>

    </View>
    
  );
};

export default Usuarios;

const styles = StyleSheet.create({
  iconImage: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginLeft:'25%',
    
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#610000',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    width: '80%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#3498db', // Color del borde del botón
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,

  },
});