import { createStore } from "vuex";

export default createStore({
  state: {
    products: [],
    price: {
      quantity: {
        h: 0,
        s: 0,
        c: 0,
      },
      show: false,
    },
  },
  mutations: {
    addProduct(state, e) {
      state.products.push(e);
      e == "suschi"
        ? (state.price.quantity.s += 1)
        : e == "chinese"
        ? (state.price.quantity.c += 1)
        : e == "hamburger"
        ? (state.price.quantity.h += 1)
        : null;
    },
    removeProduct(state, e) {
      const element = e;
      element == "hamburger"
        ? (this.state.price.quantity.h -= 1)
        : element == "chinese"
        ? (this.state.price.quantity.c -= 1)
        : element == "suschi"
        ? (this.state.price.quantity.s -= 1)
        : null;
    },
    buyCancel(state, e) {
      if (e == "buy") {
        state.price.show = true;
        state.price.quantity.c = 0;
        state.price.quantity.s = 0;
        state.price.quantity.h = 0;
        setTimeout(() => {
          state.price.show = false;
        }, 1500);
      } else {
        state.price.quantity.c = 0;
        state.price.quantity.s = 0;
        state.price.quantity.h = 0;
      }
    },
  },
});
