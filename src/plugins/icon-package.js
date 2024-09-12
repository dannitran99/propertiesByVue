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
import ImageUploader from '@/components/icons/ImageUploader.vue'
import CloseWB from '@/components/icons/CloseWB.vue'
import RightArrowWC from '@/components/icons/RightArrowWC.vue'
import MediaPlay from '@/components/icons/MediaPlay.vue'
import List from '@/components/icons/List.vue'
import User from '@/components/icons/User.vue'
import Lock from '@/components/icons/Lock.vue'
import Camera from '@/components/icons/Camera.vue'
import Phone from '@/components/icons/Phone.vue'
import ZoomIn from '@/components/icons/ZoomIn.vue'
import ZoomOut from '@/components/icons/ZoomOut.vue'
import Villa from '@/components/icons/Villa.vue'
import StreetHouse from '@/components/icons/StreetHouse.vue'
import Bunk from '@/components/icons/Bunk.vue'
import Shophouse from '@/components/icons/Shophouse.vue'
import Case from '@/components/icons/Case.vue'
import Shop from '@/components/icons/Shop.vue'
import RightArrowSC from '@/components/icons/RightArrowSC.vue'
import ArrowUp from '@/components/icons/ArrowUp.vue'
import Threedot from '@/components/icons/Threedot.vue'
import MenuList from '@/components/icons/MenuList.vue'
import Person from '@/components/icons/Person.vue'
import Box from '@/components/icons/Box.vue'
import Plus from '@/components/icons/Plus.vue'
import Minus from '@/components/icons/Minus.vue'
import CellPhone from '@/components/icons/CellPhone.vue'
import BuyProperty from '@/components/icons/BuyProperty.vue'
import SaleProperty from '@/components/icons/SaleProperty.vue'
import RentProperty from '@/components/icons/RentProperty.vue'
import Finance from '@/components/icons/Finance.vue'
import Planning from '@/components/icons/Planning.vue'
import Interior from '@/components/icons/Interior.vue'
import Zone from '@/components/icons/Zone.vue'
import Statistic from '@/components/icons/Statistic.vue'
import Video from '@/components/icons/Video.vue'
import Report from '@/components/icons/Report.vue'
import Analystic from '@/components/icons/Analystic.vue'
import Menu from '@/components/icons/Menu.vue'
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
  LeftArrow,
  Plus,
  Minus,
  ImageUploader,
  CloseWB,
  RightArrowWC,
  MediaPlay,
  List,
  User,
  Lock,
  Camera,
  Phone,
  CellPhone,
  ZoomIn,
  ZoomOut,
  Villa,
  StreetHouse,
  Bunk,
  Shophouse,
  Case,
  Shop,
  RightArrowSC,
  ArrowUp,
  Threedot,
  MenuList,
  Person,
  Box,
  BuyProperty,
  SaleProperty,
  RentProperty,
  Finance,
  Planning,
  Interior,
  Zone,
  Statistic,
  Video,
  Report,
  Analystic,
  Menu
}

export default {
  install (Vue) {
    Object.keys(iconElements).forEach(compName => {
      Vue.component(`icon-${compName.toLowerCase()}`, iconElements[compName])
    })
  }
}
