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
      <img :src="enigme.photo" id="photo"/>
      <div class="indice" :class="{ 'animate': isOpen }">
        <button  @click="showIndice">
          Indice
          <v-icon icon="mdi-magnify"></v-icon>
        </button>
        <span class="indice-text"  :class="{ 'show': isShown }">{{ enigme.indice }}</span></div>
    </div>
    <button class="button" @click="openUp" :class="{ 'animate': isOpen }">
      <img src="../assets/cachet.png"/>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Enigme } from "../types/game";

const isOpen = ref(false);
const isShown = ref(false);
const opentopRef = ref(null);
const topRef = ref(null);

defineProps<{
  enigme: Enigme
}>()

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
.indice {
  color: black;
  display: none;
  width: 90%;
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
  background-image: url(../assets/paper.jpg);
  z-index:5;
  left:15px;
  right:15px;
  bottom:5px;
  top:105px;
  /* https://boxshadows.com/presets */
  box-shadow:0px 1px 3px 0px rgba(0,0,0,0.1) , 0px 1px 2px 0px rgba(0,0,0,0.06) ;
  overflow:hidden;
  font-family: 'Handlee', cursive;
  font-size:16px;
}

.letter.animate {
  animation:makebig 2s forwards; 
  animation-delay: 1s;
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
  transition: visibility 1s,opacity 1s;
  transition-delay: 1s;
}
@keyframes makebig {
  0% { top: 105px; left: 15px; right: 15px; bottom: 5px; font-size:16px;}
  33% { top: -100px; left: 15px; right: 15px; bottom: 150px; font-size:16px; }
  100% { top: -100px; left: -25px; right: -25px; bottom: -100px;font-size: 24px; }
}

.letter img {
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
  top:calc(400px - 25px);
  left:calc(500px - 25px);
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