import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';

const Usuarios = () => {
  const [nombre1, setNombre1] = useState('');
  const [nombre2, setNombre2] = useState('');

  const handleJuegoPresionado = (tipoJuego) => {
    Alert.alert(`Iniciar juego entre ${nombre1} y ${nombre2} - Tipo: ${tipoJuego}`);
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

      <TouchableOpacity style={styles.iconButton} onPress={() => handleJuegoPresionado('gay')}>
        <Image source={require('./images/masculino.png')} style={styles.iconImage} />
        <Text style={styles.buttonText}> Pareja Gay</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconButton} onPress={() => handleJuegoPresionado('heterosexual')}>
        <Image source={require('./images/hetero.png')} style={styles.iconImage} />
        <Text style={styles.buttonText}> Pareja Heterosexual</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconButton} onPress={() => handleJuegoPresionado('lesbiana')}>
        <Image source={require('./images/feminino.png')} style={styles.iconImage} />
        <Text style={styles.buttonText}> Pareja Lesbiana</Text>
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
    borderRadius: 10,
    padding: 15,
    width: '80%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#3498db', // Color del borde del botón
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});
