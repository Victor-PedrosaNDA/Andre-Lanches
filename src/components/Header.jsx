import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ABAS = [
  { id: 'lanches', label: 'Lanches' },
  { id: 'sobre', label: 'Sobre Nós' },
  { id: 'contato', label: 'Contato' },
];

export default function Header({ telaAtiva, onNavegar }) {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoRow}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logoImg}
          resizeMode="contain"
        />
        <Text style={styles.logoTexto}>André Lanches</Text>
      </View>

      {/* Barra de navegação */}
      <View style={styles.nav}>
        {ABAS.map((aba) => (
          <TouchableOpacity
            key={aba.id}
            style={[styles.abaBtn, telaAtiva === aba.id && styles.abaBtnAtiva]}
            onPress={() => onNavegar(aba.id)}
            activeOpacity={0.75}
          >
            <Text
              style={[
                styles.abaTexto,
                telaAtiva === aba.id && styles.abaTextoAtivo,
              ]}
            >
              {aba.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffe18c',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logoImg: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#e50021',
  },
  logoTexto: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#e50021',
    marginLeft: 10,
    letterSpacing: 0.5,
  },
  nav: {
    flexDirection: 'row',
    backgroundColor: '#e50021',
  },
  abaBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  abaBtnAtiva: {
    backgroundColor: 'white',
  },
  abaTexto: {
    color: 'white',
    fontWeight: '600',
    fontSize: 13,
    letterSpacing: 0.3,
  },
  abaTextoAtivo: {
    color: '#e50021',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
