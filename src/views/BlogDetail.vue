<template>
  <div class="details">
    <loader :isVisible="isVisible" />
    <div class="row main-contents" v-if="!isVisible">
      <div class="col-md-9">
        <div class="details__title">
          {{ getBlogDetail.title }}
        </div>
        <div class="details__blog-img" v-if="getBlogDetail.featured_image">
          <img :src="getBlogDetail.featured_image" alt="logo" />
        </div>
        <div class="details__info">
          <div class="profile-pic">
            <img
              v-if="getBlogDetail && getBlogDetail.author"
              :src="getBlogDetail.author.avatar_URL"
              alt="profile"
            />
          </div>
          <div class="name-time" v-if="getBlogDetail && getBlogDetail.author">
            <div>{{ getBlogDetail.author.name }}</div>
            <div v-if="getBlogDetail.date">
              {{ formatDistanceToNow(new Date(getBlogDetail.date)) }} ago
            </div>
          </div>
        </div>
        <div class="details__content" v-html="getBlogDetail.content"></div>
      </div>
      <div class="col-md-3">
        <div class="related-posts">
          <div class="related-posts__head">Related Posts</div>
          <div class="related-posts__list">
            <div class="item" v-for="(post, index) in getRelatedPost" :key="index">
              <div @click="showBlogDetails(post.fields.post_id)">Post: {{post.fields.post_id}}</div>
            </div>
          </div>
        </div>
        <div class="tags">
          <div class="tags__head">Tags</div>
          <div class="tags__list">
            <div
              class="tag-iem"
              v-for="(item, index) in topTenTags"
              v-bind:key="index"
              @click="getPostsByMe('tag', item)"
            >
              {{ item.name }} ({{ item.post_count }})
            </div>
          </div>
        </div>
        <div class="categories">
          <div class="categories__head">Categories</div>
          <div class="categories__list">
            <div
              class="item"
              v-for="(item, index) in getCategories"
              v-bind:key="index"
              @click="getPostsByMe('category', item)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./js/blog-detail.js"></script>
<style lang="scss" scoped>
  .details {
    .main-contents {
      max-width: 1080px;
      margin: 0 auto;
      float: none;
      padding-top: 60px;
    }

    &__title {
      margin-top: 30px;
      font-size: 34px;
      font-weight: bold;
      line-height: 1.8;
    }

    &__info {
      text-align: left;
      width: 100%;
      margin: 16px 0;
      border-top: 1px solid grey;
      border-bottom: 1px solid grey;
      padding: 4px 0;
      height: 60px;

      .profile-pic {
        float: left;
        img {
          width: 50px;
          height: 50px;
          border-radius: 30px;
          margin-right: 15px;
        }
      }
      .name-time {
        font-weight: bold;
      }
    }

    &__blog-img {
      width: 100%;
      height: 270px;
      overflow: hidden;
      margin: 30px 0;

      img {
        max-width: 100%;
        height: inherit;
      }
    }

    &__content {
      margin-top: 30px;
      text-align: left;

      /deep/ img {
        max-width: 100%;
      }

      .wp-block-embed-youtube {
        margin: 0;
      }

      /deep/ figure {
        max-width: 100%;
        margin: 0 !important;
      }

      /deep/ iframe {
        max-width: 100%;
      }
    }

    .sidebar {
      margin: 0;
      padding: 0;
      height: auto;
      background-color: #f1f1f1;
      position: fixed;
      width: 100%;
      overflow: auto;
      z-index: 20;
      text-align: left;
      display: flex;
    }

    .sidebar a {
      display: block;
      color: black;
      padding: 16px;
      text-decoration: none;
    }

    .sidebar a.active {
      background-color: #4caf50;
      color: white;
    }

    .sidebar a:hover:not(.active) {
      background-color: #555;
      color: white;
    }

    @media screen and (max-width: 700px) {
      .sidebar {
        width: 100%;
        height: auto;
        /*position: relative;*/
      }
      .sidebar a {
        float: left;
      }
      div.content {
        margin-left: 0;
      }
    }

    @media screen and (max-width: 400px) {
      .sidebar a {
        text-align: center;
        float: none;
      }
    }

    .categories {
      margin-top: 30px;
      text-align: left;
      &__head {
        border-top: 5px solid grey;
        font-size: 20px;
        line-height: 1.8;
        font-weight: bold;
      }

      &__list {
        .item {
          border-left: 4px solid cornflowerblue;
          margin: 10px 0;
          padding: 5px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .item:hover {
          color: #4caf50;
          transform: scale(1.1);
          background-color: #f1f1f1;
        }
      }
    }

    .tags {
      margin-top: 30px;
      text-align: left;

      &__head {
        border-top: 5px solid grey;
        font-size: 20px;
        line-height: 1.8;
        font-weight: bold;
      }

      &__list {
        display: flex;
        flex-wrap: wrap;

        .tag-iem {
          width: auto;
          padding: 6px;
          font-size: 14px;
          background: cornflowerblue;
          border-radius: 4px;
          margin: 5px;
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .tag-iem:hover {
          color: #4caf50;
          transform: scale(1.1);
          background-color: #f1f1f1;
        }
      }
    }

    .related-posts {
      margin-top: 30px;
      text-align: left;
      &__head {
        border-top: 5px solid grey;
        font-size: 20px;
        line-height: 1.8;
        font-weight: bold;
      }

      &__list {
        .item {
          border-left: 4px solid cornflowerblue;
          margin: 10px 0;
          padding: 5px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s ease;

          &.error {
            border-left: 4px solid red;
          }
        }
        .item:hover {
          color: #4caf50;
          transform: scale(1.1);
          background-color: #f1f1f1;
        }
        .item.error:hover {
          border-left: 4px solid red;
          color: red;
        }
      }
    }
  }
</style>
