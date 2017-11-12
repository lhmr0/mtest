import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import  'buefy/lib/buefy.css'
import * as VueGoogleMaps from 'vue2-google-maps'
import FirebaseApp from './FirebaseApp';
import VueFire from 'vuefire';

Vue.use(Buefy);
Vue.use(VueFire);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCJQqUbo_3ML5yoeHUEWmeS0Er7yk7ph8c',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  }
})

new Vue({
  el: '#app',
  render: h => h(App)
})
