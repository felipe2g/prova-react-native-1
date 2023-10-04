import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DetalhesItemLeilao = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;

  const goToCadastroItemLeilao = () => {
    navigation.navigate('CadastroLanceLeilao', { id: item.id });
  }

  const goToListagemItensLeilao = () => {
    navigation.navigate('ListagemItensLeilao', { id: item.id });
  }

  const handleEncerrarLeilao = async () => {
    try {
      await axios.patch(
        `https://leilao-rest-api.herokuapp.com/itemdeleilao/${item.id}`
      );

      goToListagemItensLeilao()
    } catch (error) {
      console.error('Erro ao fechar leilao', error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID:</Text>
      <Text style={styles.valor}>{item.id}</Text>

      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.valor}>{item.nome}</Text>

      <Text style={styles.label}>Valor Mínimo:</Text>
      <Text style={styles.valor}>R$ {item.valorMinimo}</Text>

      <Text style={styles.label}>Leilão Aberto:</Text>
      <Text style={styles.valor}>{item.leilaoAberto ? 'Sim' : 'Não'}</Text>

      <Text style={styles.label}>Lance Vencedor:</Text>
      <Text style={styles.valor}>{item.lanceVencedor || 'Nenhum'}</Text>

      {item.leilaoAberto && <TouchableOpacity onPress={goToCadastroItemLeilao} style={styles.botao}>
        <Text style={styles.textoBotao}>Dar lance</Text>
      </TouchableOpacity>}

      <TouchableOpacity onPress={handleEncerrarLeilao} style={styles.botaoRed}>
        <Text style={styles.textoBotao}>Fechar leilao</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  valor: {
    fontSize: 16,
    marginBottom: 12,
  },
  botao: {
    marginTop: 20,
    backgroundColor: 'green',
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
  botaoRed: {
    marginTop: 20,
    backgroundColor: 'red',
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
});

export default DetalhesItemLeilao;
