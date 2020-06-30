import Loader from '@/components/Loader'
import { mapGetters } from 'vuex'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default {
  name: 'Home',
  data () {
    return {
      formatDistanceToNow,
      isVisible: true,
      parameters: {
        number: 25
      }
    }
  },
  components: {
    Loader
  },
  created () {
    this.$store.dispatch('blogs/getAllPosts', {
      success: () => {
        this.isVisible = false
      },
      failure: () => {
        this.isVisible = true
      },
      params: Object.assign(this.parameters, this.$route.query)
    })
  },
  computed: {
    ...mapGetters('blogs', ['getPosts']),
    blogList () {
      return this.getPosts.posts
    }
  },
  methods: {
    showBlogDetails (blog) {
      this.$router.push(`/details/${blog.ID}`)
    }
  }
}
