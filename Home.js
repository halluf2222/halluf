import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const [activities, setActivities] = useState([]);
  const [view, setView] = useState('list'); // 'list', 'create', 'details'
  const [selectedActivity, setSelectedActivity] = useState(null);

  const [title, setTitle] = useState('');
  const [limit, setLimit] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');

  const createActivity = () => {
    if (!title || !limit || !description || !goal) return;

    const newActivity = {
      id: Date.now().toString(),
      title,
      limit,
      description,
      goal,
    };
    setActivities([...activities, newActivity]);
    setTitle('');
    setLimit('');
    setDescription('');
    setGoal('');
    setView('list');
  };

  const renderList = () => (
    <View style={styles.listContainer}>
      <Text style={styles.header}>Atividades Disponíveis</Text>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => {
            setSelectedActivity(item);
            setView('details');
          }}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemSubtitle}>Limite: {item.limit}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma atividade criada ainda.</Text>}
      />
      <TouchableOpacity style={[styles.button, { marginTop: 50 }]} onPress={() => setView('create')}>
        <Text style={styles.buttonText}>Criar Nova Atividade</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCreate = () => (
    <View style={styles.formContainer}>
      <Text style={styles.header}>Nova Atividade</Text>
      <TextInput placeholder="Nome da Atividade" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Limite de Pessoas" value={limit} onChangeText={setLimit} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Descrição" value={description} onChangeText={setDescription} style={styles.input} />
      <TextInput placeholder="Objetivo" value={goal} onChangeText={setGoal} style={styles.input} />
      <TouchableOpacity style={styles.button} onPress={createActivity}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setView('list')}>
        <Text style={styles.link}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );

  const renderDetails = () => (
    <View style={styles.detailsContainer}>
      <Text style={styles.header}>{selectedActivity.title}</Text>
      <Text style={styles.detailText}>Limite de Pessoas: {selectedActivity.limit}</Text>
      <Text style={styles.detailText}>Descrição: {selectedActivity.description}</Text>
      <Text style={styles.detailText}>Objetivo: {selectedActivity.goal}</Text>
      <TouchableOpacity style={styles.button} onPress={() => alert('Você entrou na atividade!')}>
        <Text style={styles.buttonText}>Entrar na Atividade</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setView('list')}>
        <Text style={styles.link}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );

  if (view === 'create') return renderCreate();
  if (view === 'details') return renderDetails();
  return renderList();
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  formContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#555',
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#878AF6',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    marginTop: 12,
    color: '#878AF6',
    textAlign: 'center',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
});
