import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import FormScreen from './src/screens/FormScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [cartaParaEditar, setCartaParaEditar] = useState(null);

  const navigateToForm = (carta = null) => {
    setCartaParaEditar(carta);
    setCurrentScreen('Form');
  };

  const navigateToHome = () => {
    setCartaParaEditar(null);
    setCurrentScreen('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Área de Conteúdo */}
      <View style={styles.content}>
        {currentScreen === 'Home' ? (
          <HomeScreen onNavigateToForm={navigateToForm} />
        ) : (
          <FormScreen cartaParaEditar={cartaParaEditar} onBack={navigateToHome} />
        )}
      </View>

      {/* Barra de Navegação Inferior (Bottom Tab Bar) */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={navigateToHome}
        >
          <Text style={[styles.tabIcon, currentScreen === 'Home' && styles.tabActiveText]}>🎴</Text>
          <Text style={[styles.tabLabel, currentScreen === 'Home' && styles.tabActiveText]}>Coleção</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigateToForm()}
        >
          <Text style={[styles.tabIcon, currentScreen === 'Form' && !cartaParaEditar && styles.tabActiveText]}>➕</Text>
          <Text style={[styles.tabLabel, currentScreen === 'Form' && !cartaParaEditar && styles.tabActiveText]}>Novo</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    height: 70,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
    paddingBottom: 10,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    fontSize: 24,
    color: '#95a5a6',
  },
  tabLabel: {
    fontSize: 12,
    color: '#95a5a6',
    fontWeight: 'bold',
  },
  tabActiveText: {
    color: '#e74c3c', // Cor de destaque (vermelho Pokémon)
  }
});
