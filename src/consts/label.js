import {PROPSSALETYPE} from './propstype'

export const FILTER_LABEL = [
  'Tất cả nhà đất',
  PROPSSALETYPE.canho.secondaryLabel,
  'Các loại nhà bán',
  PROPSSALETYPE.nharieng.secondaryLabel,
  PROPSSALETYPE.bietthu.secondaryLabel,
  PROPSSALETYPE.nhamatpho.secondaryLabel,
  PROPSSALETYPE.shophouse.secondaryLabel,
  'Các loại đất bán',
  PROPSSALETYPE.duan.secondaryLabel,
  PROPSSALETYPE.dat.secondaryLabel,
  PROPSSALETYPE.kho.secondaryLabel,
  PROPSSALETYPE.khac.secondaryLabel,
  PROPSSALETYPE.condotel.secondaryLabel,
  PROPSSALETYPE.trangtrai.secondaryLabel
]

export const FILTER_ID = [
  PROPSSALETYPE.canho.code,
  PROPSSALETYPE.nharieng.code,
  PROPSSALETYPE.bietthu.code,
  PROPSSALETYPE.nhamatpho.code,
  PROPSSALETYPE.shophouse.code,
  PROPSSALETYPE.duan.code,
  PROPSSALETYPE.dat.code,
  PROPSSALETYPE.kho.code,
  PROPSSALETYPE.khac.code,
  PROPSSALETYPE.condotel.code,
  PROPSSALETYPE.trangtrai.code
]

export const FILTER_OPTION = [
  { label: 'Tất cả nhà đất', icon: 'icon-house' },
  {
    label: PROPSSALETYPE.canho.secondaryLabel,
    value: PROPSSALETYPE.canho.code,
    icon: 'icon-building' },
  {
    label: 'Các loại nhà bán',
    icon: 'icon-homeaccount',
    subItem: [
      {
        label: PROPSSALETYPE.nharieng.secondaryLabel,
        value: PROPSSALETYPE.nharieng.code
      },
      {
        label: PROPSSALETYPE.bietthu.secondaryLabel,
        value: PROPSSALETYPE.bietthu.code
      },
      {
        label: PROPSSALETYPE.nhamatpho.secondaryLabel,
        value: PROPSSALETYPE.nhamatpho.code
      },
      {
        label: PROPSSALETYPE.shophouse.secondaryLabel,
        value: PROPSSALETYPE.shophouse.code
      }
    ]
  },
  {
    label: 'Các loại đất bán',
    icon: 'icon-pinmap',
    subItem: [
      {
        label: PROPSSALETYPE.duan.secondaryLabel,
        value: PROPSSALETYPE.duan.code
      },
      {
        label: PROPSSALETYPE.dat.secondaryLabel,
        value: PROPSSALETYPE.dat.code
      }
    ]
  },
  {
    label: PROPSSALETYPE.trangtrai.secondaryLabel,
    value: PROPSSALETYPE.trangtrai.code,
    icon: 'icon-condotel',
    subItem: [
      {
        label: PROPSSALETYPE.condotel.secondaryLabel,
        value: PROPSSALETYPE.condotel.code
      }
    ]
  },
  {
    label: PROPSSALETYPE.kho.secondaryLabel,
    value: PROPSSALETYPE.kho.code,
    icon: 'icon-warehouse' },
  {
    label: PROPSSALETYPE.khac.secondaryLabel,
    value: PROPSSALETYPE.khac.code,
    icon: 'icon-housegroup' }
]

export const MENU_ITEM = [
  {
    label: 'Nhà đất bán',
    href: 'PropertiesForSale',
    path: 'nha-dat-ban',
    sub: [
      { label: PROPSSALETYPE.canho.primaryLabel,
        path: PROPSSALETYPE.canho.code },
      { label: PROPSSALETYPE.nharieng.primaryLabel,
        path: PROPSSALETYPE.nharieng.code },
      { label: PROPSSALETYPE.bietthu.primaryLabel,
        path: PROPSSALETYPE.bietthu.code },
      { label: PROPSSALETYPE.nhamatpho.primaryLabel,
        path: PROPSSALETYPE.nhamatpho.code },
      { label: PROPSSALETYPE.shophouse.primaryLabel,
        path: PROPSSALETYPE.shophouse.code },
      { label: PROPSSALETYPE.duan.primaryLabel,
        path: PROPSSALETYPE.duan.code },
      { label: PROPSSALETYPE.dat.primaryLabel,
        path: PROPSSALETYPE.dat.code },
      { label: PROPSSALETYPE.trangtrai.primaryLabel,
        path: PROPSSALETYPE.trangtrai.code },
      { label: PROPSSALETYPE.condotel.primaryLabel,
        path: PROPSSALETYPE.condotel.code},
      { label: PROPSSALETYPE.kho.primaryLabel,
        path: PROPSSALETYPE.kho.code},
      { label: PROPSSALETYPE.khac.primaryLabel,
        path: PROPSSALETYPE.khac.code }
    ]
  },
  {
    label: 'Nhà đất cho thuê',
    href: 'PropertiesForRent',
    path: 'nha-dat-cho-thue',
    sub: [
      { label: 'Cho thuê căn hộ chung cư' },
      { label: 'Cho thuê nhà riêng' },
      { label: 'Cho thuê nhà biệt thự, liền kề' },
      { label: 'Cho thuê nhà mặt phố' },
      { label: 'Cho thuê shophouse, nhà phố thương mại' },
      { label: 'Cho thuê nhà trọ, phòng trọ' },
      { label: 'Cho thuê văn phòng' },
      { label: 'Cho thuê, sang nhượng cửa hàng, ki ốt' },
      { label: 'Cho thuê kho, nhà xưởng, đất' },
      { label: 'Cho thuê loại bất động sản khác' }
    ]
  },
  {
    label: 'Dự án',
    sub: [
      { label: 'Căn hộ chung cư' },
      { label: 'Cao ốc văn phòng' },
      { label: 'Trung tâm thương mại' },
      { label: 'Khu đô thị mới' },
      { label: 'Khu phức hợp' },
      { label: 'Nhà ở xã hội' },
      { label: 'Khu nghỉ dưỡng, Sinh thái' },
      { label: 'Khu công nghiệp' },
      { label: 'Biệt thự, liền kề' },
      { label: 'Shophouse' },
      { label: 'Nhà mặt phố' },
      { label: 'Dự án khác' }
    ]
  },
  { label: 'Tin tức',
    href: 'News',
    path: 'tin-tuc'
  },
  {
    label: 'Wiki BĐS',
    sub: [
      { label: 'Mua BĐS' },
      { label: 'Bán BĐS' },
      { label: 'Thuê BĐS' },
      { label: 'Tài chính BĐS' },
      { label: 'Quy hoạch - Pháp lý' },
      { label: 'Nội - Ngoại thất' },
      { label: 'Phong thuỷ' }
    ]
  },
  {
    label: 'Phân tích đánh giá',
    sub: [
      { label: 'Biểu đồ giá' },
      { label: 'Video đánh giá' },
      { label: 'Báo cáo thị trường' },
      { label: 'Góc nhìn chuyên gia' },
      { label: 'Interaktive Story' }
    ]
  },
  {
    label: 'Danh bạ',
    sub: [{ label: 'Nhà môi giới' }, { label: 'Doanh nghiệp' }]
  }
]
