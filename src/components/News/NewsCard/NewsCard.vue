<template>
  <div class="card-new">
    <div class="card-content">
      <router-link :to="{ name: routeName, params: { newsId: data.ID, } }" class="image-wrapper">
        <img v-bind:src="data.thumbnail" alt="thumbnail" />
        <p>{{ category }}</p>
      </router-link>
      <div class="card-info">
        <p>{{ formatDateTime }} • {{ data.user }}</p>
        <router-link :to="{ name: routeName, params: { newsId: data.ID, } }" class="route-link">
          <h3>{{ data.title }}</h3>
        </router-link>
        <p>{{ data.description }}</p>
      </div>
    </div>
    <div v-if="data.tags.length" class="card-tags">
      <router-link :to="{ name: 'Wiki', query: { tags: item } }" v-for="(item, idx) in data.tags" :key="idx"
        class="tags-chip">{{ item }}</router-link>
    </div>
  </div>
</template>
<script>
import { NEWS_CATEGORY_TYPE } from '@/consts/newsCategory'
import { formatDateTime } from '@/helpers/formater'
import { handleNewsRoute } from '@/helpers/arrayHandler.js'
export default {
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    formatDateTime: function () {
      return formatDateTime(this.data.createdAt)
    },
    routeName() {
      return handleNewsRoute(this.data.category).rootCategory.pathName
    },
    category() {
      const entries = Object.entries(NEWS_CATEGORY_TYPE)
      let output = ''
      entries.forEach(([key, value]) => {
        if (value.code === this.data.category) output = value.primaryLabel
      })
      return output
    }
  }
}
</script>

<style scoped lang="scss">
* {
  font-family: 'Roboto-Regular', sans-serif;
}

.card-new {
  border-bottom: 1px solid #dfdddd;
  padding-bottom: 15px;
  margin-bottom: 25px;

  @include responsive(sm) {
    border: none;
    padding: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .11);
    border: 1px solid #eff1f5;
    border-radius: 8px;
    cursor: pointer;
  }
}

.image-wrapper {
  position: relative;

  @include responsive(sm1) {
    flex: 20% 1;
  }

  @include responsive(sm) {
    display: block;
  }
}

.image-wrapper p {
  position: absolute;
  top: 10px;
  background-color: #505050;
  color: #fff;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  text-overflow: ellipsis;
  text-transform: uppercase;
  padding: 2px 10px;
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
}

.card-content {
  display: flex;
  gap: 12px;

  @include responsive(sm) {
    display: block;
  }
}

.card-tags {
  padding-top: 12px;
  display: flex;
  gap: 8px;

  @include responsive(sm) {
    padding: 12px 8px;
  }
}

.tags-chip {
  background: #f2f2f2;
  border-radius: 16px;
  padding: 5px 15px;
  cursor: pointer;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #505050 !important;

  &:hover {
    background: #ffeceb;
    color: #74150f !important;
  }
}

.card-content img {
  height: 150px;
  width: 260px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;

  @include responsive(sm1) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    width: 100%;
  }
}

.card-info {
  @include responsive(sm1) {
    flex: 80% 1;
  }

  @include responsive(sm) {
    padding: 10px;
  }
}

.card-info p:first-child {
  margin: 0;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #999;
}

.card-info h3 {
  font-family: 'Lexend-Medium', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  margin: 5px 0 10px 0;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  @include responsive(sm1) {
    font-size: 16px;
    line-height: 24px;
  }
}

.card-info h3:hover {
  color: #999;
}

.card-info p:last-child {
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.route-link {
  color: unset;
}
</style>
