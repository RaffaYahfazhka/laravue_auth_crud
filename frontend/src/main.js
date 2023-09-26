import { createApp } from 'vue';

//import component App
import App from './App.vue';

//import config router
import router from './router'
import { store } from "./store";

//create App Vue
const app = createApp(App);

//gunakan "router" di Vue dengan plugin "use"
app.use(router);
app.use(store);
app.mount('#app');