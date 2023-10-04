import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ListagemLancesLeilao = () => {
  const navigation = useNavigation();

  const [itensLeilao, setItensLeilao] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleListItens()
  });

  const handleListItens = async () => {
    axios
      .get('https://leilao-rest-api.herokuapp.com/lance/')
      .then((response) => {
        setItensLeilao(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao obter os itens de leilão:', error);
        setLoading(false);
      });
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => goToDetalhesItemLeilao(item.id)}
      key={item.id}
    >

      <View style={styles.item}>
          <Text style={styles.titulo}>Item {item.id}:</Text>
          <Text>Valor: R$ {item.valor}</Text>
          <Text>Arrematante:</Text>
          {item.arrematante && <Text> - Nome: {item.arrematante.nome}</Text>}
          {item.arrematante && <Text> - CPF: {item.arrematante.cpf}</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Carregando...</Text>
      ) : (
        <>
          <FlatList
            data={itensLeilao}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginVertical: 8,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descricao: {
    fontSize: 16,
  },
  lanceMinimo: {
    fontSize: 14,
    color: 'green',
  },
  botao: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  textoBotao: {
    color: 'white',
    fontSize: 18,
  },
  botaoExcluir: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 8,
  },
  textoBotaoExcluir: {
    color: 'white',
    fontWeight: 'bold',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ListagemLancesLeilao;
