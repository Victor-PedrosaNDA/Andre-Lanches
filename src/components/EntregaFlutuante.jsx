import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';
import { TELEFONE } from '../../constants';

export default function EntregaFlutuante() {
  const handleLigar = () => {
    const url = `tel:${TELEFONE}`;
    Linking.canOpenURL(url)
      .then((suportado) => {
        if (suportado) {
          Linking.openURL(url);
        } else {
          Alert.alert('Ops!', 'Não foi possível abrir o discador neste dispositivo.');
        }
      })
      .catch(() => {
        Alert.alert('Erro', 'Não foi possível realizar a chamada.');
      });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleLigar}
      activeOpacity={0.85}
    >
      <Image
        source={require('../../assets/images/telefone.png')}
        style={styles.icone}
        resizeMode="contain"
      />
      <View style={styles.textos}>
        <Text style={styles.numero}>(61) 99999-6368</Text>
        <Text style={styles.subtexto}>Entregamos na sua casa!</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e50021',
    borderRadius: 30,
    paddingHorizontal: 14,
    paddingVertical: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  icone: {
    width: 36,
    height: 36,
    tintColor: 'white',
    marginRight: 10,
  },
  textos: {
    flexShrink: 1,
  },
  numero: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.3,
  },
  subtexto: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 11,
    marginTop: 1,
  },
});
