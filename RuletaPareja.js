import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated, Easing, AppState } from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import Sound from 'react-native-sound';

const RuletaPareja = ({ route }) => {
  const { tipo, participantes: participantesIniciales } = route.params;

  const [girar, setGirar] = useState(false);
  const [participantes, setParticipantes] = useState(participantesIniciales);
  const [nombreNuevo, setNombreNuevo] = useState('');
  const [ganador, setGanador] = useState(null);
  const [casillaGanadora, setCasillaGanadora] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(15);
  const [reto, setReto] = useState(null);
  const [tiempoDeReto, setTiempoDeReto] = useState(15); // Valor predeterminado
  const [nivelReto, setNivelReto] = useState(1); // Estado para almacenar el nivel actual del reto
  const [numTiradas, setNumTiradas] = useState(0); // Estado para almacenar el número de tiradas

  const tiradasPorNivel = 10; // Cantidad de tiradas necesarias para aumentar el nivel
  const nivelMaximo = 5; // Nivel máximo de los retos

  const grados = new Animated.Value(0);

  const reproducirAlerta = async () => {
    try {
      const sound = new Sound(require('./sonidos/sonidomp3.mp3'), (error) => {
        if (error) {
          console.error('Error al cargar el archivo de audio:', error);
        } else {
          sound.play();
        }
      });
    } catch (error) {
      console.error('Error al reproducir el sonido:', error);
    }
  };

  useEffect(() => {

    if (modalVisible && tiempoRestante === 6) {
      reproducirAlerta();
    }
  }, [modalVisible, tiempoRestante]);

  const seleccionarGanador = async () => {
    const indiceGanador = Math.floor(Math.random() * participantes.length);
    setGanador(participantes[indiceGanador]);
    setCasillaGanadora(indiceGanador);

    await obtenerRetoDesdeFirebase();
  };

  const rotacion = grados.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const iniciarGiro = () => {
    grados.setValue(0);
    setGirar(true);
    setNumTiradas(numTiradas + 1); // Incrementar el número de tiradas al iniciar el giro
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

      const casillaStyles =
        casillaGanadora !== null && casillaGanadora === index
          ? {
              backgroundColor: '#800000',
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

  const obtenerRetoDesdeFirebase = async () => {
    try {
      const referenciaRetos = firestore().collection('RetosPareja');
      const snapshot = await referenciaRetos.where('Nivel', '==', nivelReto).get(); // Filtrar por nivel actual
      const retos = [];
  
      snapshot.forEach((doc) => {
        const reto = doc.data().Reto;
        const tiempoDeReto = doc.data().Tiempo;
        if (reto) {
          retos.push({ reto, tiempoDeReto });
        }
      });
  
      if (retos.length > 0) {
        const retoAleatorio = retos[Math.floor(Math.random() * retos.length)];
        setReto(retoAleatorio.reto);
        setTiempoDeReto(retoAleatorio.tiempoDeReto);
        setModalVisible(true);
        setTiempoRestante(retoAleatorio.tiempoDeReto);
      } else {
        console.log('No hay retos disponibles para este nivel.');
      }
    } catch (error) {
      console.error('Error al obtener retos:', error);
    }
  };


  useEffect(() => {
    if (girar) {
      // Incrementar el nivel cada cierto número de tiradas
      if (numTiradas % tiradasPorNivel === 0 && nivelReto < nivelMaximo) {
        setNivelReto((prevNivel) => prevNivel + 1);
      }
    }
  }, [girar, numTiradas, nivelReto, nivelMaximo]);

  useEffect(() => {
    let interval;

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

    if (modalVisible && tiempoRestante > 0) {
      interval = setInterval(() => {
        setTiempoRestante((prev) => prev - 1);
      }, 1000);
    } else if (modalVisible) {
      setModalVisible(false);
    }

    return () => clearInterval(interval);
  }, [girar, modalVisible, tiempoRestante]);

  const closeModal = () => {
    if (modalVisible) {
      setModalVisible(false);
      setTiempoRestante(tiempoDeReto); // Reiniciar al valor original
    }
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
          <Ionicons name="heart-circle" color={'red'} size={60}>
            </Ionicons>
          </TouchableOpacity>
        </Animated.View>
        {renderCasillas()}
      </View>

      <Modal isVisible={modalVisible} onBackdropPress={closeModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{ganador}</Text>
          {reto && (
            <View style={styles.retoContainer}>
              <Ionicons name="bulb" color="#000000" size={30} style={styles.iconoReto} />
              <Text style={styles.modalText}>{reto}</Text>
            </View>
          )}
          <View style={styles.tiempoContainer}>
            <Ionicons name="timer" color="#000000" size={30} style={styles.iconoTemporizador} />
            <Text style={styles.modalText}>Tiempo restante: {tiempoRestante}</Text>
          </View>


          <TouchableOpacity onPress={closeModal} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Cerrar</Text>
          </TouchableOpacity>
          
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#ffafde',
  },
  ruletaContainer: {
    position: 'relative',
    width: '80%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#c999af',
    elevation: 50, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    color: '#fff',
    
  },
  botonContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gira: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#800000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  giraText: {
    color: '#FFF',
  },
  // Estilos para el modal
  modalContainer: {
    backgroundColor: '#FFFF',
    padding: 20,
    borderRadius: 30,
  },
  modalText: {
    fontSize: 15,
    marginBottom: 20,
    color: 'black',
    textAlign: 'center',
    marginRight: 40,
    marginLeft: 10,
  },
  modalButton: {
    backgroundColor: '#800000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  modalButtonText: {
    color: '#FFF',
  },
  tiempoContainer: {
    flexDirection: 'row', // Alinea los elementos horizontalmente
    alignItems: 'center',  // Alinea los elementos verticalmente al centro
    marginBottom: 10,
  },
  iconoTemporizador: {
    marginRight: 10, // Espacio a la derecha del ícono del temporizador
  },
  retoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconoReto: {
    marginRight: 10,
  },
});

export default RuletaPareja;