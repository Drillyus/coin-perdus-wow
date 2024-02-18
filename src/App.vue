
<template>
  <v-app>
    <v-toolbar app class="navbar">
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          <div class="d-flex">
            <img src="./assets/logo.png" class="logo"/>
            <span class="title">Les coins perdus d'azeroth</span>
          </div>
        </router-link>      
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat class="btn-nav" @click="router.push('/')" :class=" { selected: isSelected(-1)}">
          Accueil
        </v-btn>
        <v-btn v-for="game in games" :key="game.id" flat class="btn-nav"  @click="goToGame(game)">
          <v-icon start icon="mdi-map-search"></v-icon>
          <span :class="{ selected: isSelected(game.id)}">{{ game.titre }}</span>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useGameStore } from "./stores/GameStore";
import { Game } from "./types/game";

const gameStore = useGameStore();
const router = useRouter();

const games = computed(() => {
  return gameStore.getGames;
});

function goToGame(game: Game) {
  gameStore.setSelected(game);
  router.push('/game');
}

function isSelected(id: number): boolean {
  if(id === -1 && !gameStore.getSelected) {
    return true;
  }
  return gameStore.getSelected?.id === id;
}

onMounted(() => {
  gameStore.fetchGames();
})
</script>
<style scoped>
.navbar {
  background-color: #212121;
  border-bottom: solid 1px #3c3c3c;
}
.logo {
  height: 50px;
}
.title {
  padding: 12px;
  font-size: 30px;
  color: #fec106;
  text-decoration-line: underline;
  text-decoration-color: #8b4513;
  font-family: 'warcraft', sans-serif;
}
.btn-nav {
  color: #fec106;
  font-size: 22px;
}
.icon {
  height: 22px;
  width: 22px;
  margin-right: 8px;
}
.selected {
  text-decoration-line: underline;
  text-decoration-color: #8b4513;
}
</style>
