import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated, Easing, TextInput } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Ruleta = ({ navigation }) => {
  const [girar, setGirar] = useState(false);
  const [participantes, setParticipantes] = useState([]);
  const [nombreNuevo, setNombreNuevo] = useState('');
  const [ganador, setGanador] = useState(null);
  const [casillaGanadora, setCasillaGanadora] = useState(null);
  const grados = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(15);
  const [reto, setReto] = useState(null);
  const [tiempoDeReto, setTiempoDeReto] = useState(15);
  const [temporizadorVisible, setTemporizadorVisible] = useState(false);
  const [temporizadorIniciado, setTemporizadorIniciado] = useState(false);
  const timerRef = useRef(null);


  const closeModal = () => {
    clearInterval(timerRef.current);
    setTemporizadorVisible(false);
    setTemporizadorIniciado(false);
    setModalVisible(false);
  };

  const iniciarGiro = () => {
    grados.setValue(0);
    setGirar(true);
  };

  const iniciarTemporizador = () => {
    setTemporizadorVisible(true);
    timerRef.current = setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev === 0) {
          clearInterval(timerRef.current);
          setTemporizadorVisible(false);
          setTemporizadorIniciado(false);
          closeModal();
        }
        return prev - 1;
      });
    }, 1000);
  };

  const obtenerRetoDesdeFirebase = async () => {
    try {
      const referenciaRetos = firestore().collection('RetosAmigos');
      const snapshot = await referenciaRetos.get();
      const retos = snapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((data) => data.Reto);

      if (retos.length > 0) {
        const retoAleatorio = retos[Math.floor(Math.random() * retos.length)];
        setReto(retoAleatorio.Reto);
        setTiempoDeReto(retoAleatorio.Tiempo);
        setModalVisible(true);
        setTiempoRestante(retoAleatorio.Tiempo);
        iniciarTemporizador();
      } else {
        console.log('No hay retos disponibles.');
      }
    } catch (error) {
      console.error('Error al obtener retos:', error);
    }
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

  const eliminarParticipante = (index) => {
    setParticipantes((prev) => {
      const nuevosParticipantes = [...prev];
      nuevosParticipantes.splice(index, 1);
      return nuevosParticipantes;
    });
  };

  const seleccionarGanador = async () => {
    const indiceGanador = Math.floor(Math.random() * participantes.length);
    setGanador(participantes[indiceGanador]);
    setCasillaGanadora(indiceGanador);

    // Enviar datos a la pantalla Consejo

    await obtenerRetoDesdeFirebase();
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
            styles.casillaContainer,
            { transform: [{ translateX }, { translateY }], ...casillaStyles },
          ]}
        >
          <View style={styles.casillaContent}>
            <Text style={styles.nombreParticipante}>{participante}</Text>
          </View>
          <TouchableOpacity onPress={() => eliminarParticipante(index)} style={styles.eliminarIcono}>
            <FontAwesome5 name="times-circle" color={'#ff0000'} size={15} />
          </TouchableOpacity>
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
              transform: [{ rotate: rotacion }],
            },
          ]}
        >
          <TouchableOpacity onPress={iniciarGiro} style={styles.gira}>
            <Text style={styles.giraText}>Girar</Text>
          </TouchableOpacity>
        </Animated.View>
        {renderCasillas()}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nuevo participante"
          value={nombreNuevo}
          onChangeText={(text) => setNombreNuevo(text)}
        />
        <TouchableOpacity onPress={agregarParticipante} style={styles.botonAgregar}>
          <Text style={styles.botonText}>Agregar</Text>
        </TouchableOpacity>
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
          {temporizadorVisible && (
            <View style={styles.tiempoContainer}>
              <Ionicons name="timer" color="#000000" size={30} style={styles.iconoTemporizador} />
              <Text style={styles.modalText}>Tiempo restante: {tiempoRestante}</Text>
            </View>
          )}

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
    flex: 1,
    backgroundColor: '#2C3E50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ruletaContainer: {
    position: 'relative',
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  casillaContainer: {
    position: 'absolute',
    width: 80,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  casillaContent: {
    alignItems: 'center',
  },
  nombreParticipante: {
    color: '#FFF',
  },
  eliminarIcono: {
    position: 'absolute',
    bottom: -10,
    left: '50%',
    marginLeft: -10,
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
  inputContainer: {
    width:'70%',
    height:'10%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginRight: 10,
    paddingLeft: 10,
    color:'black',
  },
  botonAgregar: {
    padding: 10,
    backgroundColor: '#4A235A',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botonText: {
    color: '#FFF',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 15,
    marginBottom: 10,
    color: 'black',
    textAlign: 'center',
    marginRight: 20,
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconoTemporizador: {
    marginRight: 10,
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

export default Ruleta;