<template>
  <div class="filters">
    <div class="flex flex-row gap-2">
      <span class="p-float-label">
          <MultiSelect
            v-model="selectedFilters.manufacturer"
            :maxSelectedLabels="3"
            :showToggleAll="false"
            :options="filters.manufacturer"
            scrollHeight="380px"
            optionLabel="label"
            placeholder="Merk"
            dropdownIcon="pi pi-angle-down"
          >
            <template #option="slotProps">
              <div class="flex align-items-center">
                  <div>{{ slotProps.option.label }} ({{ slotProps.option.amount }})</div>
              </div>
            </template>
          </MultiSelect>
          <label for="ms-cities">Merk</label>
      </span>

      <span class="p-float-label">
          <MultiSelect
            v-model="selectedFilters.colors"
            :maxSelectedLabels="3"
            :showToggleAll="false"
            :options="filters.colors"
            scrollHeight="380px"
            optionLabel="label"
            placeholder="Kleur"
            dropdownIcon="pi pi-angle-down"
          >
            <template #option="slotProps">
              <div class="flex align-items-center color-item">
                  <div>{{ slotProps.option.label }}</div>
                  <span :style="{'background': slotProps.option.colorCode}"></span>
              </div>
            </template>
          </MultiSelect>
          <label for="ms-cities">Kleur</label>
      </span>

      <span class="p-float-label">
          <MultiSelect
            v-model="selectedFilters.has_5g"
            :maxSelectedLabels="3"
            :showToggleAll="false"
            :options="filters.has_5g"
            scrollHeight="380px"
            optionLabel="label"
            placeholder="5G"
            dropdownIcon="pi pi-angle-down"
          >
            <template #option="slotProps">
              <div class="flex align-items-center color-item">
                  <div>{{ slotProps.option.label }} ({{ slotProps.option.amount }})</div>
              </div>
            </template>
          </MultiSelect>
          <label for="ms-cities">5G</label>
      </span>

      <span class="p-float-label">
          <MultiSelect
            v-model="selectedFilters.operating_system"
            :maxSelectedLabels="3"
            :showToggleAll="false"
            :options="filters.operating_system"
            scrollHeight="380px"
            optionLabel="label"
            placeholder="Besturingssysteem"
            dropdownIcon="pi pi-angle-down"
          >
            <template #option="slotProps">
              <div class="flex align-items-center color-item">
                  <div>{{ slotProps.option.label }} ({{ slotProps.option.amount }})</div>
              </div>
            </template>
          </MultiSelect>
          <label for="ms-cities">Besturingssysteem</label>
      </span>

      <span class="p-float-label">
          <MultiSelect
            v-model="selectedFilters.has_esim"
            :maxSelectedLabels="3"
            :showToggleAll="false"
            :options="filters.has_esim"
            scrollHeight="380px"
            optionLabel="label"
            placeholder="E-sim"
            dropdownIcon="pi pi-angle-down"
          >
            <template #option="slotProps">
              <div class="flex align-items-center color-item">
                  <div>{{ slotProps.option.label }} ({{ slotProps.option.amount }})</div>
              </div>
            </template>
          </MultiSelect>
          <label for="ms-cities">E-sim</label>
      </span>

      <span class="p-float-label">
          <MultiSelect
            v-model="selectedFilters.refubrished"
            :maxSelectedLabels="3"
            :showToggleAll="false"
            :options="filters.refubrished"
            scrollHeight="380px"
            optionLabel="label"
            placeholder="Refurbished"
            dropdownIcon="pi pi-angle-down"
          >
            <template #option="slotProps">
              <div class="flex align-items-center color-item">
                  <div>{{ slotProps.option.label }} ({{ slotProps.option.amount }})</div>
              </div>
            </template>
          </MultiSelect>
          <label for="ms-cities">Refurbished</label>
      </span>
      
    </div>
    <div class="flex flex-row gap-2 align-middle items-center">
      <div class="align-middle font-bold">Sorteren op:</div>
      <Dropdown
        v-model="selectedSort"
        :options="sortBy"
        optionLabel="label"
        placeholder="Select a City"
        dropdownIcon="pi pi-sort"
      />
    </div>
  </div>
  <div class="filter-btn-mobile" @click="sideBarVisible = true">
    <i class="pi pi-sliders-v" style="font-size: 1rem"></i>
    <span>Filteren en sorteren</span>
  </div>
  <div class="card flex justify-content-center">
    <Sidebar v-model:visible="sideBarVisible" blockScroll>
      <template #header>
        <div class="flex flex-row p-2 ">
          <h2 class="text-xl text-left">Filteren en sorteren</h2>
        </div>
      </template>
      
      <div class="flex flex-col w-full mb-4">
        <div class="flex flex-col gap-4">
          <h2 class="font-bold">Sorteren</h2>
          <Dropdown
            v-model="selectedSort"
            :options="sortBy"
            optionLabel="label"
            placeholder="Select a City"
            dropdownIcon="pi pi-sort"
          />
        </div>
      </div>

      <div class="flex flex-col w-full">
        <div class="flex flex-col gap-4">
          <h2 class="font-bold">Filteren</h2>
          
          <span class="p-float-label">
            <MultiSelect
              v-model="selectedFilters.manufacturer"
              :maxSelectedLabels="3"
              :showToggleAll="false"
              :options="filters.manufacturer"
              scrollHeight="380px"
              optionLabel="label"
              placeholder="Merk"
              dropdownIcon="pi pi-angle-down"
            >
              <template #option="slotProps">
                <div class="flex align-items-center">
                    <div>{{ slotProps.option.label }} ({{ slotProps.option.amount }})</div>
                </div>
              </template>
            </MultiSelect>
            <label for="ms-cities">Merk</label>
          </span>

          <span class="p-float-label">
              <MultiSelect
                v-model="selectedFilters.colors"
                :maxSelectedLabels="3"
                :showToggleAll="false"
                :options="filters.colors"
                scrollHeight="380px"
                optionLabel="label"
                placeholder="Kleur"
                dropdownIcon="pi pi-angle-down"
              >
                <template #option="slotProps">
                  <div class="flex align-items-center color-item">
                      <div>{{ slotProps.option.label }}</div>
                      <span :style="{'background': slotProps.option.colorCode}"></span>
                  </div>
                </template>
              </MultiSelect>
              <label for="ms-cities">Kleur</label>
          </span>

          <span class="p-float-label">
              <MultiSelect
                v-model="selectedFilters.has_5g"
                :maxSelectedLabels="3"
                :showToggleAll="false"
                :options="filters.has_5g"
                scrollHeight="380px"
                optionLabel="label"
                placeholder="5G"
                dropdownIcon="pi pi-angle-down"
              >
                <template #option="slotProps">
                  <div class="flex align-items-center color-item">
                      <div>{{ slotProps.option.label }} ({{ slotProps.option.amount }})</div>
                  </div>
                </template>
              </MultiSelect>
              <label for="ms-cities">5G</label>
          </span>

          <span class="p-float-label">
            <MultiSelect
              v-model="selectedFilters.operating_system"
              :maxSelectedLabels="3"
              :showToggleAll="false"
              :options="filters.operating_system"
              scrollHeight="380px"
              optionLabel="label"
              placeholder="Besturingssysteem"
              dropdownIcon="pi pi-angle-down"
            >
              <template #option="slotProps">
                <div class="flex align-items-center color-item">
                    <div>{{ slotProps.option.label }} ({{ slotProps.option.amount }})</div>
                </div>
              </template>
            </MultiSelect>
            <label for="ms-cities">Besturingssysteem</label>
          </span>

          <span class="p-float-label">
            <MultiSelect
              v-model="selectedFilters.has_esim"
              :maxSelectedLabels="3"
              :showToggleAll="false"
              :options="filters.has_esim"
              scrollHeight="380px"
              optionLabel="label"
              placeholder="E-sim"
              dropdownIcon="pi pi-angle-down"
            >
              <template #option="slotProps">
                <div class="flex align-items-center color-item">
                    <div>{{ slotProps.option.label }} ({{ slotProps.option.amount }})</div>
                </div>
              </template>
            </MultiSelect>
            <label for="ms-cities">E-sim</label>
          </span>

          <span class="p-float-label">
            <MultiSelect
              v-model="selectedFilters.refubrished"
              :maxSelectedLabels="3"
              :showToggleAll="false"
              :options="filters.refubrished"
              scrollHeight="380px"
              optionLabel="label"
              placeholder="Refurbished"
              dropdownIcon="pi pi-angle-down"
            >
              <template #option="slotProps">
                <div class="flex align-items-center color-item">
                    <div>{{ slotProps.option.label }} ({{ slotProps.option.amount }})</div>
                </div>
              </template>
            </MultiSelect>
            <label for="ms-cities">Refurbished</label>
          </span>
        </div>
      </div>
      <div class="absolute block bottom-4 left-0 w-full text-center">
        <span class="inline-block p-8 py-2 bg-secondary text-white rounded-full cursor-pointer" @click="sideBarVisible = false">
          Toon {{ productsLength }} telefoons
        </span>
      </div>
    </Sidebar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "kpn-filters",

  props: {
    filters: {
      type: Object,
      default: () => ({}),
    },
    productsLength: {
      type: Number,
      default: 0,
    },
  },

  emits: ["filterItems", "setSort"],

  data() {
    return {
      selectedFilters: {
        manufacturer: [],
        colors: [],
        has_5g: [],
        operating_system: [],
        has_esim: [],
        refubrished: [],
      },
      sortBy: [
        {
          label: "Meest verkocht",
          value: "sort_order",
        },
        {
          label: "Nieuw",
          value: "release_date",
        },
        {
          label: "Actie",
          value: "promotion_label",
        }
      ],
      selectedSort: {
        label: "Meest verkocht",
        value: "sort_order",
      },
      sideBarVisible: false,
    };
  },

  watch: {
    selectedFilters: {
      handler(filters) {
        this.$emit('filterItems', filters);
      },
      deep: true
    },
    selectedSort: {
      handler(selectedSort) {
        this.$emit('setSort', selectedSort.value);
      },
      deep: true
    }
  },
});
</script>

<style lang="scss" scoped>
  .filters {
    @apply sm:hidden lg:flex flex-row w-full bg-white rounded-xl mb-4 p-4 justify-between;

    .p-float-label {
      > label {
        @apply left-0 bg-transparent top-4 text-sm;
      }

      .p-inputwrapper-filled ~ label {
        top: -0.75rem!important;
      }
    }

    :deep() {
      .p-multiselect {
        @apply border-0 relative text-sm;

        &.p-focus {
          @apply border-0 outline-none shadow-none;
        }
        .p-multiselect-label {
          @apply p-0 text-sm;

          &.p-placeholder {
            @apply opacity-0;
          }
        }
      }
    }
  }

  .filter-btn-mobile {
    @apply sm:flex lg:hidden bg-secondary w-full text-white font-bold cursor-pointer p-2 mb-4 rounded-full justify-center items-center gap-2;
  }
</style>
