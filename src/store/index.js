import Vue from 'vue'
import Vuex from 'vuex'
import books from './modules/books'
import genres from './modules/genres'
import branches from './modules/branches'
import filter from './modules/filter'
import api from '../api'
import Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    books: books,
    genres: genres,
    branches: branches,
    filter: filter
  },
  state: {
    me: null,
    isLoading: false,
    showFilters: false,
    showCreate: false,
    token: Cookies.get('token'),
    customers: null,
    isAuthenticated: false,
    isLoggingIn: false,
    hasLoginError: false
  },
  mutations: {
    me (state, me) {
      state.me = me
    },
    isLoading (state, isLoading) {
      state.isLoading = isLoading
    },
    showFilters (state, showFilters) {
      state.showFilters = showFilters
    },
    showCreate (state, showCreate) {
      state.showCreate = showCreate
    },
    token (state, token) {
      state.token = token
    },
    customers (state, customers) {
      state.customers = customers
    },
    isAuthenticated (state, status) {
      state.isAuthenticated = status
    },
    isLoggingIn (state, status) {
      state.isLoggingIn = status
    },
    hasLoginError (state, status) {
      state.hasLoginError = status
    }
  },
  actions: {
    login (context, data) {
      context.commit('isLoggingIn', true)
      api(context.state.token)
        .post('/api/login_check', {
          username: data.user,
          password: data.password
        })
        .then(function (response) {
          context.commit('token', response.data.token)
          Cookies.set('token', response.data.token, { expires: 7 })
          context.commit('isAuthenticated', true)
          context.commit('hasLoginError', false)
        })
        .catch(function (error) {
          console.log(error)
          context.commit('hasLoginError', true)
        })
        .finally(function () {
          context.commit('isLoggingIn', false)
        })
    },
    me (context) {
      api(context.state.token)
        .get('/v1/me')
        .then(function (response) {
          context.commit('me', response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    customers (context) {
      api(context.state.token)
        .get('/v1/customer/')
        .then(function (response) {
          context.commit('customers', response.data.customers)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    createCustomer (context, name) {
      api(context.rootState.token)
        .post('/v1/customer/new', {
          name: name
        })
        .then(function (response) {
          context.dispatch('customers')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    removeCustomer (context, id) {
      api(context.rootState.token)
        .delete('/v1/customer/' + id)
        .then(function (response) {
          context.dispatch('customers')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    toggleFilters (context) {
      context.commit('showFilters', !context.state.showFilters)
    },
    toggleShowCreate (context) {
      context.commit('showCreate', !context.state.showCreate)
    }
  }
})
