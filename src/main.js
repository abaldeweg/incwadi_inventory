import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import i18n from './i18n'
import cssVars from 'css-vars-ponyfill'
import 'core-js/features/promise'
import 'core-js/features/number/parse-float'

Vue.config.productionTip = false

cssVars({
  variables: {
    'color-primary': process.env.BRAND_COLOR,
    'masthead-height': '66px'
  }
})

if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then((registration) => {
        console.log('SW registered!')
      }).catch((registrationError) => {
        console.log('SW registration failed!')
      })
    })
  }
}

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: {
    App
  }
})
