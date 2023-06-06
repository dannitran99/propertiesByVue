import RightArrow from '@/components/icons/RightArrow.vue'
import Home from '@/components/icons/Home.vue'
import RightTriangle from '@/components/icons/RightTriangle.vue'
import Search from '@/components/icons/Search.vue'
import Close from '@/components/icons/Close.vue'
import Clock from '@/components/icons/Clock.vue'
import Photo from '@/components/icons/Photo.vue'
import MapPoint from '@/components/icons/MapPoint.vue'
import Heart from '@/components/icons/Heart.vue'

const iconElements = {
  RightArrow,
  Home,
  RightTriangle,
  Search,
  Close,
  Clock,
  Photo,
  MapPoint,
  Heart
}

export default {
  install (Vue) {
    Object.keys(iconElements).forEach(compName => {
      Vue.component(`icon-${compName.toLowerCase()}`, iconElements[compName])
    })
  }
}
