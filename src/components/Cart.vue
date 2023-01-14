<template>
  <div
    class="cart"
    v-if="
      this.$store.state.price.quantity.h > 0 ||
      this.$store.state.price.quantity.c > 0 ||
      this.$store.state.price.quantity.s > 0
    "
  >
    <h1 id="cartTitle">Cart</h1>
    <div class="products">
      <div v-if="this.$store.state.price.quantity.h > 0">
        <p>
          Hamburger
          <span>{{ this.$store.state.price.quantity.h }}</span>
        </p>
        <button @click="remove" id="hamburger">Remove</button>
      </div>
      <div v-if="this.$store.state.price.quantity.c > 0">
        <p>
          Chinese <span>{{ this.$store.state.price.quantity.c }}</span>
        </p>
        <button @click="remove" id="chinese">Remove</button>
      </div>
      <div v-if="this.$store.state.price.quantity.s > 0">
        <p>
          Suschi <span>{{ this.$store.state.price.quantity.s }}</span>
        </p>
        <button @click="remove" id="suschi">Remove</button>
      </div>
      <div class="buttons">
        <button id="buy" @click="buy_cancel">Comprar</button>
        <button id="cancel" @click="buy_cancel">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<style>
.cart {
  position: absolute;
  right: 0;
  top: 0;
  height: 60vh;
  width: 40vw;
  margin: 10vh 4vw;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  border-radius: 0.5rem;
}
#cartTitle {
  padding: 0.5rem 0;
  color: white;
  text-align: center;
}
.products p {
  width: 80%;
  height: 20%;
  text-transform: uppercase;
}
.products span {
  margin: 2vh 0.5vw;
  background-color: #00cc00;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}
.products {
  flex-direction: column;
  width: 80%;
  height: 80%;
  margin: auto;
}
.products p,
.products span,
.products,
.products div {
  display: flex;
  justify-content: center;
  align-items: center;
}
.cart h2 {
  background-color: #000;
  color: white;
  text-align: center;
}
.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}
.buttons button {
  padding: 0.5rem 1rem;
  margin: 0 8px;
  border-radius: 0.5rem;
  border: none;
  color: #fff;
  cursor: pointer;
}
.buttons button:hover {
  transition: 0.5s;
  transform: scale(1.1);
}
#buy {
  background-color: #00cc00;
}
#cancel {
  background-color: #cc0000;
}
.products div button {
  margin-left: 0.5rem;
  background-color: #cc0000;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  color: #ccc;
}
.mensage {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 50%;
}
@media (max-width: 600px) {
  .cart {
    width: 70vw;
  }
}
</style>
<script>
export default {
  methods: {
    remove(e) {
      const element = e.target.id;
      this.$store.commit("removeProduct", element);
    },
    buy_cancel(e) {
      const el = e.target.id;
      this.$store.commit("buyCancel", el);
    },
  },
};
</script>
