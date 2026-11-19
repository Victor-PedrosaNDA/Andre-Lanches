import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function Contato() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erros, setErros] = useState({});

  const validar = () => {
    const novosErros = {};
    if (!nome.trim()) novosErros.nome = 'Informe seu nome';
    if (!email.trim()) novosErros.email = 'Informe seu e-mail ou WhatsApp';
    if (!mensagem.trim()) novosErros.mensagem = 'Escreva sua mensagem';
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleEnviar = () => {
    if (!validar()) return;

    Alert.alert(
      '✅ Mensagem Enviada!',
      `Obrigado, ${nome.trim()}! Recebemos sua mensagem e entraremos em contato em breve pelo e-mail/WhatsApp informado.`,
      [
        {
          text: 'OK',
          onPress: () => {
            setNome('');
            setEmail('');
            setMensagem('');
            setErros({});
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Cabeçalho */}
        <View style={styles.cabecalho}>
          <Text style={styles.cabecalhoEmoji}>💬</Text>
          <Text style={styles.cabecalhoTitulo}>Fale Conosco</Text>
          <Text style={styles.cabecalhoSubtitulo}>
            Dúvidas, sugestões ou elogios? Estamos aqui!
          </Text>
        </View>

        {/* Formulário */}
        <View style={styles.form}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={[styles.input, erros.nome && styles.inputErro]}
            placeholder="Seu nome completo"
            placeholderTextColor="#bbb"
            value={nome}
            onChangeText={(v) => { setNome(v); setErros((e) => ({ ...e, nome: null })); }}
            returnKeyType="next"
            autoCapitalize="words"
          />
          {erros.nome ? <Text style={styles.textoErro}>{erros.nome}</Text> : null}

          <Text style={styles.label}>E-mail ou WhatsApp</Text>
          <TextInput
            style={[styles.input, erros.email && styles.inputErro]}
            placeholder="seu@email.com ou (11) 99999-9999"
            placeholderTextColor="#bbb"
            value={email}
            onChangeText={(v) => { setEmail(v); setErros((e) => ({ ...e, email: null })); }}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
          />
          {erros.email ? <Text style={styles.textoErro}>{erros.email}</Text> : null}

          <Text style={styles.label}>Mensagem</Text>
          <TextInput
            style={[styles.inputArea, erros.mensagem && styles.inputErro]}
            placeholder="Escreva sua mensagem aqui..."
            placeholderTextColor="#bbb"
            value={mensagem}
            onChangeText={(v) => { setMensagem(v); setErros((e) => ({ ...e, mensagem: null })); }}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
          {erros.mensagem ? <Text style={styles.textoErro}>{erros.mensagem}</Text> : null}

          <TouchableOpacity
            style={styles.botaoEnviar}
            onPress={handleEnviar}
            activeOpacity={0.8}
          >
            <Text style={styles.botaoTexto}>Enviar Mensagem</Text>
          </TouchableOpacity>
        </View>

        {/* Informações de contato */}
        <View style={styles.infoContato}>
          <Text style={styles.infoTitulo}>Outras formas de contato</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoIcone}>📞</Text>
            <Text style={styles.infoTexto}>+55(61) 99999-6368</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoIcone}>📍</Text>
            <Text style={styles.infoTexto}>612 sul , 12 — Centro</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoIcone}>🕐</Text>
            <Text style={styles.infoTexto}>Seg–Sáb: 11h às 23h | Dom: 11h às 22h</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  cabecalho: {
    backgroundColor: '#e50021',
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 20,
  },
  cabecalhoEmoji: {
    fontSize: 44,
    marginBottom: 8,
  },
  cabecalhoTitulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },
  cabecalhoSubtitulo: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 6,
    textAlign: 'center',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    color: '#1a1a1a',
    backgroundColor: '#fafafa',
  },
  inputArea: {
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    color: '#1a1a1a',
    backgroundColor: '#fafafa',
    height: 120,
  },
  inputErro: {
    borderColor: '#e50021',
    backgroundColor: '#fff5f5',
  },
  textoErro: {
    color: '#e50021',
    fontSize: 12,
    marginTop: 4,
  },
  botaoEnviar: {
    backgroundColor: '#e50021',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 24,
    elevation: 4,
    shadowColor: '#e50021',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  botaoTexto: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  infoContato: {
    backgroundColor: '#ffe18c',
    margin: 20,
    borderRadius: 14,
    padding: 18,
  },
  infoTitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#e50021',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoIcone: {
    fontSize: 18,
    marginRight: 10,
    width: 26,
  },
  infoTexto: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
});
