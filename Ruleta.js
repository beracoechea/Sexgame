import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated, Easing, TextInput } from 'react-native';

const Ruleta = () => {
  const [girar, setGirar] = useState(false);
  const [participantes, setParticipantes] = useState([]);
  const [nombreNuevo, setNombreNuevo] = useState('');
  const [ganador, setGanador] = useState(null);
  const [casillaGanadora, setCasillaGanadora] = useState(null);
  const grados = new Animated.Value(0);

  const iniciarGiro = () => {
    grados.setValue(0);
    setGirar(true);
  };

  useEffect(() => {
    if (girar) {
      Animated.timing(grados, {
        toValue: 360,
        duration: 3000,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => {
        setGirar(false);
        seleccionarGanador();
      });
    }
  }, [girar]);

  const rotacion = grados.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const agregarParticipante = () => {
    if (nombreNuevo.trim() !== '') {
      setParticipantes([...participantes, nombreNuevo]);
      setNombreNuevo('');
    }
  };

  const seleccionarGanador = () => {
    const indiceGanador = Math.floor(Math.random() * participantes.length);
    setGanador(participantes[indiceGanador]);
    setCasillaGanadora(indiceGanador);
  };

  const renderCasillas = () => {
    const numCasillas = participantes.length;
    const anguloPorCasilla = 360 / numCasillas;
    const radio = 100;

    return participantes.map((participante, index) => {
      const rotacionCasilla = index * anguloPorCasilla;
      const radianes = (rotacionCasilla * Math.PI) / 180;
      const translateX = radio * Math.cos(radianes);
      const translateY = radio * Math.sin(radianes);

      // Estilos adicionales para la casilla ganadora
      const casillaStyles =
        casillaGanadora !== null && casillaGanadora === index
          ? {
              backgroundColor: '#800000', // Rojo oscuro para resaltar la casilla ganadora
              transform: [
                { translateX: translateX * 1.2 },
                { translateY: translateY * 1.2 },
                { scale: 1.2 },
              ],
            }
          : {};

      return (
        <Animated.View
          key={index}
          style={[
            styles.casilla,
            { transform: [{ translateX }, { translateY }], ...casillaStyles },
          ]}
        >
          <Text style={styles.nombreParticipante}>{participante}</Text>
        </Animated.View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.ruletaContainer}>
        <Animated.View
          style={[
            styles.botonContainer,
            {
              transform: [
                { rotate: rotacion },
              ],
            },
          ]}
        >
          <TouchableOpacity onPress={iniciarGiro} style={styles.gira}>
            <Text style={styles.giraText}>Girar la Ruleta</Text>
          </TouchableOpacity>
        </Animated.View>
        {renderCasillas()}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nuevo participante"
        value={nombreNuevo}
        onChangeText={(text) => setNombreNuevo(text)}
      />
      <TouchableOpacity onPress={agregarParticipante} style={styles.boton}>
        <Text style={styles.botonText}>Agregar Participante</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#2C3E50', // Fondo negro
  },
  ruletaContainer: {
    position: 'relative',
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  casilla: {
    position: 'absolute',
    width: 80,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  nombreParticipante: {
    color: '#FFF', // Texto blanco para mayor contraste
  },
  botonContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gira: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#800000', // Rojo oscuro
    justifyContent: 'center',
    alignItems: 'center',
  },
  giraText: {
    color: '#FFF', // Texto blanco para mayor contraste
  },
  ganadorText: {
    color: '#800000', // Rojo oscuro
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
  },
  boton: {
    padding: 10,
    backgroundColor: '#4A235A', // Morado oscuro
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  botonText: {
    color: '#FFF', // Texto blanco para mayor contraste
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 60,
    padding: 10,
    width: 200,
    backgroundColor: '#0000', 
    borderRadius: 5,
  },
});

export default Ruleta;