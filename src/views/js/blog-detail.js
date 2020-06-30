import { mapGetters } from 'vuex'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import Loader from '@/components/Loader'

export default {
  name: 'Details',
  data () {
    return {
      formatDistanceToNow,
      isVisible: true
    }
  },
  components: {
    Loader
  },
  computed: {
    ...mapGetters('blogs', [
      'getBlogDetail',
      'getCategory',
      'getTags',
      'getRelatedPosts'
    ]),
    topTenTags () {
      return this.getTags.tags
        ? this.getTags.tags
          .sort((a, b) => {
            return b.post_count - a.post_count
          })
          .slice(0, 10)
        : []
    },
    getCategories () {
      return this.getCategory.categories || []
    },
    getRelatedPost () {
      return this.getRelatedPosts
    }
  },
  watch: {
    getBlogDetail (newValue) {
      if (newValue.ID) {
        this.$store.dispatch('blogs/getRelatedPosts', {
          payload: {
            postId: newValue.ID
          }
        })
      }
    }
  },
  created () {
    window.scrollTo(0, 0)
    this.$store.dispatch('blogs/getBlogById', {
      success: () => {
        this.isVisible = false
      },
      fail: () => {
        this.isVisible = true
      },
      payload: {
        postId: this.$route.params.postId
      }
    })
    this.$store.dispatch('blogs/getCategory')
    this.$store.dispatch('blogs/getTags')
  },
  methods: {
    getPostsByMe (type, item) {
      this.$router.push({ path: '/', query: { [type]: item.slug } })
    }
  }
}
