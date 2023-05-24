import NavBar from '@/components/NavBar'
import NewsHomePage from '@/components/NewsHomePage'

const commonElements = {
  NavBar,
  NewsHomePage
}

export default {
  install (Vue) {
    Object.keys(commonElements).forEach(compName => {
      Vue.component(compName, commonElements[compName])
    })
  }
}
