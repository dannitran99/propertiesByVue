import NavBar from '@/components/NavBar'
import LoginButton from '@/components/LoginButton'
import NewsHomePage from '@/components/NewsHomePage'
import PropertiesHomePage from '@/components/PropertiesHomePage'
import BreadCrumb from '@/components/BreadCrumb'
import Properties from '@/components/Properties'
import NewsCard from '@/components/News/NewsCard'
import NewsCardSkeleton from '@/components/News/NewsCard/NewsCardSkeleton.vue'
const commonElements = {
  NavBar,
  LoginButton,
  NewsHomePage,
  PropertiesHomePage,
  BreadCrumb,
  Properties,
  NewsCard,
  NewsCardSkeleton
}

export default {
  install (Vue) {
    Object.keys(commonElements).forEach(compName => {
      Vue.component(compName, commonElements[compName])
    })
  }
}
