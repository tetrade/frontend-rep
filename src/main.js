import './assets/main.css'

import {createApp} from 'vue';
import {createPinia} from "pinia";
import App from './App.vue';
import router from '../router/route.js';
import vuetify from "@/plugins/vuetify.js";
import 'vuetify/styles';


const app = createApp(App);
app.use(router);
app.use(createPinia())
app.use(vuetify)
app.mount('#app');
