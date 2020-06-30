import axios from 'axios'
import config from '@/config'
import { serializeQueryParams } from './api-utils'

const headers = {}
function getDataVaiApi (path, cb, error, params) {
  headers.Accept = 'application/json'
  const url = path + serializeQueryParams(params)
  axios.get(url, { withCredential: false, headers })
    .then(cb)
    .catch(error)
}

function postDataVaiApi (path, cb, error, payload, params) {
  const url = path + serializeQueryParams(params)
  axios.post(url, payload, { withCredential: false })
    .then(cb)
    .catch(error)
}

export default {
  getAllPosts (cb, error, params) {
    getDataVaiApi(config.api.posts, cb, error, params)
  },
  getCategory (cb, error, params) {
    getDataVaiApi(config.api.getCategories, cb, error, params)
  },
  getTags (cb, error, params) {
    getDataVaiApi(config.api.getTags, cb, error, params)
  },
  getRelatedPost (cb, error, payload, params) {
    postDataVaiApi(config.api.relatedPosts(payload.postId), cb, error, params)
  },
  getBlogById (cb, error, payload, params) {
    getDataVaiApi(config.api.getPostById(payload.postId), cb, error, params)
  }
}
