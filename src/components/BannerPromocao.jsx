import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

export default function BannerPromocao({ titulo, descricao, preco }) {
  return (
    <View style={styles.banner}>
      <Image
        source={require('../../assets/images/promocao.jpg')}
        style={styles.bgImage}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.descricao}>{descricao}</Text>
        <View style={styles.precoContainer}>
          <Text style={styles.preco}>{preco}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 190,
    marginBottom: 4,
    overflow: 'hidden',
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.42)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 22,
  },
  titulo: {
    color: 'white',
    fontSize: 44,
    fontWeight: 'bold',
    textShadowColor: '#e50021',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  descricao: {
    color: 'white',
    fontSize: 17,
    marginTop: 4,
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  precoContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#e50021',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginTop: 12,
  },
  preco: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});