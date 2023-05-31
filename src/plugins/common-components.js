import NavBar from '@/components/NavBar'
import NewsHomePage from '@/components/NewsHomePage'
import BreadCrumb from '@/components/BreadCrumb'

const commonElements = {
  NavBar,
  NewsHomePage,
  BreadCrumb
}

export default {
  install (Vue) {
    Object.keys(commonElements).forEach(compName => {
      Vue.component(compName, commonElements[compName])
    })
  }
}
