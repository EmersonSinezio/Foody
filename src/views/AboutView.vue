<template>
  <div class="about">
    <h1>Projeto desenvolvido com Vue-js</h1>
    <div>
      <a href="https://github.com/EmersonSinezio">
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original-wordmark.svg"
        />
      </a>
      <a href="https://www.linkedin.com/in/emerson-mesquita-317a81258/">
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original-wordmark.svg"
        />
      </a>
    </div>
  </div>
</template>
<style>
.about {
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.about h1 {
  width: 50vw;
  background-color: #00cc00;
  color: #ccc;
  text-align: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
}
.about div {
  display: flex;
  margin-top: 5vh;
}
.about div img {
  background-color: #00cc00;
  margin: 0 5vw;
  padding: 1rem 1.2rem;
  border-radius: 0.5rem;
  color: #ccc;
  width: 20vw;
  height: 20vh;
}
@media (max-width: 600px) {
  .about h1 {
    width: 80vw;
    font-size: 1.5rem;
  }
  .about div img {
    width: 100px;
    height: 100px;
  }
}
</style>
