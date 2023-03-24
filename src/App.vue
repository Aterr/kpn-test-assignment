<template>
  <div class="container">
    <h1 class="text-primary text-2xl">Kies uit <strong>{{ filteredProducts.length }} telefoons</strong></h1>
    <Filters
      :filters="filters"
      :productsLength="filteredProducts.length"
      @filterItems="filterItems"
      @setSort="setSort"
    />
    <ProductList :products="filteredProducts" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  //Import components
  import Filters from './components/filters.vue';
  import ProductList from './components/productList.vue';

  export default defineComponent({
    name: "kpn-test-assignment-app",

    components: {
      Filters,
      ProductList
    },

    data() {
      return {
        allProducts: [],
        filters: {
          manufacturer: [],
          colors: [],
          has_5g: [
            {
              label: "Ja",
              amount: 0,
            }, {
              label: "Nee",
              amount: 0,
            }
          ],
          operating_system: [],
          has_esim: [
            {
              label: "Ja",
              amount: 0,
            }, {
              label: "Nee",
              amount: 0,
            }
          ],
          refubrished: [
            {
              label: "Ja",
              amount: 0,
            }, {
              label: "Nee",
              amount: 0,
            }
          ],
        },
        selectedFilters: null,
        sortBy: null,
      };
    },

    watch: {
      filteredProducts: {
        handler(filters) {
          this.setSort(this.sortBy);
        },
        deep: true
      }
    },

    computed: {
      filteredProducts() {
        let res = this.allProducts;

        if(this.selectedFilters) {
          for(let key in this.selectedFilters) {
            if(this.selectedFilters[key].length > 0) {
              if(key === "colors") {
                res = res.filter(el => {
                  const arr = this.selectedFilters[key].map(x => x.label);
                  return el.variants.some(x =>arr.includes(x.attributes.color));
                })
              } else if (["has_5g", "has_esim", "refubrished"].includes(key)) {
                const arr = this.selectedFilters[key].map(x => x.label);
                if(arr.length !== 2) {
                  if(arr.includes("Ja")) {
                    res = res.filter(el => {
                      return el[key];
                    });
                  } else if (arr.includes("Nee")) {
                    res = res.filter(el => {
                      return !el[key];
                    });
                  }
                }
              } else {
                const arr = this.selectedFilters[key].map(x => x.label);
                res = res.filter(el => {
                  return arr.includes(el[key]);
                });
              }
            }
          }
        }

        //Sort
        if(this.sortBy === 'release_date') {
          res.sort((a, b) => {
            return Date.parse(a[this.sortBy]) - Date.parse(b[this.sortBy]);
          })
        } else if (this.sortBy === 'promotion_label') {
          res.sort((a, b) => {
            return (a.attributes[this.sortBy] === b.attributes[this.sortBy])? 0 : a.attributes[this.sortBy]? -1 : 1;
          });
        } else {
          res.sort((a, b) => {
            return a[this.sortBy] - b[this.sortBy];
          })
        }
        
        return res;
      }
    },

    methods: {
      async getPhones() {
        await fetch('https://gist.githubusercontent.com/MaxKostenko/cfb308759c6b2c9762e91dadafe70c0e/raw/934bf752550a715712c905330c8db683674fb57c/phone_feed.json')
          .then((response) => {
            response.json().then((data) => {
              this.allProducts = data.products.sort((a, b) => parseFloat(a.ui_suggested_sort_order) - parseFloat(b.ui_suggested_sort_order));
              this.generateFilters();
            });
          });
      },

      generateFilters() {
        this.filteredProducts.forEach((product: any) => {
          //Get all manufacturers
          if(!this.filters.manufacturer.some(el => el.label === product.manufacturer)) {
            this.filters.manufacturer.push({
              label: product.manufacturer,
              amount: 1,
            });
          } else {
            this.filters.manufacturer.find(el => el.label === product.manufacturer).amount++;
          }

          //Get all colors
          product.colors.forEach(color => {
            if(!this.filters.colors.some(el => el.label === color)) {
              this.filters.colors.push({
                label: color,
                colorCode: this.findColorCode(product, color),
                amount: 1,
              })
            }
          });

          //Get all OS
          if(!this.filters.operating_system.some(el => el.label === product.operating_system)) {
            this.filters.operating_system.push({
              label: product.operating_system,
              amount: 1,
            });
          } else {
            this.filters.operating_system.find(el => el.label === product.operating_system).amount++;
          }

          //Get 5g amounts
          product.has_5g ? this.filters.has_5g[0].amount++ : this.filters.has_5g[1].amount++;
          product.has_esim ? this.filters.has_esim[0].amount++ : this.filters.has_esim[1].amount++;
          product.refubrished ? this.filters.refubrished[0].amount++ : this.filters.refubrished[1].amount++;
        });
      },

      findColorCode(product, colorName) {
        let res = null;
        for(let i = 0; i < product.variants.length; i++) {
          if(product.variants[i].attributes.color === colorName) {
            res = product.variants[i].attributes.color_code;
            break;
          }
        }

        return res;
      },

      filterItems(filters) {
        this.selectedFilters = filters;
      },

      setSort(field) {
        this.sortBy = field;
      }
    },

    mounted() {
      this.getPhones();
    }
  });
</script>

<style lang="scss" scoped>
  .container {
    max-width: 1200px;
    min-width: 300px;
    width: 100%;
    padding: 0 16px;

    @apply mx-auto;
  }
</style>
