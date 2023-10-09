import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import UIComponents from '@/components/Base';

const app = createApp(App);

UIComponents.forEach((item) => {
  app.component(item.name, item);
});

app.use(store).use(router).mount('#app');
