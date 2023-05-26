<template>
  <li class="menu-button">
     <router-link :to="{name: href}" class="route-link">
      {{ label }}
    </router-link>
    <div class="divider"></div>
    <ul v-if="submenu" class="sub-menu">
      <sub-menu-button v-for="item in submenu" v-bind:key="item.label" v-bind:label="item.label"/>
    </ul>
  </li>
</template>

<script>
import SubMenuButton from './SubMenuButton.vue'
export default {
  name: 'NavBarButton',
  components: {
    'sub-menu-button': SubMenuButton
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    submenu: {
      type: Array,
      default: null
    },
    href: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped >
  .route-link{
    text-decoration: none;
    color: #000;
    padding: 0;
    background-color: transparent;
    border: none;
    font-size: 14px;
    line-height: 20px;
    font-weight: normal !important;
    letter-spacing: -.2px;
    cursor: pointer;
  }
  .menu-button:hover .divider{
    background-size:  100% 100%;
  }
  .menu-button:hover .sub-menu{
    display: block;
  }
  .menu-button{
    position: relative;
    list-style-type: none;
  }
  .sub-menu{
    display: grid;
    position: absolute;
    display: none;
    min-width: 240px;
    height: auto;
    border-radius: 8px;
    margin: 0;
    padding-inline: 0;
    padding-top: 8px;
    padding-bottom: 8px;
    background-color: #fff;
    box-shadow: 0 8px 20px hsla(0,0%,71%,.3);
    text-align: left;
  }
  .divider{
    margin-top: 10px;
    height: 2px;
    background: linear-gradient(to left, red, red) no-repeat 0 0;
    background-size:  0% 100%;
    transition: .5s;
  }
</style>
