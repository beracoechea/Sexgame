import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const DadosApp = () => {
  const [valorDado1, setValorDado1] = useState(1);
  const [valorDado2, setValorDado2] = useState(1);
  const [resultado, setResultado] = useState(0);
  const [girando, setGirando] = useState(false);

  const girarDados = () => {
    if (!girando) {
      setGirando(true);

      setTimeout(() => {
        const nuevoValorDado1 = Math.floor(Math.random() * 6) + 1;
        const nuevoValorDado2 = Math.floor(Math.random() * 6) + 1;

        setValorDado1(nuevoValorDado1);
        setValorDado2(nuevoValorDado2);

        const nuevoResultado = nuevoValorDado1 + nuevoValorDado2;
        setResultado(nuevoResultado);

        setGirando(false);
      }, 1000); // 1000 milisegundos = 1 segundo
    }
  };

  const getIconName = (valorDado) => {
    switch (valorDado) {
      case 1:
        return 'dice-one';
      case 2:
        return 'dice-two';
      case 3:
        return 'dice-three';
      case 4:
        return 'dice-four';
      case 5:
        return 'dice-five';
      case 6:
        return 'dice-six';
      default:
        return 'dice'; // Manejar valores no válidos o inesperados
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.dadosContainer}>
        <View style={styles.dado}>
          <FontAwesome5 name={getIconName(valorDado1)} color="#fff" size={80} />
        </View>
        <View style={styles.dado}>
          <FontAwesome5 name={getIconName(valorDado2)} color="#fff" size={80} />
        </View>
      </View>

      <Text style={styles.resultadoText}>¡Resultado: {resultado}!</Text>

      <TouchableOpacity onPress={girarDados} style={styles.boton}>
        <Text style={styles.botonText}>¡Girar Dados!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db', // Fondo azul
  },
  dadosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  dado: {
    width: 100,
    height: 100,
    backgroundColor: '#000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultadoText: {
    fontSize: 28,
    marginBottom: 40,
    color: '#fff', // Texto blanco
    fontWeight: 'bold',
    textAlign: 'center',
  },
  boton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
  },
  botonText: {
    color: '#3498db', // Texto azul
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default DadosApp;