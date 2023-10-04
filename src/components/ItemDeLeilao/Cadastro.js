// CadastroItemLeilao.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const CadastroItemLeilao = () => {
    const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [valorMinimo, setValorMinimo] = useState('');
  const [leilaoAberto, setLeilaoAberto] = useState(true);

  const goToListagemItensLeilao = () => {
    navigation.navigate('ListagemItensLeilao');
};

  const handleCadastro = async () => {
    const newItem = {
      nome,
      valorMinimo: parseFloat(valorMinimo),
      leilaoAberto,
    };

    try {
      const response = await axios.post(
        'https://leilao-rest-api.herokuapp.com/itemdeleilao/',
        newItem
      );

      console.log('Item de leilão cadastrado com sucesso:', response.data);

      setNome('');
      setValorMinimo('');
      setLeilaoAberto(true);

      goToListagemItensLeilao()
    } catch (error) {
      console.error('Erro ao cadastrar o item de leilão:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Item:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setNome(text)}
        value={nome}
        placeholder="Digite o nome do item"
      />

      <Text style={styles.label}>Valor Mínimo:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setValorMinimo(text)}
        value={valorMinimo}
        placeholder="Digite o valor mínimo do lance"
        keyboardType="numeric"
      />

      <Button title="Cadastrar" onPress={handleCadastro} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});

export default CadastroItemLeilao;
