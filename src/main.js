import Vue from "vue";
import App from "./App.vue";
import router from "./routes";
import store from "./store";
import "./registerServiceWorker";
import ElementUI from "element-ui";
import "normalize.css/normalize.css";
import "element-ui/lib/theme-chalk/index.css";
import "./styles/index.scss";
import "./styles/theme.scss";
Vue.use(ElementUI);
Vue.config.productionTip = false;

import * as filters from "./util/filter";
Object.keys(filters).forEach(v => Vue.filter(v, filters[v]));

router.beforeEach((to, from, next) => {
  if (to.name != "login") {
    next();
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
