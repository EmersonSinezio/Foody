<template>
  <div class="home">
    <Images />
    <Cart />
  </div>
</template>
<script>
import Cart from "@/components/Cart.vue";
import Images from "@/components/Images.vue";
export default {
  components: {
    Images,
    Cart,
  },
};
</script>
<style>
.home {
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
