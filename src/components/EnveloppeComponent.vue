<template>
  <div class="envelope">
    <div id="back" :class="{ 'animate': isOpen }">
      <svg xmlns="http://www.w3.org/2000/svg" 
        xmlns:xlink= "http://www.w3.org/1999/xlink" 
        height="660" width="1000">
        <polygon
          points="0,100 1000,100 1000,1000 0,1000"
          style="fill:#8f7551;stroke:none;stroke-width:0" />
      </svg>
    </div>
    <div id="front" :class="{ 'animate': isOpen }">
      <svg xmlns="http://www.w3.org/2000/svg" 
        xmlns:xlink= "http://www.w3.org/1999/xlink" 
        height="660" width="1000">
        <polygon
          points="0,100 500,400 1000,100 1000,660 0,660"
          style="fill:#a59073; stroke:#83735d; stroke-width:3" />
      </svg>
    </div>
    <div id="top" ref="topRef" :class="{ 'animate': isOpen }">
      <svg xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink= "http://www.w3.org/1999/xlink" 
        height="660" width="1000">
        <polygon
          points="0,100 500,400 1000,100"
          style="fill:#8f7551;stroke:#83735d;stroke-width:2">
          <animate id='opentop' ref="opentopRef" attributeName="points" dur="0.5s" fill="freeze" 
          begin="indefinite"
            from="0,100 500,400 1000,100"
            to="0,100 500,0 1000,100"/>
        </polygon>
      </svg>
    </div>
    
    <div class="letter" :class="{ 'animate': isOpen }">
      <div class="parchment"></div>
      <img :src="getImagePath()" id="photo"/>
      <div class="indice" :class="{ 'animate': isOpen }">
        <button  @click="showIndice">
          Indice
          <v-icon icon="mdi-magnify"></v-icon>
        </button>
        <span class="indice-text" :class="{ 'show': isShown }">{{ enigme.indice }}</span>
      </div>
    </div>
    <button class="button" @click="openUp" :class="{ 'animate': isOpen }">
      <img src="/assets/cachet.png"/>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Enigme } from '../types/game';

const isOpen = ref(false);
const isShown = ref(false);
const opentopRef = ref(null);
const topRef = ref(null);

const props = defineProps<{
  gameId: number,
  enigme: Enigme
}>()

function getImagePath(): string {
  return './assets/games/edition_' + props.gameId + '/enigme_' + props.enigme.id + '.jpg';
}
function showIndice() {
  isShown.value = true;
}
function openUp() {
  const opentop = opentopRef.value;
  const top = topRef.value;

  if (opentop) {
    opentop.beginElement();
  }
  if (top) {
    top.style.zIndex = 2;
  }

  isOpen.value = true;
}

</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Pirata+One|Bilbo+Swash+Caps&display=swap');
.indice {
  color: black;
  display: none;
  width: 90%;
  font-family: 'Bilbo Swash Caps', cursive;
  font-weight: 700;
  font-style: normal;
  font-size: 36px;
  z-index:8;
}
.envelope {
  margin: auto;
  position:relative;
  width:1000px;
  height:660px;
}

.envelope > * {
  position:absolute;
  top: 0;
  left: 0;
  display:none;
}

#back {
  display:block;
  z-index:0;
}

#front {
  display:block;
  z-index:10;
}

#top {
  display:block;
  z-index:11;
}

#top.animate, #front.animate, #back.animate, #envelope button.animate  { 
  opacity:0;
  visibility: hidden;
  transition: visibility 1s,opacity 1s;
  transition-delay: 1s;
}
#back.animate::after, #front.animate::after {
  display: none !important;
}

.letter {
  display:flex;
  flex-direction:column;
  align-items:center;
  z-index:5;
  left:15px;
  right:15px;
  bottom:5px;
  top:105px;
  overflow:hidden;
  font-family: 'Handlee', cursive;
  font-size:16px;
}
.letter.animate {
  animation:makebig 2s forwards; 
  animation-delay: 1s;
}
.parchment {
  position: absolute;
  display: flex;
	width: 98%;
  height: 75%;
  top: 12%; left: 50%; transform: translate(-50%, 0);
	padding: 4em;
	box-shadow: 0 0 125px #8f5922 inset;
	background: #fffef0;
  filter: url(#wavy2);
  background-image: url(data:image/png;base64,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);
}
.parchment:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: conic-gradient(#fff3, #fff0 2% 24%, #fff2 25%, #4321 0, #0000 27% 48%, #9632 50%, #fff2 0, #fff0 52% 73%, #9632 75%, #fff3 0, #fff0 78% 97%, #9632);
}
.courrier-title.animate {
  display: none;
}
.button.animate {
  display: none;
}

.indice.animate {
  display: block;
}
.indice button {
  padding: 0px;
  float: left;
  cursor: pointer;
}

.indice button:hover {
  transform:scale(1.2);
  color: black;
  transition: transform 1s, background-color 1s, color 1s;
}

.indice-text {
  display: block;
  padding-left: 20px;
  text-align: justify;
  margin-left: 150px;
  visibility: hidden;
  opacity:0;
}
.indice-text.show {
  opacity:1;
  visibility: visible;
  transition: visibility 1.5s,opacity 1.5s;
  transition-delay: 1.5s;
}
@keyframes makebig {
  0% { top: 105px; left: 15px; right: 15px; bottom: 5px; font-size:16px;}
  33% { top: -100px; left: 15px; right: 15px; bottom: 150px; font-size:16px; }
  100% { top: -100px; left: -25px; right: -25px; bottom: -100px;font-size: 24px; }
}

.letter img {
  z-index:8;
  height: auto;
  width: 90%;
  margin-top: 11%;
  border: solid 10px white;
}

.button {
  display:block;
  z-index:15;
  width:50px;
  height:50px;
  border-radius:50%;
  border:none;
  font-weight:bold;
  text-align: center;
  color:white;
  cursor:pointer;
  top:375px;
  left:475px;
  transition: transform 1s, background-color 1s, color 1s;
}
.button img {
  width: 100px;
  height: auto;
  margin-left: -50px;
  margin-top: -30px;
}

.button:hover {
  transform:scale(1.5);
  color: black;
  transition: transform 1s, background-color 1s, color 1s;
}

</style>