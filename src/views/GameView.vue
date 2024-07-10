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
        <EnveloppeComponent :gameId="selected!.id" :enigme="enigme"></EnveloppeComponent>
      </div>
      </v-carousel-item>
    </v-carousel>
	<svg style="position: fixed">
      <filter id="wavy2">
        <feTurbulence x="0" y="0" baseFrequency="0.02" numOctaves="5" seed="1" />
        <feDisplacementMap in="SourceGraphic" scale="20" />
      </filter>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from "../stores/GameStore";
import { ref, computed } from "vue";
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
    case 9 : return 'Huitieme lieu';
    case 10 : return 'Huitieme lieu';
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
.courriers {
  position: relative;  
  list-style-type: none;
  padding: 0;
  margin-bottom: 5.7%;
}
.courrier {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  transform: translateY(0) rotate(4deg) translateX(150px) scale(1);
  transform-origin: 0 0;
  transition: transform 0.6s cubic-bezier(.8,.2,.1,0.8) 0.1s, background 0.4s linear;
  cursor: pointer;
  user-select: none;
  
  :last-child { margin-bottom: 0; }
}
.courrier--next { 
  z-index: 5; 
  /*transform: translateY(-150px) rotate(4deg) translateX(150px) scale(1);*/
}

.courrier--out {
  animation: courrier-out 0.6s cubic-bezier(.8,.2,.1,0.8);
  transform: translateY(-50px) rotate(8deg) translateX(155px) scale(0.95);
  z-index: 1;
}

@keyframes courrier-out {
  0% { z-index: 20; transform: translateY(0px) rotate(-4deg); }
  50% { transform: translateY(-120%) rotate(-5deg) translateX(-40px); }
  80% { z-index: 1; }
  100% { transform: translateY(-50px) rotate(8deg) translateX(55px) scale(0.95); }
}

.courrier--current {
  cursor: auto;
  user-select: auto;
  position: relative;
  z-index: 10;
  transform: translateX(0%) scale(1);
}
</style>