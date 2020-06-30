<template>
  <div class="loader" v-if="isVisible">
    <div class="loader__wrapper"></div>
  </div>
</template>
<script src="./js/loader.js"></script>

<style lang="scss" scoped>
  .loader {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: lightgray;
    z-index: 4;
    text-align: center;
    top: 0;
    left: 0;

    &__wrapper {
      position: relative;
      top: 50%;
      left: 50%;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #42b983;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      animation: spin 2s linear infinite;
    }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
