import { createApp } from 'vue'

import PrimeVue from 'primevue/config';

import Card from 'primevue/card';
import Button from 'primevue/button';
import MultiSelect from 'primevue/multiselect';
import Dropdown from 'primevue/dropdown';
import Sidebar from 'primevue/sidebar';


import './styles/main.scss';
import App from './App.vue';

const app = createApp(App);
app
  .use(PrimeVue, { ripple: true })
  
  .component("Card", Card)
  .component("Button", Button)
  .component("MultiSelect", MultiSelect)
  .component("Dropdown", Dropdown)
  .component("Sidebar", Sidebar)
  
  .mount('#app');