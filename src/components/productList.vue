<template>
  <div class="products">
    <ProductCard  v-for="product in products" :product="product" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType  } from "vue";

//Import types
import { Products } from "./../typings/products";

//Components
import ProductCard from "./productCard.vue";

export default defineComponent({
  name: "kpn-product-list",

  components: {
    ProductCard
  },

  props: {
    products: {
      type: Array as PropType<Products>,
      default: () => [],
    },
  },
});
</script>

<style lang="scss" scoped>
  .products {
    @apply grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4;
  }
</style>
