<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Truecaller App</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  position: sticky;
  top: 0;
  padding: 15px 20px;
  background-color: #42b983;
  z-index: 999;
  a {
    font-weight: bold;
    color: #ffffff;
    text-decoration: none;
    font-size: 18px;

    &.router-link-exact-active {
      color: #ffffff;
    }
  }
}
</style>
