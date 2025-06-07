import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function Login({ navigation }) {
  const [showRegister, setShowRegister] = useState(false);
  const [nome, setNome] = useState('');
  const [emailCadastro, setEmailCadastro] = useState('');
  const [senhaCadastro, setSenhaCadastro] = useState('');
  const [emailLogin, setEmailLogin] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');

  const handleCadastro = () => {
    setShowRegister(false);
    navigation.navigate('Home', { nome });
  };

  const handleLogin = () => {
    navigation.navigate('Home', { nome: nome || 'Usuário' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Svg height="120" width={width} viewBox="0 0 1440 320">
          <Path
            fill="#878AF6"
            d="M0,96L48,106.7C96,117,192,139,288,154.7C384,171,480,181,576,176C672,171,768,149,864,133.3C960,117,1056,107,1152,101.3C1248,96,1344,96,1392,96L1440,96V0H1392C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0H0Z"
          />
        </Svg>
      </View>

      <View style={styles.form}>
        <Text style={styles.title}>Bem vindo de volta!</Text>

        <TextInput
          placeholder="E-mail"
          placeholderTextColor="#888"
          value={emailLogin}
          onChangeText={setEmailLogin}
          style={styles.input}
        />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#888"
          secureTextEntry
          value={senhaLogin}
          onChangeText={setSenhaLogin}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Não tem conta?
          <Text style={styles.link} onPress={() => setShowRegister(true)}>
            {' '}Crie agora!
          </Text>
        </Text>
      </View>

      {/* Modal de Cadastro */}
      <Modal visible={showRegister} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Cadastro</Text>

            <TextInput
              placeholder="Nome"
              placeholderTextColor="#888"
              style={styles.input}
              value={nome}
              onChangeText={setNome}
            />
            <TextInput
              placeholder="E-mail"
              placeholderTextColor="#888"
              style={styles.input}
              value={emailCadastro}
              onChangeText={setEmailCadastro}
            />
            <TextInput
              placeholder="Senha"
              placeholderTextColor="#888"
              secureTextEntry
              style={styles.input}
              value={senhaCadastro}
              onChangeText={setSenhaCadastro}
            />

            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowRegister(false)}>
              <Text style={[styles.link, { marginTop: 16 }]}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 0,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
    marginTop: 120,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 40,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    paddingVertical: 10,
    marginBottom: 30,
    fontFamily: 'Inter',
  },
  button: {
    backgroundColor: '#878AF6',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Inter',
  },
  footerText: {
    marginTop: 24,
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    fontFamily: 'Inter',
  },
  link: {
    color: '#878AF6',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 32,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    elevation: 5,
  },
});
