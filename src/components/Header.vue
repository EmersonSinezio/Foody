<template>
  <div class="header">
    <router-link to="/" class="link-button">
      <h1>Foody</h1>
    </router-link>
    <router-link to="/about" class="link-button">
      <button>Sobre</button>
    </router-link>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 10vh;
}

button {
  padding: .4rem 1.5rem;
  background-color: transparent;
  color: white;
  border-radius: .5rem;
  border: 1px solid white;
  transition: .4s;
}

button:hover {
  border-color: rgba(255, 255, 255, .3);
  color: rgba(255, 255, 255, .5);
  cursor: pointer;
}

.link-button {
  color: #fff;
}

.link-button h1:hover {
  transition: .5s;
  color: rgba(255, 255, 255, .5);
  cursor: pointer;
}
</style>