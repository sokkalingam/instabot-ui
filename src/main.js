import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import lodash from 'lodash'

Vue.config.productionTip = false
Vue.use(VueResource);

// Adding lodash
Object.defineProperty(Vue.prototype, '$_', { value: lodash });

// TODO: Move it else where
// String replace All method
String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
