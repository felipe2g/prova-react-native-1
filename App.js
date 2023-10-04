import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListagemItensLeilao from './src/components/ItemDeLeilao/Lista';
import CadastroItemLeilao from './src/components/ItemDeLeilao/Cadastro';
import DetalhesItemLeilao from './src/components/ItemDeLeilao/Detalhes';
import ListagemParticipantesLeilao from './src/components/Participantes/Lista';
import CadastroParticipanteLeilao from './src/components/Participantes/Cadastro';
import ListagemLancesLeilao from './src/components/Lance/Lista';
import CadastroLanceLeilao from './src/components/Lance/Cadastro';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="ItemLeilao"
          component={ItemLeilaoStack}
          options={{
            tabBarLabel: 'Itens',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="view-headline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Participante"
          component={ParticipantesLeilaoStack}
          options={{
            tabBarLabel: 'Participantes',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Lances"
          component={LancesLeilaoStack}
          options={{
            tabBarLabel: 'Lances',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="currency-usd" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const ItemLeilaoStack = () => {
  return (
    <Stack.Navigator initialRouteName="ListagemItensLeilao">
      <Stack.Screen name="ListagemItensLeilao" component={ListagemItensLeilao} />
      <Stack.Screen name="CadastroItemLeilao" component={CadastroItemLeilao} />
      <Stack.Screen name="DetalhesItemLeilao" component={DetalhesItemLeilao} />
      <Stack.Screen name="CadastroLanceLeilao" component={CadastroLanceLeilao} />
    </Stack.Navigator>
  );
}

const ParticipantesLeilaoStack = () => {
  return (
    <Stack.Navigator initialRouteName="ListagemParticipantesLeilao">
      <Stack.Screen name="ListagemParticipantesLeilao" component={ListagemParticipantesLeilao} />
      <Stack.Screen name="CadastroParticipanteLeilao" component={CadastroParticipanteLeilao} />
    </Stack.Navigator>
  );
}

const LancesLeilaoStack = () => {
  return (
    <Stack.Navigator initialRouteName="ListagemLancesLeilao">
      <Stack.Screen name="ListagemLancesLeilao" component={ListagemLancesLeilao} />
    </Stack.Navigator>
  );
}
