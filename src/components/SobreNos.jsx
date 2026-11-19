import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from 'react-native';

const DIFERENCIAIS = [
  { icone: '🍔', titulo: 'Ingredientes Frescos', texto: 'Selecionamos os melhores ingredientes diariamente para garantir sabor e qualidade em cada mordida.' },
  { icone: '🚀', titulo: 'Entrega Rápida', texto: 'Levamos seu pedido quentinho até a sua porta em até 40 minutos. Rápido, fácil e sem complicação.' },
  { icone: '❤️', titulo: 'Feito com Amor', texto: 'Cada lanche é preparado com cuidado e dedicação, como se fosse para a nossa própria família.' },
  { icone: '💰', titulo: 'Preço Justo', texto: 'Acreditamos que comida boa não precisa ser cara. Oferecemos o melhor custo-benefício do bairro.' },
];

export default function SobreNos() {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroEmoji}>🍔</Text>
        <Text style={styles.heroTitulo}>André Lanches</Text>
        <Text style={styles.heroSubtitulo}>Desde 2010, sabor de verdade</Text>
      </View>

      {/* História */}
      <View style={styles.section}>
        <Text style={styles.sectionTitulo}>Nossa História</Text>
        <Text style={styles.sectionTexto}>
          Anos depois, o sonho ganhou novos horizontes e o André Lanches fez as malas rumo a Brasília. Entre o céu amplo do Planalto Central, o ritmo das quadras e o vai e vem da capital federal, a mesma chapa e o tempero de sempre encontraram um novo lar conquistando brasilienses de todos os cantos com o sabor autêntico que atravessou a mudança sem perder a essência.
        </Text>
        <Text style={styles.sectionTexto}>
          O que era um sonho humilde cresceu de boca em boca. Clientes viraram amigos,
          amigos trouxeram família, e a família se tornou parte da nossa história. Hoje,
          mais de uma década depois, seguimos com o mesmo espírito: preparar lanches
          irresistíveis com ingredientes frescos e um atendimento que faz você se sentir
          em casa.
        </Text>
      </View>

      {/* Missão */}
      <View style={styles.missaoBox}>
        <Text style={styles.missaoTitulo}>Nossa Missão</Text>
        <Text style={styles.missaoTexto}>
          "Oferecer momentos de felicidade através de lanches saborosos, feitos com
          ingredientes de qualidade e servidos com o calor humano que só o André
          Lanches tem."
        </Text>
      </View>

      {/* Diferenciais */}
      <View style={styles.section}>
        <Text style={styles.sectionTitulo}>Por que nos escolher?</Text>
        {DIFERENCIAIS.map((item, index) => (
          <View key={index} style={styles.diferencialCard}>
            <Text style={styles.diferencialIcone}>{item.icone}</Text>
            <View style={styles.diferencialTextos}>
              <Text style={styles.diferencialTitulo}>{item.titulo}</Text>
              <Text style={styles.diferencialTexto}>{item.texto}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.rodape}>
        <Text style={styles.rodapeTexto}>Venha nos visitar ou peça pelo telefone!</Text>
        <Text style={styles.rodapeEmoji}>📍 612 sul , 12 — Centro</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    paddingBottom: 100,
  },
  hero: {
    backgroundColor: '#e50021',
    alignItems: 'center',
    paddingVertical: 36,
    paddingHorizontal: 24,
  },
  heroEmoji: {
    fontSize: 56,
    marginBottom: 8,
  },
  heroTitulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1,
  },
  heroSubtitulo: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 6,
  },
  section: {
    padding: 20,
  },
  sectionTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e50021',
    marginBottom: 12,
  },
  sectionTexto: {
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
    marginBottom: 12,
  },
  missaoBox: {
    backgroundColor: '#ffe18c',
    marginHorizontal: 20,
    borderRadius: 14,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#e50021',
  },
  missaoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e50021',
    marginBottom: 8,
  },
  missaoTexto: {
    fontSize: 15,
    color: '#333',
    fontStyle: 'italic',
    lineHeight: 22,
  },
  diferencialCard: {
    flexDirection: 'row',
    backgroundColor: '#fafafa',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  diferencialIcone: {
    fontSize: 28,
    marginRight: 12,
    marginTop: 2,
  },
  diferencialTextos: {
    flex: 1,
  },
  diferencialTitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  diferencialTexto: {
    fontSize: 13,
    color: '#666',
    lineHeight: 19,
  },
  rodape: {
    alignItems: 'center',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  rodapeTexto: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  rodapeEmoji: {
    fontSize: 13,
    color: '#888',
    marginTop: 6,
  },
});
