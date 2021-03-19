<template>
  <div class="loading">
    <div class="lds-spinner">
      <div v-for="item in 12" :key="'lds-spinner-' + item"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading'
};
</script>

<style scoped>
.loading {
  width: 100%;
}

.loading.small {
  width: auto;
}

.loading.small .lds-spinner {
  margin: 0;
  width: 32px;
  height: 32px;
}

.loading.small .lds-spinner div {
  transform-origin: 15px 15px;
}

.loading.small .lds-spinner div:after {
  top: 2px;
  left: 15px;
  width: 3px;
  height: 8px;
}

.loading.very .lds-spinner {
  width: 22px;
  height: 22px;
}

.loading.very .lds-spinner div {
  transform-origin: 12px 12px;
}

.loading.very .lds-spinner div::after {
  left: 10px;
  width: 2px;
  height: 6px;
}

.lds-spinner {
  display: block;
  position: relative;
  width: 64px;
  height: 64px;
  margin: 1rem auto;
}

.lds-spinner div {
  /*transform-origin: 32px 32px;*/
  transform-origin: 32px 32px;
  animation: lds-spinner 1.2s linear infinite;
}

.lds-spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  top: 3px;
  left: 29px;
  width: 5px;
  height: 14px;
  border-radius: 20%;
  background: #405bba;
}

.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}

.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}

.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}

.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}

.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}

.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}

.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}

.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}

.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}

.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}

.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}

.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}

@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
