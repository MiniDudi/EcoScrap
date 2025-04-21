<template>
    <div>
      <!-- Floating Button -->
      <v-btn class="floating-btn" icon color="#5fd136" size="80" @click="toggleChat">
        <v-icon color="white" size="48">mdi-chat</v-icon>
      </v-btn>
  
      <!-- Chat Dialog -->
      <v-dialog v-model="isChatOpen" max-width="400px">
        <v-card>
          <v-card-title class="headline">Assitente EcoScrap</v-card-title>
          <v-card-text>
            <div v-for="(message, index) in chatMessages" :key="index">
              <v-chip class="mb-2" color="primary" text-color="white">
                {{ message }}
              </v-chip>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="toggleChat" color="red">Fechar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FloatingContainer',
    emits: ['click'],
    data() {
      return {
        isChatOpen: false,
        chatMessages: [
          "Olá, como posso ajudar você hoje?",
          "Estou aqui para responder suas perguntas.",
          "Qual é a sua dúvida?"
        ]
      };
    },
    methods: {
      toggleChat() {
        this.isChatOpen = !this.isChatOpen;
      }
    }
  }
  </script>
  
  <style scoped>
  .floating-btn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  </style>
  