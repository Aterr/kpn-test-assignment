<template>
  <Card class="product-card">
    <template #header>
      <img src="./../assets/sample.jpg" />
    </template>

    <template #title> {{ product.manufacturer }} {{ product.variants.length }} </template>
    <template #subtitle>{{ product.model }} </template>

    <template #content>
      <div class="trade-in-deal">
        <img src="./../assets/inruildeal.svg" v-if="product.variants.some(variant => variant.attributes.promotion_label_kz !== null)">
      </div>
      <div class="available-colors">
        <span
          v-for="color in colors"
          :style="{'background': color.colorCode}"
          :class="{'active': activeColor === color.colorName}"
          @click="setActive(color.colorName)"
        />
      </div>
      <p v-if="product.attributes.promotion_label !== null" :class="{'green': product.attributes.promotion_bg_color === 'green'}">
        {{ product.attributes.promotion_label }}
      </p>
    </template>

    <template #footer>
      <Button label="Bekijk" icon="pi pi-angle-right" iconPos="right" text />
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Color {
  colorCode: string;
  colorName: string;
  color: string;
}

export default defineComponent({
  name: "kpn-product-card",

  props: {
    product: {
      type: Object,
      default: () => ({}),
    }
  },

  data() {
    return {
      activeColor: null as string | null,
    };
  },

  computed: {
    colors() {
      let res = [] as Color[];

      this.product.variants.forEach(variant => {
        if(!res.some(el => el.color === variant.attributes.color)) {
          res.push({
            colorCode: variant.attributes.color_code,
            colorName: variant.attributes.color_name,
            color: variant.attributes.color,
          });
        }
      });
      this.activeColor = res[0].colorName;

      return res;
    }
  },

  methods: {
    setActive(colorName) {
      this.activeColor = colorName;
    }
  },
});
</script>

<style lang="scss" scoped>
  .product-card {
    @apply shadow-sm rounded-lg border-none relative;

    :deep() {
      .p-card-title {
        @apply font-normal text-gray-500 text-base m-0 relative z-20;
      }

      .p-card-subtitle {
        @apply font-bold text-black text-lg m-0 relative z-20 max-w-3/4;
      }

      .p-card-content {
        @apply m-0 p-0 w-full h-full z-10;

        .trade-in-deal {
          @apply absolute top-16;

          width: 80px;
          height: 80px;
        }
      }

      .p-card-body {
        @apply m-0 px-4 py-2;
      }

      .p-card-footer {
        @apply absolute right-0 bottom-0;

        .p-button {
          @apply cursor-pointer z-30 pr-9;

          .p-button-icon:before {
            @apply bg-secondary text-white rounded-full inline-block align-middle absolute right-2 top-2;

            width: 30px;
            height: 30px;
            line-height: 30px;
          }
        }
      }
    } 

    img {
      @apply block py-2 mx-auto;
      width: auto;
      max-height: 240px;
    }

    .available-colors {
      @apply absolute right-2 top-2 grid grid-flow-row auto-rows-max gap-2;

      span {
        @apply block cursor-pointer rounded-full border border-gray-300 relative duration-150;
        
        
        width: 22px;
        height: 22px;

        &:after {
          @apply block absolute border border-gray-700 opacity-0 scale-75 duration-150 rounded-full w-full h-full;

          content: '';
        }

        &:hover {
          @apply opacity-60;
        }

        &.active {
          &:after {
            @apply scale-125 opacity-100;
          }
        }
      }
    }

    p {
      @apply inline-block px-4 py-2 font-bold w-auto rounded-xl absolute bottom-24 left-2 shadow-sm max-w-2/3 leading-5;

      background: #f3f3f3;

      &.green {
        background: linear-gradient(50deg, #deff00 0%, #00c300 37%, #00c300 100%);
      }
    }
  }
</style>
