<template>
  <div class="images">
    <div v-if="this.$store.state.price.show" class="mensage">
      <h1>Compra efetuada com sucesso!</h1>
    </div>
    <img
      src="@/assets/Burgao_batata.png"
      alt="Hamburger_Com_Fritas"
      class="imageMaster"
    />
    <div class="imagesPreview">
      <div class="desc">
        <p v-if="hamburguer.show">
          Hamburguer <span>R$ {{ hamburguer.price }}</span>
        </p>
        <img
          src="@/assets/Burgao.png"
          alt="Hamburguer"
          id="hamburger"
          @mouseenter="showChange"
          @mouseleave="hidden"
          @click="addproduct"
        />
      </div>
      <div class="desc">
        <p v-if="chinese.show">
          Comida Chinesa <span>R$ {{ chinese.price }}</span>
        </p>
        <img
          src="@/assets/Chinese.png"
          alt="Comida_Chinesa"
          id="chinese"
          @mouseenter="showChange"
          @mouseleave="hidden"
          @click="addproduct"
        />
      </div>
      <div class="desc">
        <p v-if="suschi.show">
          Suschi <span>R$ {{ suschi.price }}</span>
        </p>
        <img
          src="@/assets/suschi.png"
          alt="Suschi"
          id="suschi"
          @mouseenter="showChange"
          @mouseleave="hidden"
          @click="addproduct"
        />
      </div>
    </div>
  </div>
</template>

<style>
.images {
  width: 100%;
  height: 100%;
}
.imageMaster {
  width: 60vw;
  height: 50vh;
  position: relative;
  margin: 5vh 20vw;
}
.imagesPreview {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80vw;
  margin: 0 auto;
}
.imagesPreview img {
  width: 20vw;
  height: 20vh;
  border: 1px solid gray;
  margin: 2vh 1vw;
}
.desc {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.desc p {
  background-color: #00cc00;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}
.desc span {
  background-color: #fffc00;
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
}
.imageMaster,
.imagesPreview img {
  border-radius: 0.5rem;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
}
.mensage {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  height: 13vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ccc;
}
@media (max-width: 600px) {
  .imageMaster {
    width: 80vw;
    height: 40vh;
    margin: 10vh 0 5vh 10vw;
  }
  .imagesPreview img {
    width: 25vw;
    height: 20vh;
  }
  .desc p {
    font-size: 0.8rem;
  }
  .desc span {
    font-size: 0.6rem;
  }
}
</style>
<script>
export default {
  data() {
    return {
      hamburguer: {
        show: false,
        price: 30,
      },
      chinese: {
        show: false,
        price: 35,
      },
      suschi: {
        show: false,
        price: 27,
      },
    };
  },
  methods: {
    showChange(e) {
      const element = e.target.id;
      element == "suschi" ? (this.suschi.show = true) : null;
      element == "chinese" ? (this.chinese.show = true) : null;
      element == "hamburger" ? (this.hamburguer.show = true) : null;
    },
    hidden(e) {
      const element = e.target.id;
      element == "suschi" ? (this.suschi.show = false) : null;
      element == "chinese" ? (this.chinese.show = false) : null;
      element == "hamburger" ? (this.hamburguer.show = false) : null;
    },
    addproduct(e) {
      const element = e.target.id;
      element == "suschi" ? this.$store.commit("addProduct", element) : null;
      element == "chinese" ? this.$store.commit("addProduct", element) : null;
      element == "hamburger" ? this.$store.commit("addProduct", element) : null;
    },
  },
};
</script>
