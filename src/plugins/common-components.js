import NavBar from '@/components/NavBar'
import NewsHomePage from '@/components/NewsHomePage'
import PropertiesHomePage from '@/components/PropertiesHomePage'
import BreadCrumb from '@/components/BreadCrumb'
import Properties from '@/components/Properties'

const commonElements = {
  NavBar,
  NewsHomePage,
  PropertiesHomePage,
  BreadCrumb,
  Properties
}

export default {
  install (Vue) {
    Object.keys(commonElements).forEach(compName => {
      Vue.component(compName, commonElements[compName])
    })
  }
}
