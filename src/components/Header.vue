<template>
  <header class="header">
    <router-link to="/" class="link">
      <h1 class="logo"><span id="logo">F</span>oody</h1>
    </router-link>
    <router-link to="/about" class="link"><button>About</button></router-link>
  </header>
</template>

<style>
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ffff89;
  height: 10vh;
}
.link {
  text-decoration: none;
}
.logo,
#logo {
  background-color: #ffff89;
  color: #000;
  font-family: "Rubik Vinyl", cursive;
  border-bottom: transparent;
}
#logo {
  color: #00cc00;
}
.logo:hover {
  transition: 0.8s;
  border-bottom: 1px solid #00cc00;
}
.link button {
  background-color: #00cc00;
  padding: 0.5rem 1.5rem;
  border-radius: 1rem;
  border: none;
}
.link button:hover {
  transition: 0.5s;
  background-color: transparent;
  border: 1px solid #00cc00;
  cursor: pointer;
}
.link {
  background-color: #ffff89;
}
</style>
