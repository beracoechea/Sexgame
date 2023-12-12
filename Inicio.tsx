import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

// Importa las funciones necesarias de React Navigation
import { useNavigation } from '@react-navigation/native';

const App: React.FC = () => {
  // Obtiene la instancia de navegación
  const navigation = useNavigation();

  // Funciones para navegar
  const navigateToRegistration = () => {
    navigation.navigate('Registro');
  };
  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./images/Inicio.jpeg')}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.welcome}>Welcome to SexGame</Text>

          <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
            <Text style={styles.buttonText}>Login with Email</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity style={styles.signupButton} onPress={navigateToRegistration}>
              <Text style={styles.signupButtonText}> SIGN UP </Text>
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
    color: '#ff9ea2',
    fontSize: 20,
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
    margin: '10%',
    borderRadius: 20,
    marginBottom: '20%',
  },
  button: {
    backgroundColor: '#9c0720',
    width: '80%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
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
    marginTop: 10,
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
});

export default App;