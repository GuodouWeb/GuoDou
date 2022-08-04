<template>
  <div class="card" :style="{ height: props.height + 'px' }">
    <h1 style="text-align: left; width: 80%">{{ props.cardName }}</h1>
    <h2>{{ props.cardData }}</h2>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  cardName: String,
  cardData: {
    default() {
      return 0;
    },
  },
  cardDesc: {
    type: String,
    default() {
      return "";
    },
  },
  height: {
    type: Number,
    default() {
      return 200;
    },
  },
});
</script>

<style scoped>
/* From uiverse.io by @bhaveshxrawat */
.card {
  width: 190px;
  background: #07182e;
  position: relative;
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
}
.card h2 {
  padding-top: 25px;
  z-index: 1;
  color: white;
  font-size: 2em;
}
.card h1 {
  z-index: 1;
  color: white;
  font-size: 1.5em;
}

.card::before {
  content: "";
  position: absolute;
  width: 100px;
  background-image: linear-gradient(
    180deg,
    rgb(0, 183, 255),
    rgb(255, 48, 255)
  );
  height: 300%;
  animation: rotBGimg 3s linear infinite;
  transition: all 0.2s linear;
}

@keyframes rotBGimg {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.card::after {
  content: "";
  position: absolute;
  background: #07182e;
  inset: 5px;
  border-radius: 15px;
}
</style>
