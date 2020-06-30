<template>
  <div class="home">
    <loader :isVisible="isVisible" />
    <div v-if="!isVisible" class="home__blog-content">
      <div
        v-for="(item, index) in blogList"
        v-bind:key="index"
        class="thumb-list__item"
        @click="showBlogDetails(item)"
      >
        <div class="blog-img">
          <img :src="item.featured_image" alt="logo" />
        </div>
        <div class="blog-title">
          <b>{{ item.title }}</b>
        </div>
        <div class="info">
          <div class="profile-pic">
            <img
              v-if="item && item.author"
              :src="item.author.avatar_URL"
              alt="profile"
            />
          </div>
          <div class="name-time" v-if="item && item.author">
            <div>{{ item.author.name }}</div>
            <div v-if="item.date">
              {{ formatDistanceToNow(new Date(item.date)) }} ago
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/home.js"></script>
<style lang="scss" scoped>
  .home {
    padding: 20px;

    &__blog-content {
      overflow-y: scroll;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      /deep/ img {
        width: 100%;
      }

      .thumb-list {
        height: 100vh;
        overflow-y: scroll;
        text-align: left;
        padding: 10px;
        &__item {
          border: 1px solid gainsboro;
          margin: 10px;
          padding: 10px;
          border-radius: 5px;
          background-color: white;
          cursor: pointer;
          max-width: 300px;
          transition: all 0.4s ease-in-out;
          transform: scale(1);
          height: 300px;
          overflow: hidden;

          .blog-img {
            width: 100%;
            height: 150px;
            overflow: hidden;
          }

          .blog-img img {
            transition: transform 0.5s ease;
            height: inherit;
          }

          .blog-img:hover img {
            transform: scale(1.2);
          }

          .blog-title {
            text-align: left;
            padding: 5px 0;
          }

          .info {
            text-align: left;
            position: absolute;
            width: 100%;
            bottom: 5px;

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
              /*float: right;*/
            }
          }
        }
      }
    }
  }
</style>
