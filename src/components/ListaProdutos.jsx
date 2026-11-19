import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
  Dimensions,
  Linking,
  Alert,
} from 'react-native';
import BannerPromocao from './BannerPromocao';

const { width: SCREEN_W } = Dimensions.get('window');
const TELEFONE = '+55619999996368'; // Substitua pelo número de telefone real do seu estabelecimento

const PRODUTOS = [
  {
    id: '1',
    nome: 'X-Salada',
    preco: 'R$ 15,00',
    imagem: require('../../assets/images/xsalada.jpg'),
    descricao: 'Hambúrguer com alface, tomate e maionese',
    detalhe: 'Pão artesanal, hambúrguer 150g, alface americana, tomate fatiado, maionese da casa e mostarda. Clássico e irresistível!',
  },
  {
    id: '2',
    nome: 'Cheddar',
    preco: 'R$ 17,00',
    imagem: require('../../assets/images/cheddar.jpg'),
    descricao: 'Hambúrguer duplo com queijo cheddar cremoso',
    detalhe: 'Dois hambúrgueres 150g, queijo cheddar derretido em dobro, bacon crocante, cebola caramelizada e molho especial da casa.',
  },
  {
    id: '3',
    nome: 'Batata Frita',
    preco: 'R$ 7,00',
    imagem: require('../../assets/images/batata.jpg'),
    descricao: 'Porção crocante de batata frita temperada',
    detalhe: 'Porção individual de batatas fritas crocantes temperadas com sal e ervas. Acompanha ketchup e maionese temperada.',
  },
  {
    id: '4',
    nome: 'X-Burguer',
    preco: 'R$ 17,00',
    imagem: require('../../assets/images/cheese.jpg'),
    descricao: 'Hambúrguer clássico com queijo e ketchup',
    detalhe: 'Pão macio, hambúrguer, queijo prato, ketchup e mostarda. A opção mais em conta do cardápio, sem abrir mão do sabor!',
  },
  {
    id: '5',
    nome: 'Big Tower',
    preco: 'R$ 20,50',
    imagem: require('../../assets/images/bigtower.jpg'),
    descricao: 'Nosso mega hambúrguer com ingredientes especiais',
    detalhe: 'Três hambúrgueres 150g, cheddar, bacon, ovo, cebola crispy, alface, tomate, picles e molho especial. Para quem quer tudo!',
  },
  {
    id: '6',
    nome: 'X-Frango',
    preco: 'R$ 12,90',
    imagem: require('../../assets/images/fragonrequeijao.jpg'),
    descricao: 'Frango grelhado com requeijão e cogumelos',
    detalhe: 'Peito de frango grelhado temperado, requeijão cremoso, cogumelos refogados, alface e tomate. Leve e muito saboroso!',
  },
  {
    id: '7',
    nome: 'Nuggets (c/ 8)',
    preco: 'R$ 6,50',
    imagem: require('../../assets/images/nuggets.jpg'),
    descricao: 'Nuggets crocantes de frango, 8 unidades',
    detalhe: 'Oito nuggets de frango empanados na hora, com casquinha dourada e crocante. Acompanha molho barbecue ou ketchup.',
  },
  {
    id: '8',
    nome: 'Refri (Lata)',
    preco: 'R$ 5,50',
    imagem: require('../../assets/images/refri.jpg'),
    descricao: 'Refrigerante gelado em lata 350ml',
    detalhe: 'Lata 350ml bem gelada. Disponível em Coca-Cola, Guaraná Antarctica, Fanta Laranja e Sprite. Perfeito para acompanhar o lanche!',
  },
  {
    id: '9',
    nome: 'Sucos',
    preco: 'R$ 8,50',
    imagem: require('../../assets/images/sucos.jpg'),
    descricao: 'Sucos naturais em vários sabores',
    detalhe: 'Sucos naturais feitos na hora em copo 400ml. Sabores: laranja, limão, maracujá, manga e morango. Sem adição de corantes.',
  },
];

function ModalProduto({ produto, onFechar }) {
  if (!produto) return null;

  const handlePedir = () => {
    onFechar();
    Linking.openURL(`tel:${TELEFONE}`).catch(() =>
      Alert.alert('Ops!', 'Não foi possível abrir o discador.')
    );
  };

  return (
    <Modal
      visible={!!produto}
      transparent
      animationType="slide"
      onRequestClose={onFechar}
    >
      <Pressable style={styles.backdrop} onPress={onFechar} />
      <View style={styles.sheet}>
        <Image source={produto.imagem} style={styles.modalImg} resizeMode="cover" />
        <View style={styles.precoBadge}>
          <Text style={styles.precoBadgeTexto}>{produto.preco}</Text>
        </View>
        <TouchableOpacity style={styles.btnFechar} onPress={onFechar} activeOpacity={0.8}>
          <Text style={styles.btnFecharTexto}>✕</Text>
        </TouchableOpacity>
        <View style={styles.sheetBody}>
          <Text style={styles.modalNome}>{produto.nome}</Text>
          <Text style={styles.modalDetalhe}>{produto.detalhe}</Text>
          <TouchableOpacity style={styles.btnPedir} onPress={handlePedir} activeOpacity={0.85}>
            <Text style={styles.btnPedirTexto}>📞  Ligar e Pedir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function CardProduto({ item, onPress }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(item)}
      activeOpacity={0.75}
    >
      <Image source={item.imagem} style={styles.cardImg} resizeMode="cover" />
      <View style={styles.cardInfo}>
        <Text style={styles.cardNome}>{item.nome}</Text>
        <Text style={styles.cardDescricao}>{item.descricao}</Text>
        <Text style={styles.cardPreco}>{item.preco}</Text>
      </View>
      <Text style={styles.cardSeta}>›</Text>
    </TouchableOpacity>
  );
}

function ListaHeader() {
  return (
    <>
      <BannerPromocao
        titulo="Promoção!"
        descricao="X-Salada + Batata"
        preco="R$ 9,90"
      />
      <Text style={styles.titulo}>Nossos Lanches</Text>
    </>
  );
}

export default function ListaProdutos() {
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  return (
    <>
      <FlatList
        data={PRODUTOS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardProduto item={item} onPress={setProdutoSelecionado} />
        )}
        ListHeaderComponent={<ListaHeader />}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      />
      <ModalProduto
        produto={produtoSelecionado}
        onFechar={() => setProdutoSelecionado(null)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  lista: {
    backgroundColor: 'white',
    paddingBottom: 100,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e50021',
    textAlign: 'center',
    paddingVertical: 16,
    backgroundColor: 'white',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  cardImg: {
    width: 110,
    height: 110,
  },
  cardInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  cardNome: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  cardDescricao: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
    lineHeight: 18,
  },
  cardPreco: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e50021',
  },
  cardSeta: {
    fontSize: 28,
    color: '#ccc',
    paddingRight: 14,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    maxHeight: '75%',
  },
  modalImg: {
    width: SCREEN_W,
    height: 220,
  },
  precoBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#e50021',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  precoBadgeTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  btnFechar: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnFecharTexto: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sheetBody: {
    padding: 20,
  },
  modalNome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 10,
  },
  modalDetalhe: {
    fontSize: 15,
    color: '#555',
    lineHeight: 23,
    marginBottom: 20,
  },
  btnPedir: {
    backgroundColor: '#e50021',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#e50021',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  btnPedirTexto: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});