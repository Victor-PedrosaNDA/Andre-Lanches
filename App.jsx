import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';

import Header from './src/components/Header';
import ListaProdutos from './src/components/ListaProdutos';
import SobreNos from './src/components/SobreNos';
import Contato from './src/components/Contato';
import EntregaFlutuante from './src/components/EntregaFlutuante';

export default function App() {
  const [telaAtiva, setTelaAtiva] = useState('lanches');

  const renderTela = () => {
    switch (telaAtiva) {
      case 'lanches':
        return <ListaProdutos />;
      case 'sobre':
        return <SobreNos />;
      case 'contato':
        return <Contato />;
      default:
        return <ListaProdutos />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#e50021" barStyle="light-content" />
      <Header telaAtiva={telaAtiva} onNavegar={setTelaAtiva} />
      {renderTela()}
      <EntregaFlutuante />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe18c',
  },
});
