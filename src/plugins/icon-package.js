import RightArrow from '@/components/icons/RightArrow.vue'
import Home from '@/components/icons/Home.vue'
import RightTriangle from '@/components/icons/RightTriangle.vue'
import DownTriangle from '@/components/icons/DownTriangle.vue'
import Search from '@/components/icons/Search.vue'
import Close from '@/components/icons/Close.vue'
import Clock from '@/components/icons/Clock.vue'
import Photo from '@/components/icons/Photo.vue'
import MapPoint from '@/components/icons/MapPoint.vue'
import Heart from '@/components/icons/Heart.vue'
import Magnify from '@/components/icons/Magnify.vue'
import Tune from '@/components/icons/Tune.vue'
import Cached from '@/components/icons/Cached.vue'
import Condotel from '@/components/icons/Condotel.vue'
import Building from '@/components/icons/Building.vue'
import House from '@/components/icons/House.vue'
import HomeAccount from '@/components/icons/HomeAccount.vue'
import Warehouse from '@/components/icons/Warehouse.vue'
import PinMap from '@/components/icons/PinMap.vue'
import HouseGroup from '@/components/icons/HouseGroup.vue'
import Logout from '@/components/icons/Logout.vue'
import LeftArrow from '@/components/icons/LeftArrow.vue'
const iconElements = {
  RightArrow,
  Home,
  RightTriangle,
  Search,
  Close,
  Clock,
  Photo,
  MapPoint,
  Heart,
  Magnify,
  DownTriangle,
  Tune,
  Cached,
  Building,
  Condotel,
  HomeAccount,
  House,
  HouseGroup,
  PinMap,
  Warehouse,
  Logout,
  LeftArrow
}

export default {
  install (Vue) {
    Object.keys(iconElements).forEach(compName => {
      Vue.component(`icon-${compName.toLowerCase()}`, iconElements[compName])
    })
  }
}
