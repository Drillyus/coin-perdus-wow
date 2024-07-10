<template>
  <div class="content">
    <p>Oh bonsoir cher aventurier, bienvenue dans mon humble taverne <span class="nom">Les coins perdus d'Azeroth</span></p>
    <p>Je reçois nombre de lettres de voyageurs évoquant des endroits atypiques dans tout azeroth, mais il n'indique jamais où il se trouve exactement.</p>
    <p>Je vous propose d'utiliser vos connaissances du monde et  votre ingéniosité pour retrouver ces lieux, installez vous bien et plongez vous dans cette aventure.</p>
    <br>
    <p>Il existe aujourd'hui 3 éditions :</p>
    <ul>
      <li>Lieux atypiques ( a venir)</li>
      <li>Spécial easter eggs ( a venir)</li>
      <li>Photo édition</li>
    </ul>  
    <br>
    <br>
    <p>P.S. : Ce site est a son commencement et évoluera. </p>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
.content {
  margin: 1% 10%;
  padding: 1% 5%;
  color: #fec106;
  background-color: #212121;
  border: solid 1px #3c3c3c;
  font-size: 25px;
  text-align: justify;
}
.content p {
  padding-bottom: 10px;
}
.content ul {
  padding-left: 40px;
  padding-bottom: 10px;
}
.nom {
  text-transform: uppercase;
  font-family: 'warcraft', sans-serif;
  font-size: 30px;
}
</style>
