<template>
  <div class="main">
    <div class="sub-main">
      <div class="description">
        <h1>Promoção Duplo Sabor</h1>
        <h3>R$ 19,90</h3>
        <p>Aproveite nossa promoção especial! Comprando um delicioso hambúrguer Duplo Sabor, você leva mais um de brinde.
          Além disso, acompanha uma porção generosa de batatas fritas. Não perca essa oportunidade de saborear dois
          suculentos hambúrgueres pelo preço de um, acompanhados de uma deliciosa batata frita. Aproveite essa oferta
          irresistível e desfrute de uma refeição incrível!</p>
        <button>Comprar</button>
      </div>
      <div class="img">
        <img
          src="https://i0.wp.com/mercadoeconsumo.com.br/wp-content/uploads/2019/04/Que-comida-saud%C3%A1vel-que-nada-brasileiro-gosta-de-fast-food.jpg?fit=1600%2C1067&ssl=1"
          alt="burger image">
      </div>
    </div>
  </div>
</template>
<style scoped>
.main {
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.sub-main {
  width: 100vw;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.img {
  width: 50vw;
  height: 50vh;
  border-radius: .5rem;
  animation: moveRight 2s;
}

img {
  height: 100%;
  min-width: 55vw;
}

.description {
  max-width: 45vw;
  min-height: 25vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  animation: moveLeft 2s;
}

.description button {
  padding: .5rem 1.5rem;
  border-radius: .5rem;
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
  margin-top: 1rem;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, .3);
  transition: .4s;
}

.description button:hover {
  border-color: rgba(255, 255, 255, .3);
  color: rgba(255, 255, 255, .5);
  cursor: pointer;
}

h3 {
  color: rgba(255, 255, 255, .4);
  margin: .5rem 0;
}

@keyframes moveLeft {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0);
  }
}

@keyframes moveRight {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0);
  }
}

@media (max-width:800px) {
  .img {
    display: none;
  }

  .description {
    font-size: .7rem;
    max-width: 90vw;
    text-align: center;
  }

  button {
    font-size: .8rem;
  }
}
</style>