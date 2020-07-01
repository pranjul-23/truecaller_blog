import api from '@/api/common'
import errorHandler from '@/api/error-handler'
import relatedPost from '@/api-mock/related-post'

export default {
  namespaced: true,
  state: {
    posts: [],
    blogDetail: {},
    categories: [],
    tags: [],
    relatedPost: []
  },
  getters: {
    getPosts (state) {
      return state.posts
    },
    getBlogDetail (state) {
      return state.blogDetail
    },
    getCategory (state) {
      return state.categories
    },
    getTags (state) {
      return state.tags
    },
    getRelatedPosts (state) {
      return state.relatedPost
    }
  },
  mutations: {
    setAllPosts (state, data) {
      state.posts = data
    },
    setBlogDetail (state, value) {
      state.blogDetail = value
    },
    setCategory (state, value) {
      state.categories = value
    },
    setTags (state, value) {
      state.tags = value
    },
    setRelatedPosts (state, value) {
      state.relatedPost = value
    }
  },
  actions: {
    getAllPosts ({ commit, dispatch }, { params, success, failure } = {}) {
      api.getAllPosts(
        response => {
          commit('setAllPosts', response.data)
          success()
        },
        error => {
          errorHandler.handleErrors(dispatch, error)
          failure()
        }, params)
    },
    getRelatedPosts ({ commit, dispatch }, { params, payload } = {}) {
      api.getRelatedPost(
        response => {
          // commit('setRelatedPosts', response.data)
        },
        error => {
          commit('setRelatedPosts', relatedPost.response.value)
          errorHandler.handleErrors(dispatch, error)
        },
        payload,
        params
      )
    },
    getCategory ({ commit, dispatch }, { params, payload } = {}) {
      api.getCategory(
        response => {
          commit('setCategory', response.data)
        },
        error => {
          errorHandler.handleErrors(dispatch, error)
        },
        payload,
        params
      )
    },
    getTags ({ commit, dispatch }, { params, payload } = {}) {
      api.getTags(
        response => {
          commit('setTags', response.data)
        },
        error => {
          errorHandler.handleErrors(dispatch, error)
        },
        payload,
        params
      )
    },
    getBlogById (
      { commit, dispatch },
      { params, payload, success, fail } = {}
    ) {
      api.getBlogById(
        response => {
          commit('setBlogDetail', response.data)
          success()
        },
        error => {
          errorHandler.handleErrors(dispatch, error)
          fail()
        },
        payload,
        params
      )
    }
  }
}
