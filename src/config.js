const BASE_PATH = 'https://public-api.wordpress.com/rest/v1.1/sites/107403796'
export default {
  api: {
    posts: `${BASE_PATH}/posts`,
    getCategories: `${BASE_PATH}/categories`,
    getTags: `${BASE_PATH}/tags`,
    relatedPosts (postId) {
      return `${BASE_PATH}/posts/${postId}/related`
    },
    getPostById (postId) {
      return `${BASE_PATH}/posts/${postId}`
    }
  }
}
