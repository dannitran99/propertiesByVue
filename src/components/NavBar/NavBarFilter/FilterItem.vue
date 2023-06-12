<template>
  <li class="li-parent">
    <div class="li-item">
      <div class="label-icon" >
        <component :is="data.icon" />
        <span>{{ data.label }}</span>
      </div>
      <input type="checkbox" v-model="categoryFilter" :value="data.label" @change="handleChange"/>
    </div>
    <ul v-if="data.subItem">
        <li v-for="item in data.subItem" v-bind:key="item.label">
          <div class="li-item align-left">
            <span>{{ item.label }}</span>
            <input type="checkbox" v-model="categoryFilter" :value="item.label" />
          </div>
        </li>
    </ul>
  </li>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    },
    checkedNames: {
      type: Array
    }
  },
  computed: {
    categoryFilter: {
      get () {
        return this.$store.getters['properties/categoryFilter']
      },
      set () {
      }
    }
  },
  methods: {
    handleChange: function ($event) {
      console.log($event.target)
    }
  }
}
</script>

<style scoped>
    li{
        padding: 6px 0;
        list-style-type: none;
        margin-bottom: 4px;
        font-size: 13px;
        line-height: 20px;
        color: #2C2C2C;
    }
    li:last-of-type{
      border-bottom: 0
    }
    ul{
      padding: 8px 0 0 0;
    }
    input{
      cursor: pointer;
      accent-color: #961b12
    }
    .li-item{
      height: 100%;
      padding: 0 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .li-item:hover {
      background: #F2F2F2;
    }
    .li-parent{
      border-bottom: 1px solid #F2F2F2;
    }
    .label-icon{
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .align-left{
      padding-left: 45px;
    }
</style>
