import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import lodash from 'lodash'

import Spinner from './components/common/spinner/Spinner'

Vue.config.productionTip = false
Vue.use(VueResource);

Vue.component('spinner', Spinner);

// Adding lodash
Object.defineProperty(Vue.prototype, '$_', { value: lodash });

// TODO: Move it else where
// String replace All method
String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};

// For checking cache issue
console.log("Instabot-UI", "11SEP2018-11:20AM");

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
