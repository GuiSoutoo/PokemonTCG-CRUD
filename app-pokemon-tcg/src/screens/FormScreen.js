import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import api from '../services/api';

export default function FormScreen({ cartaParaEditar, onBack }) {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [raridade, setRaridade] = useState('');
  const [hp, setHp] = useState('');
  const [precoMercado, setPrecoMercado] = useState('');
  const [dataLancamento, setDataLancamento] = useState(new Date().toISOString().split('T')[0]);
  const [imagemUrl, setImagemUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cartaParaEditar) {
      setId(cartaParaEditar.id);
      setNome(cartaParaEditar.nome);
      setTipo(cartaParaEditar.tipo);
      setRaridade(cartaParaEditar.raridade);
      setHp(String(cartaParaEditar.hp));
      setPrecoMercado(String(cartaParaEditar.precoMercado));
      setDataLancamento(cartaParaEditar.dataLancamento);
      setImagemUrl(cartaParaEditar.imagemUrl || '');
    }
  }, [cartaParaEditar]);

  const handleSave = async () => {
    if (!id || !nome || !tipo || !hp || !imagemUrl) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos, incluindo o ID.');
      return;
    }

    const dadosCarta = {
      id,
      nome,
      tipo,
      raridade,
      hp: Number(hp),
      precoMercado: Number(precoMercado),
      dataLancamento,
      imagemUrl
    };

    setLoading(true);

    try {
      if (cartaParaEditar) {
        await api.put(`/cartas/${cartaParaEditar.id}`, dadosCarta);
        Alert.alert('Sucesso', 'Carta atualizada!');
      } else {
        await api.post('/cartas', dadosCarta);
        Alert.alert('Sucesso', 'Carta cadastrada!');
      }
      onBack();
    } catch (error) {
      console.error(error);
      const msgErro = error.response?.data?.message || 'Erro ao conectar com o servidor.';
      Alert.alert('Erro', msgErro);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{cartaParaEditar ? 'Editar Carta' : 'Nova Carta'}</Text>

      {imagemUrl ? (
        <Image source={{ uri: imagemUrl }} style={styles.previewImage} />
      ) : (
        <View style={[styles.previewImage, styles.imagePlaceholder]}>
          <Text>Prévia da Imagem</Text>
        </View>
      )}

      <Text style={styles.label}>ID da Carta (Único)</Text>
      <TextInput
        style={[styles.input, cartaParaEditar && styles.disabledInput]}
        value={id}
        onChangeText={setId}
        placeholder="Ex: PKM-001"
        editable={!loading && !cartaParaEditar} // Não permite mudar o ID na edição
      />

      <Text style={styles.label}>URL da Imagem</Text>
      <TextInput style={styles.input} value={imagemUrl} onChangeText={setImagemUrl} placeholder="Link da imagem" editable={!loading} />

      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Pikachu" editable={!loading} />

      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Tipo</Text>
          <TextInput style={styles.input} value={tipo} onChangeText={setTipo} placeholder="Elétrico" editable={!loading} />
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.label}>HP</Text>
          <TextInput style={styles.input} value={hp} onChangeText={setHp} keyboardType="numeric" placeholder="60" editable={!loading} />
        </View>
      </View>

      <Text style={styles.label}>Raridade</Text>
      <TextInput style={styles.input} value={raridade} onChangeText={setRaridade} placeholder="Raro" editable={!loading} />

      <Text style={styles.label}>Preço (R$)</Text>
      <TextInput style={styles.input} value={precoMercado} onChangeText={setPrecoMercado} keyboardType="numeric" placeholder="50.00" editable={!loading} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.saveBtn, loading && { backgroundColor: '#ccc' }]}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>SALVAR CARTA</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelBtn} onPress={onBack} disabled={loading}>
          <Text style={styles.btnText}>CANCELAR</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', marginTop: 40 },
  previewImage: { width: 120, height: 170, alignSelf: 'center', borderRadius: 10, marginBottom: 20 },
  imagePlaceholder: { backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed', borderWidth: 1, borderColor: '#ccc' },
  label: { fontSize: 14, fontWeight: 'bold', marginTop: 10 },
  input: { borderBottomWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 },
  disabledInput: { backgroundColor: '#f9f9f9', color: '#999' },
  row: { flexDirection: 'row' },
  buttonContainer: { marginTop: 30, gap: 10, marginBottom: 50 },
  saveBtn: { backgroundColor: '#27ae60', padding: 15, borderRadius: 8, alignItems: 'center', minHeight: 50, justifyContent: 'center' },
  cancelBtn: { backgroundColor: '#95a5a6', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' }
});
