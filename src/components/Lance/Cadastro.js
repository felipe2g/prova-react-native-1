// CadastroLanceLeilao.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const CadastroLanceLeilao = ({ route }) => {
  const navigation = useNavigation();
  const { id } = route.params;

  console.log("cadastroleilao item id= >", `https://leilao-rest-api.herokuapp.com/lance/${id}`)

  const [valor, setValor] = useState('');
  const [arrematante, setArrematante] = useState('');

  const goToListagemItensLeilao = () => {
    navigation.navigate('ListagemItensLeilao');
  };

  const handleCadastro = async () => {
    const newLance = {
      valor,
      arrematante: {
        id: arrematante
      }
    };

    try {
      const response = await axios.put(
        `https://leilao-rest-api.herokuapp.com/lance/${id}`,
        newLance
      );

      console.log('Lance cadastrado com sucesso:', response.data);

      setValor('');
      setArrematante('');

      goToListagemItensLeilao()
    } catch (error) {
      console.error('Erro ao cadastrar o Lance:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Valor do Lance:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setValor(text)}
        value={valor}
        placeholder="Digite o valor do Lance"
      />

      <Text style={styles.label}>Arrematante:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setArrematante(text)}
        value={arrematante}
        placeholder="Digite o id do arrematante"
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

export default CadastroLanceLeilao;
