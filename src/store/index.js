import Vue from 'vue'
import Vuex from 'vuex'
import blogs from './modules/blog-store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    blogs: blogs
  }
})

export default store
