<template>
  <div>
    <bread-crumb v-bind:items="breadCrumb" :categoryNav="content.category" />
    <v-progress-circular indeterminate class="loading" v-if="isLoading"></v-progress-circular>
    <div class="content" v-else>
      <h1 class="title-content">{{ content.title }}</h1>
      <div class="author-description">
        <img :src="avatar" alt="avatar" class="avatar-img" v-if="avatar">
        <v-avatar color="rgb(255, 236, 235)" size="48" v-else>
          <span class="text-h5 avt-text">{{ name && name.split(' ').reverse()[0][0].toUpperCase() }}</span>
        </v-avatar>
        <div class="author-info">
          <p>Được đăng bởi <b>{{ name }}</b></p>
          <p>Cập nhật lần cuối vào {{ formatDateTime }}</p>
        </div>
      </div>
      <div class="article-main">
        <div class="main-content-news">
          <p class="description-content">{{ content.description }}</p>
          <component v-for="(item, idx) in content.content" :key="idx" :is="item.id" :data="item" />
          <p class="content-author">{{ name }}</p>
          <div class="content-source" v-if="content.source">
            <p>Nguồn: {{ content.source }}</p>
          </div>
        </div>
        <div class="article-related">
          <div v-if="content.tags.length" class="tags-content">
            <p>Khám phá thêm</p>
            <div class="tags">
              <router-link :to="{ name: 'Wiki', query: { tags: item } }" v-for="(item, idx) in content.tags" :key="idx"
                class="tags-detail">{{ item }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDateTime } from '@/helpers/formater'
import { ModuleTitle, ModuleParagraph, ModuleImage, ModuleVideo, ModuleTable, ModuleList, ModuleMoreArticle } from '@/components/ModuleContentRender'
import { handleNewsRoute } from '@/helpers/arrayHandler.js'
export default {
  components: { ModuleTitle, ModuleParagraph, ModuleImage, ModuleVideo, ModuleTable, ModuleList, ModuleMoreArticle },
  computed: {
    content: {
      get() {
        return this.$store.getters['news/newContent']
      }
    },
    formatDateTime: function () {
      return formatDateTime(this.content.createdAt)
    },
    name() {
      return this.content.relatedUser ? this.content.relatedUser[0].fullname : ''
    },
    avatar() {
      return this.content.relatedUser ? this.content.relatedUser[0].avatar : ''
    },
    isLoading: {
      get() {
        return this.$store.getters['news/isLoading']
      }
    },
    breadCrumb() {
      const breadCrumbRoot = []
      if (this.content.category) {
        const routeParse = handleNewsRoute(this.content.category)
        routeParse.rootCategory && breadCrumbRoot.push({
          label: routeParse.rootCategory.label,
          href: `/${routeParse.rootCategory.value}`
        })
        routeParse.subCategory && breadCrumbRoot.push({
          label: routeParse.subCategory.label,
          href: `/${routeParse.rootCategory.value}?category=${routeParse.subCategory.value}`
        })
      }
      return [
        ...breadCrumbRoot,
        {
          label: this.content.title || ''
        }
      ]
    }
  },
  async created() {
    await this.$store.dispatch('news/getNewById', {
      id: this.$route.params.newsId
    })
  },
  destroyed() {
    this.$store.dispatch('news/returnInitData')
  }
}
</script>

<style scoped lang="scss">
* {
  font-family: 'Roboto-Regular', sans-serif;
}

p {
  margin: 0;
}

.title-content {
  font-family: 'Lexend-Medium', sans-serif;
  font-weight: 500;
  font-size: 40px;
  line-height: 64px;
  color: #1c1f22;
  padding: 20px 12px;

  @include responsive(sm1) {
    font-size: 32px;
    line-height: 44px;
  }
}

.main-content-news {
  flex-shrink: 0;
  padding: 0 12px;
  width: 66.66666667%;

  @include responsive(sm1) {
    width: 100%;
  }
}

.content {
  margin: 0 auto;
  padding: 10px 15px;
  max-width: 1140px;
  text-align: left;

  @include responsive(lg1) {
    max-width: 960px;
  }

  @include responsive(sm1) {
    max-width: 720px;
  }

  @include responsive(sm) {
    max-width: none;
    padding: 10px 12px;
  }
}

.description-content {
  margin-bottom: 30px;
  font-size: 16px;
  font-weight: 600;
  line-height: 26px;
  color: #1c1f22;
}

.article-main {
  display: flex;

  @include responsive(sm1) {
    display: block;
  }
}

.article-related {
  padding: 0 12px;
}

.tags-content {
  p {
    font-size: 12px;
    line-height: 18px;
    color: #505050;
  }
}

.tags {
  display: flex;
  margin: 10px 0 20px 0;
  flex-wrap: wrap;
  column-gap: 10px;
}

.tags-detail {
  margin-bottom: 10px;
  font-size: 14px;
  background: #eff1f5;
  border-radius: 16px;
  padding: 5px 15px;
  line-height: 22px;
  color: #505050 !important;
  cursor: pointer;

  &:hover {
    background: #fff0f0;
    color: #1c1f22 !important;
  }
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
}

.avatar-img {
  margin: 0 8px 0 0;
  width: 48px;
  height: 48px;
  float: left;
  border: 1px solid #c8c9c7;
  border-radius: 50%;
}

.author-description {
  padding: 0 12px;
  margin-bottom: 24px;
  display: flex;
}

.author-info {
  font-size: 16px;
  line-height: 26px;
  color: #1c1f22;

  @include responsive(sm1) {
    font-size: 14px;
    line-height: 22px;
  }
}

.content-author {
  font-weight: 600;
  font-size: 16px;
  line-height: 26px;
  margin-bottom: 30px;
}

.content-source {
  padding: 11px 15px;
  margin-bottom: 50px;
  background-color: #fafafa
}

.content-source p {
  font-size: 12px;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  display: -webkit-box;
  overflow: hidden;
  line-height: 35px;
}
</style>
