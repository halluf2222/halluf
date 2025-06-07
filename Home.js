import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
} from "react-native";

import { useRoute } from '@react-navigation/native';






export default function HomeScreen() {
  const [activities, setActivities] = useState([]);
  const [view, setView] = useState("list");
  const [selectedActivity, setSelectedActivity] = useState(null);

  const [showChatModal, setShowChatModal] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);

  // Campos criação/edição
  const [title, setTitle] = useState("");
  const [limit, setLimit] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [location, setLocation] = useState("");

  // Chat
  const [chatMessage, setChatMessage] = useState("");

  const userName = "João";

  // Criar nova atividade
  const createActivity = () => {
    if (!title || !limit || !description || !goal || !location) return;

    const newActivity = {
      id: Date.now().toString(),
      title,
      limit,
      description,
      goal,
      location,
      createdAt: new Date(),
      creator: userName,
      participants: [],
      chat: [],
      donations: [],
    };

    setActivities([...activities, newActivity]);
    clearForm();
    setView("list");
  };

  // Atualizar atividade (na lista)
  const updateActivity = () => {
    if (!selectedActivity) return;

    const updated = {
      ...selectedActivity,
      title,
      limit,
      description,
      goal,
      location,
    };

    setActivities(
      activities.map((a) => (a.id === updated.id ? updated : a))
    );
    setSelectedActivity(updated);
    alert("Atividade atualizada!");
    clearForm();
  };

  const clearForm = () => {
    setTitle("");
    setLimit("");
    setDescription("");
    setGoal("");
    setLocation("");
    setSelectedActivity(null);
  };

  const handleSendMessage = () => {
    if (!chatMessage) return;
    const updatedActivity = {
      ...selectedActivity,
      chat: [...selectedActivity.chat, chatMessage],
    };
    setActivities(
      activities.map((a) => (a.id === updatedActivity.id ? updatedActivity : a))
    );
    setSelectedActivity(updatedActivity);
    setChatMessage("");
  };

  const getEmoji = (title) => {
    const lower = title.toLowerCase();
    if (lower.includes("jardin") || lower.includes("mato")) return "🌿";
    if (lower.includes("faxina") || lower.includes("limpeza")) return "🧹";
    if (lower.includes("comida") || lower.includes("alimento")) return "🍲";
    if (lower.includes("roupa")) return "👕";
    return "📌";
  };

  // Lista com botão Atualizar e Criar
  const renderList = () => (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <Text style={styles.topbarText}>
          Bem-vindo, {userName}! Vamos ver as atividades de hoje
        </Text>
      </View>

      {selectedActivity && (
        <View style={styles.updateForm}>
          <Text style={styles.updateTitle}>Editar Atividade Selecionada</Text>
          <TextInput
            placeholder="Nome da Atividade"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            placeholderTextColor="#999"
          />
          <TextInput
            placeholder="Limite de Pessoas"
            value={limit}
            onChangeText={setLimit}
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor="#999"
          />
          <TextInput
            placeholder="Descrição"
            value={description}
            onChangeText={setDescription}
            style={[styles.input, { height: 60 }]}
            multiline
            placeholderTextColor="#999"
          />
          <TextInput
            placeholder="Objetivo"
            value={goal}
            onChangeText={setGoal}
            style={styles.input}
            placeholderTextColor="#999"
          />
          <TextInput
            placeholder="Local"
            value={location}
            onChangeText={setLocation}
            style={styles.input}
            placeholderTextColor="#999"
          />

          <View style={styles.updateButtonsRow}>
            <TouchableOpacity
              style={[styles.floatingButton, { backgroundColor: "#4e46d6", flex: 1, marginRight: 10 }]}
              onPress={updateActivity}
            >
              <Text style={styles.fabText}>↻ Atualizar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.floatingButton, { flex: 1, backgroundColor: "#d64646" }]}
              onPress={() => {
                clearForm();
              }}
            >
              <Text style={styles.fabText}>✕ Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <FlatList
        style={{ flex: 1, marginTop: 10 }}
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              setSelectedActivity(item);
              setTitle(item.title);
              setLimit(item.limit);
              setDescription(item.description);
              setGoal(item.goal);
              setLocation(item.location);
              setShowChatModal(false);
              setShowDonationModal(false);
              setView("details");
            }}
          >
            <Text style={styles.itemEmoji}>{getEmoji(item.title)}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemSubtitle}>Limite: {item.limit}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma atividade criada ainda.</Text>
        }
      />

      <TouchableOpacity
        style={[styles.floatingButton, { bottom: 80, right: 20 }]}
        onPress={() => {
          clearForm();
          setView("create");
          setSelectedActivity(null);
        }}
      >
        <Text style={styles.fabText}>＋ Criar Atividade</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCreate = () => (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <Text style={styles.topbarText}>Vamos criar sua atividade</Text>
      </View>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <TextInput
          placeholder="Nome da Atividade"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Limite de Pessoas"
          value={limit}
          onChangeText={setLimit}
          keyboardType="numeric"
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
          style={[styles.input, { height: 60 }]}
          multiline
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Objetivo"
          value={goal}
          onChangeText={setGoal}
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Local (endereço ou ponto de referência)"
          value={location}
          onChangeText={setLocation}
          style={styles.input}
          placeholderTextColor="#999"
        />

        <TouchableOpacity
          style={[styles.floatingButton, { bottom: -10, right: 20 }]}
          onPress={createActivity}
        >
          <Text style={styles.fabText}>✓ Criar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setView("list")}
          style={{ marginTop: 20, alignSelf: "center" }}
        >
          <Text style={styles.link}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  const ChatModal = () => (
    <Modal
      visible={showChatModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowChatModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Chat - {selectedActivity?.title}</Text>
          <ScrollView style={{ mbottom: -50, right: 20 }}>
            {selectedActivity?.chat.length ? (
              selectedActivity.chat.map((msg, idx) => (
                <Text key={idx} style={styles.chatMessage}>
                  {msg}
                </Text>
              ))
            ) : (
              <Text style={{ color: "#999", fontStyle: "italic" }}>
                Nenhuma mensagem ainda.
              </Text>
            )}
          </ScrollView>
          <TextInput
            placeholder="Digite sua mensagem"
            value={chatMessage}
            onChangeText={setChatMessage}
            style={[styles.input, { marginBottom: 10 }]}
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            style={[styles.floatingButton, {bottom: 10, right: 20  }]}
            onPress={handleSendMessage}
          >
            <Text style={styles.fabText}>Enviar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.closeButton]}
            onPress={() => setShowChatModal(false)}
          >
            <Text style={styles.closeText}>✕ Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const DonationModal = () => (
    <Modal
      visible={showDonationModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowDonationModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Doação - {selectedActivity?.title}</Text>
          <TextInput
            placeholder="Digite o valor da doação"
            keyboardType="numeric"
            style={[styles.input, { marginBottom: 10 }]}
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            style={[styles.floatingButton, { bottom: 10, right: 20  }]}
            onPress={() => {
              alert("Doação efetuada com sucesso!");
              setShowDonationModal(false);
            }}
          >
            <Text style={styles.fabText}>Doar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.closeButton]}
            onPress={() => setShowDonationModal(false)}
          >
            <Text style={styles.closeText}>✕ Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderDetails = () => (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.detailsScroll}>
        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>{selectedActivity?.title}</Text>
          <Text style={styles.detailsSubtitle}>Criado por: {selectedActivity?.creator}</Text>
          <Text style={styles.detailsInfo}>
            Criado em: {selectedActivity?.createdAt.toLocaleDateString()}
          </Text>
          <Text style={styles.detailsInfo}>Limite: {selectedActivity?.limit} pessoas</Text>
          <Text style={styles.detailsInfo}>Local: {selectedActivity?.location}</Text>
          <Text style={styles.detailsDescription}>{selectedActivity?.description}</Text>
          <Text style={styles.detailsGoal}>Objetivo: {selectedActivity?.goal}</Text>
          <Text style={styles.detailsInfo}>
            Participantes: {selectedActivity?.participants.length}
          </Text>
        </View>

        <View style={styles.fabGroup}>
          <TouchableOpacity
            style={[styles.floatingButton, {bottom: -50, right: 20 }]}
            onPress={() => setShowChatModal(true)}
          >
            <Text style={styles.fabText}>💬 Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.floatingButton, { bottom: -110, right: 20  }]}
            onPress={() => setShowDonationModal(true)}
          >
            <Text style={styles.fabText}>💰 Doar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.floatingButton, { bottom: -880, right: 20  }]}
            onPress={() => alert("Botão Criar aqui? Talvez leve para criar nova atividade")}
          >
            <Text style={styles.fabText}>＋ Criar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ChatModal />
      <DonationModal />

      <TouchableOpacity
        style={[styles.backButton]}
        onPress={() => {
          setView("list");
          setSelectedActivity(null);
          setShowChatModal(false);
          setShowDonationModal(false);
          clearForm();
        }}
      >
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );

  return view === "list"
    ? renderList()
    : view === "create"
    ? renderCreate()
    : renderDetails();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  topbar: {
    backgroundColor: "#6a5acd",
    padding: 20,
    borderRadius: 25,
    marginBottom: 15,
  },

  topbarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },

  item: {
    flexDirection: "row",
    backgroundColor: "#f9f9fb",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#aaa",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },

  itemEmoji: {
    fontSize: 30,
    marginRight: 12,
  },

  itemTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },

  itemSubtitle: {
    fontSize: 14,
    color: "#666",
  },

  empty: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
    fontStyle: "italic",
  },

  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#6a5acd",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#444",
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  fabText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
    color: "#333",
    backgroundColor: "#fefefe",
  },

  link: {
    color: "#6a5acd",
    fontWeight: "600",
    fontSize: 16,
  },

  updateForm: {
    backgroundColor: "#f2f2fc",
    padding: 15,
    borderRadius: 18,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#666",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },

  updateTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#4e46d6",
  },

  updateButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 20,
    width: "90%",
    maxHeight: "70%",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },

  modalHeader: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    color: "#6a5acd",
    textAlign: "center",
  },

  chatMessage: {
    backgroundColor: "#f0f0f7",
    borderRadius: 15,
    padding: 10,
    marginVertical: 3,
    color: "#333",
  },

  closeButton: {
    marginTop: 15,
    alignSelf: "center",
  },

  closeText: {
    color: "#d64646",
    fontWeight: "700",
    fontSize: 16,
  },

  backButton: {
    position: "absolute",
    top: 35,
    left: 20,
    backgroundColor: "#6a5acd",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 5,
  },

  backButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  detailsScroll: {
    paddingBottom: 120,
  },

  detailsCard: {
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 25,
    marginBottom: 20,
    elevation: 6,
    shadowColor: "#444",
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 6 },
  },

  detailsTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#4e46d6",
    marginBottom: 10,
  },

  detailsSubtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#777",
    marginBottom: 10,
  },

  detailsInfo: {
    fontSize: 16,
    color: "#555",
    marginBottom: 6,
  },

  detailsDescription: {
    fontSize: 17,
    fontWeight: "400",
    color: "#444",
    marginVertical: 10,
    lineHeight: 22,
  },

  detailsGoal: {
    fontSize: 17,
    fontWeight: "700",
    color: "#6a5acd",
    marginTop: 10,
    marginBottom: 18,
  },

  fabGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
});
