import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class Modo extends Component {
  
  Pareja = () => {
    this.props.navigation.navigate('Usuarios');
  };

  Amigos = () => {
    this.props.navigation.navigate('Menu');
  };

  render() {
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    return (
      <View style={styles.container}>
        <Svg style={styles.svg} width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          {/* Triángulo inferior izquierdo */}
          <Polygon
            points={`0,0 ${width},0 0,${height}`}
            fill= '#9c0720'
            onPress={this.Pareja}
          />
          <Text style={styles.textP} x={halfWidth} y={halfHeight}>
            Pareja 
          </Text>

          {/* Triángulo superior derecho */}
          <Polygon
            points={`0,${height} ${width},0 ${width},${height}`}
            fill="#3498db"
            onPress={this.Amigos}
          />
          <Text style={styles.textF} x={halfWidth} y={halfHeight}>
            Amigos 
          </Text>
        </Svg>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  svg: {
    flex: 1,
  },
  textP: {
    marginTop: '70%',
    marginLeft: '30%',
    position: 'absolute',
    fontSize: 32,
    color: '#ffffff',
    fontFamily: 'cursive',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  textF: {
    marginTop: '140%',
    marginLeft: '60%',
    position: 'absolute',
    fontSize: 32,
    color: '#ffffff',
    fontFamily: 'cursive',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
});