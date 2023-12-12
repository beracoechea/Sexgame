import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import Modal from 'react-native-modal';

const RuletaPareja = ({ route }) => {
  const { tipo, participantes: participantesIniciales } = route.params;

  const [girar, setGirar] = useState(false);
  const [participantes, setParticipantes] = useState(participantesIniciales);
  const [nombreNuevo, setNombreNuevo] = useState('');
  const [ganador, setGanador] = useState(null);
  const [casillaGanadora, setCasillaGanadora] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(15);

  const grados = new Animated.Value(0);

  // Función para seleccionar al ganador
  const seleccionarGanador = () => {
    const indiceGanador = Math.floor(Math.random() * participantes.length);
    setGanador(participantes[indiceGanador]);
    setCasillaGanadora(indiceGanador);
  };

  const rotacion = grados.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const iniciarGiro = () => {
    grados.setValue(0);
    setGirar(true);
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
        setModalVisible(true);
        // Reiniciar el tiempo restante al abrir el modal
        setTiempoRestante(15);
      });
    }
  }, [girar]);

  // Actualizar el tiempo restante cada segundo
  useEffect(() => {
    let interval;
    if (modalVisible && tiempoRestante > 0) {
      interval = setInterval(() => {
        setTiempoRestante((prev) => prev - 1);
      }, 1000);
    } else if (modalVisible) {
      // Si el tiempo llega a cero, ocultar el modal
      setModalVisible(false);
    }
    // Limpiar el intervalo al salir del modal o al llegar a 0
    return () => clearInterval(interval);
  }, [modalVisible, tiempoRestante]);

  // Función para cerrar el modal
  const closeModal = () => {
    setModalVisible(false);
    // Aquí puedes reiniciar el cronómetro si es necesario
    setTiempoRestante(15);
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

      {/* Modal */}
      <Modal isVisible={modalVisible} onBackdropPress={closeModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{ganador}</Text>
          {/* Mostrar el tiempo restante en el modal */}
          <Text style={styles.modalText}>Tiempo restante: {tiempoRestante} segundos</Text>
          {/* Aquí puedes agregar el componente de cronómetro y el reto */}
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
    backgroundColor: '#2C3E50',
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
    color: '#FFF',
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
    backgroundColor: '#800000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  giraText: {
    color: '#FFF',
  },
  // Estilos para el modal
  modalContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    color:'black',
    textAlign:'center',
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
});

export default RuletaPareja;