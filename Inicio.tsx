import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';  // Importa el componente CheckBox

// Importa las funciones necesarias de React Navigation
import { useNavigation } from '@react-navigation/native';

const App: React.FC = () => {
  // Obtiene la instancia de navegación
  const navigation = useNavigation();

  // Estado para rastrear la aceptación de las políticas de privacidad
  const [aceptaPoliticas, setAceptaPoliticas] = useState(false);

  // Funciones para navegar y verificar la casilla de aceptación
  const navigateToLogin = () => {
    if (aceptaPoliticas) {
      navigation.navigate('Modo');
    } else {
      Alert.alert("Primero acepta las políticas de privacidad");
    }
  };

  const navigateToPoliticas = () => {
    navigation.navigate('PP');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./images/Inicio.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.welcome}>Bienvenido a DulceDesafio</Text>

          <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <CheckBox
              value={aceptaPoliticas}
              onValueChange={(value) => setAceptaPoliticas(value)}
            />
            <Text style={styles.signupText}>Acepto las </Text>

            <TouchableOpacity style={styles.signupButton} onPress={navigateToPoliticas}>
              <Text style={styles.signupButtonText}>políticas de privacidad</Text>
            </TouchableOpacity>
          </View>

         
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    color: '#ffffff',
    fontSize: 18,
    marginBottom: 30,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '7%',
    borderRadius: 20,
    marginBottom: '20%',
  },
  button: {
    backgroundColor: '#add0ed',
    width: '80%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
    marginLeft:'10%',
    marginRight:'10%',
  },
  signupText: {
    color: 'white',
  },
  signupButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 10,
  },
  signupButtonText: {
    color: 'silver',
    textAlign: 'center',
  },
  politicasText: {
    color: 'white',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default App;