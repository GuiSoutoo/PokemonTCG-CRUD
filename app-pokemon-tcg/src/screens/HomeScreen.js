import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import api from '../services/api';

export default function HomeScreen({ onNavigateToForm }) {
  const [cartas, setCartas] = useState([]);

  const fetchCartas = async () => {
    try {
      const response = await api.get('/cartas');
      setCartas(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar as cartas.');
    }
  };

  useEffect(() => {
    fetchCartas();
  }, [onNavigateToForm]); // Recarrega se houver navegação

  const deleteCarta = async (id) => {
    try {
      await api.delete(`/cartas/${id}`);
      Alert.alert('Sucesso', 'Carta deletada!');
      fetchCartas();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível deletar a carta.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coleção Pokémon TCG</Text>

      {cartas.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyText}>Sua coleção está vazia.</Text>
          <Text style={styles.emptySubtext}>Adicione novas cartas para visualizá-las nesta aba.</Text>
        </View>
      ) : (
        <FlatList
          data={cartas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {item.imagemUrl ? (
                <Image source={{ uri: item.imagemUrl }} style={styles.image} />
              ) : (
                <View style={[styles.image, styles.imagePlaceholder]} />
              )}

              <View style={styles.cardContent}>
                <Text style={styles.cardName}>{item.nome}</Text>
                <Text>{item.tipo} - HP: {item.hp}</Text>
                <Text style={styles.rarity}>{item.raridade}</Text>
                <Text style={styles.price}>R$ {item.precoMercado}</Text>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity onPress={() => onNavigateToForm(item)}>
                  <Text style={styles.editBtn}>✏️</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteCarta(item.id)}>
                  <Text style={styles.deleteBtn}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f0f0f0' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', marginTop: 40, color: '#333' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: { width: 70, height: 100, borderRadius: 5, marginRight: 15 },
  imagePlaceholder: { backgroundColor: '#ddd' },
  cardContent: { flex: 1 },
  cardName: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50' },
  rarity: { fontSize: 12, color: '#7f8c8d', fontStyle: 'italic' },
  price: { fontSize: 16, fontWeight: 'bold', color: '#27ae60', marginTop: 5 },
  actions: { paddingLeft: 10, gap: 20 },
  editBtn: { fontSize: 20 },
  deleteBtn: { fontSize: 20 },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 10
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34495e',
    textAlign: 'center'
  },
  emptySubtext: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 10
  },
  addButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 10,
    elevation: 5
  },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 }
});
