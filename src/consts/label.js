import {PROPSSALETYPE, PROPSRENTTYPE} from './propstype'

export const FILTER_SALE_LABEL = [
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

export const FILTER_RENT_LABEL = [
  'Tất cả nhà đất',
  PROPSRENTTYPE.canho.secondaryLabel,
  PROPSRENTTYPE.nharieng.secondaryLabel,
  PROPSRENTTYPE.bietthu.secondaryLabel,
  PROPSRENTTYPE.nhamatpho.secondaryLabel,
  PROPSRENTTYPE.nhatro.secondaryLabel,
  PROPSRENTTYPE.shophouse.secondaryLabel,
  PROPSRENTTYPE.vanphong.secondaryLabel,
  PROPSRENTTYPE.cuahang.secondaryLabel,
  PROPSRENTTYPE.kho.secondaryLabel,
  PROPSRENTTYPE.khac.secondaryLabel
]

export const FILTER_SALE_ID = [
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

export const FILTER_RENT_ID = [
  PROPSRENTTYPE.canho.code,
  PROPSRENTTYPE.nharieng.code,
  PROPSRENTTYPE.bietthu.code,
  PROPSRENTTYPE.nhamatpho.code,
  PROPSRENTTYPE.shophouse.code,
  PROPSRENTTYPE.nhatro.code,
  PROPSRENTTYPE.vanphong.code,
  PROPSRENTTYPE.cuahang.code,
  PROPSRENTTYPE.kho.code,
  PROPSRENTTYPE.khac.code
]

export const FILTER_RENT_OPTION = [
  { label: 'Tất cả nhà đất', icon: 'icon-house' },
  {
    label: PROPSRENTTYPE.canho.secondaryLabel,
    value: PROPSRENTTYPE.canho.code,
    icon: 'icon-building'
  },
  {
    label: PROPSRENTTYPE.nharieng.secondaryLabel,
    value: PROPSRENTTYPE.nharieng.code,
    icon: 'icon-homeaccount'
  },
  {
    label: PROPSRENTTYPE.bietthu.secondaryLabel,
    value: PROPSRENTTYPE.bietthu.code,
    icon: 'icon-villa'
  },
  {
    label: PROPSRENTTYPE.nhamatpho.secondaryLabel,
    value: PROPSRENTTYPE.nhamatpho.code,
    icon: 'icon-streethouse'
  },
  {
    label: PROPSRENTTYPE.nhatro.secondaryLabel,
    value: PROPSRENTTYPE.nhatro.code,
    icon: 'icon-bunk'
  },
  {
    label: PROPSRENTTYPE.shophouse.secondaryLabel,
    value: PROPSRENTTYPE.shophouse.code,
    icon: 'icon-shophouse'
  },
  {
    label: PROPSRENTTYPE.vanphong.secondaryLabel,
    value: PROPSRENTTYPE.vanphong.code,
    icon: 'icon-case'
  },
  {
    label: PROPSRENTTYPE.cuahang.secondaryLabel,
    value: PROPSRENTTYPE.cuahang.code,
    icon: 'icon-shop'
  },
  {
    label: PROPSRENTTYPE.kho.secondaryLabel,
    value: PROPSRENTTYPE.kho.code,
    icon: 'icon-warehouse'
  },
  {
    label: PROPSRENTTYPE.khac.secondaryLabel,
    value: PROPSRENTTYPE.khac.code,
    icon: 'icon-housegroup'
  }
]

export const FILTER_SALE_OPTION = [
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
      { label: PROPSRENTTYPE.canho.primaryLabel,
        path: PROPSRENTTYPE.canho.code },
      { label: PROPSRENTTYPE.nharieng.primaryLabel,
        path: PROPSRENTTYPE.nharieng.code },
      { label: PROPSRENTTYPE.bietthu.primaryLabel,
        path: PROPSRENTTYPE.bietthu.code },
      { label: PROPSRENTTYPE.nhamatpho.primaryLabel,
        path: PROPSRENTTYPE.nhamatpho.code },
      { label: PROPSRENTTYPE.shophouse.primaryLabel,
        path: PROPSRENTTYPE.shophouse.code },
      { label: PROPSRENTTYPE.nhatro.primaryLabel,
        path: PROPSRENTTYPE.nhatro.code },
      { label: PROPSRENTTYPE.vanphong.primaryLabel,
        path: PROPSRENTTYPE.vanphong.code },
      { label: PROPSRENTTYPE.cuahang.primaryLabel,
        path: PROPSRENTTYPE.cuahang.code },
      { label: PROPSRENTTYPE.kho.primaryLabel,
        path: PROPSRENTTYPE.kho.code },
      { label: PROPSRENTTYPE.khac.primaryLabel,
        path: PROPSRENTTYPE.khac.code }
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
