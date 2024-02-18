
import { displayPartsToString } from 'typescript';
<template>
  <div class="content">
    <div class="game-title"> {{ selected?.titre }}</div>
    <div class="d-flex justify-center align-center py-4">
      <v-btn
        variant="text"
        icon="mdi-chevron-left"
        @click="model = Math.max(model - 1, 0)"
        :class="{ hidden: model === 0}"
        style="font-size: 35px;"
      ></v-btn>
      <div>{{ getName(model+1) }}</div>
      <v-btn
        variant="text"
        icon="mdi-chevron-right"
        @click="model = Math.min(model + 1, 7)"
        :class="{ hidden: model === 7}"
        style="font-size: 35px;"
      ></v-btn>
    </div>
    <v-carousel
      height="auto"
      hide-delimiters
      :show-arrows="false"
      cover
      v-model="model"
    >
      <v-carousel-item
        v-for="(enigme, i) in selected?.enigmes"
        :key="i"
      >
      <div class="enigme">
        <EnveloppeComponent :enigme="enigme"></EnveloppeComponent>
      </div>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from "../stores/GameStore";
import { computed, ref } from "vue";
import EnveloppeComponent from "../components/EnveloppeComponent.vue";

const gameStore = useGameStore();

const model = ref(0);
const selected = computed(() => {
  return gameStore.getSelected;
});

function getName(i:number): string {
  switch(i) {
    case 1 : return 'Premier lieu';
    case 2 : return 'Deuxieme lieu';
    case 3 : return 'Troisieme lieu';
    case 4 : return 'Quatrieme lieu';
    case 5 : return 'Cinquieme lieu';
    case 6 : return 'Sixieme lieu';
    case 7 : return 'Septieme lieu';
    case 8 : return 'Huitieme lieu';
  }
}
</script>

<style>
.content {
  margin: 1% 10%;
  padding: 1% 5%;
  color: #fec106;
  background-color: #212121;
  border: solid 1px #3c3c3c;
  font-size: 25px;
}
.game-title {
  text-transform: uppercase;
  font-weight: 700;
  text-align: center;
}
.enigme {
  text-align: center;
}
.enigme-texte {
  position: absolute;
  display: none;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.hidden {
  display: none;
}
</style>