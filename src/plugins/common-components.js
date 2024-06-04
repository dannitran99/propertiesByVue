import NavBar from '@/components/NavBar'
import FooterComp from '@/components/Footer'
import LoginButton from '@/components/LoginButton'
import NewsHomePage from '@/components/NewsHomePage'
import PropertiesHomePage from '@/components/PropertiesHomePage'
import BreadCrumb from '@/components/BreadCrumb'
import BreadCrumbProperty from '@/components/BreadCrumbProperty'
import Properties from '@/components/Properties'
import NewsCard from '@/components/News/NewsCard'
import Carousel from '@/components/Carousel'
import NewsCardSkeleton from '@/components/News/NewsCard/NewsCardSkeleton.vue'
const commonElements = {
  NavBar,
  FooterComp,
  LoginButton,
  NewsHomePage,
  PropertiesHomePage,
  BreadCrumb,
  BreadCrumbProperty,
  Properties,
  NewsCard,
  Carousel,
  NewsCardSkeleton
}

export default {
  install (Vue) {
    Object.keys(commonElements).forEach(compName => {
      Vue.component(compName, commonElements[compName])
    })
  }
}
