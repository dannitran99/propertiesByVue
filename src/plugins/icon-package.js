import RightArrow from '@/components/icons/RightArrow.vue'

const iconElements = {
  RightArrow
}

export default {
  install (Vue) {
    Object.keys(iconElements).forEach(compName => {
      Vue.component(`icon-${compName.toLowerCase()}`, iconElements[compName])
    })
  }
}
