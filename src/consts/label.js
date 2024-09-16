import { PROPSSALETYPE, PROPSRENTTYPE } from './propstype'
import { NEWS_CATEGORY_TYPE } from './newsCategory'

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

export const NEWS_ITEM = [
  {
    id: 1,
    label: NEWS_CATEGORY_TYPE.tintuc.primaryLabel,
    value: NEWS_CATEGORY_TYPE.tintuc.code
  },
  {
    id: 2,
    label: NEWS_CATEGORY_TYPE.mua.primaryLabel,
    value: NEWS_CATEGORY_TYPE.mua.code
  },
  {
    id: 3,
    label: NEWS_CATEGORY_TYPE.ban.primaryLabel,
    value: NEWS_CATEGORY_TYPE.ban.code
  },
  {
    id: 4,
    label: NEWS_CATEGORY_TYPE.thue.primaryLabel,
    value: NEWS_CATEGORY_TYPE.thue.code
  },
  {
    id: 5,
    label: NEWS_CATEGORY_TYPE.taichinh.primaryLabel,
    value: NEWS_CATEGORY_TYPE.taichinh.code
  },
  {
    id: 6,
    label: NEWS_CATEGORY_TYPE.quyhoach.primaryLabel,
    value: NEWS_CATEGORY_TYPE.quyhoach.code
  },
  {
    id: 7,
    label: NEWS_CATEGORY_TYPE.noithat.primaryLabel,
    value: NEWS_CATEGORY_TYPE.noithat.code
  },
  {
    id: 8,
    label: NEWS_CATEGORY_TYPE.phongthuy.primaryLabel,
    value: NEWS_CATEGORY_TYPE.phongthuy.code
  },
  {
    id: 9,
    label: NEWS_CATEGORY_TYPE.bieudo.primaryLabel,
    value: NEWS_CATEGORY_TYPE.bieudo.code
  },
  {
    id: 10,
    label: NEWS_CATEGORY_TYPE.video.primaryLabel,
    value: NEWS_CATEGORY_TYPE.video.code
  },
  {
    id: 11,
    label: NEWS_CATEGORY_TYPE.chuyengia.primaryLabel,
    value: NEWS_CATEGORY_TYPE.chuyengia.code
  }
]

export const SALE_ITEM = [
  {
    id: 1,
    label: PROPSSALETYPE.canho.primaryLabel,
    value: PROPSSALETYPE.canho.code
  },
  {
    id: 2,
    label: PROPSSALETYPE.nharieng.primaryLabel,
    value: PROPSSALETYPE.nharieng.code
  },
  {
    id: 3,
    label: PROPSSALETYPE.bietthu.primaryLabel,
    value: PROPSSALETYPE.bietthu.code
  },
  {
    id: 4,
    label: PROPSSALETYPE.nhamatpho.primaryLabel,
    value: PROPSSALETYPE.nhamatpho.code
  },
  {
    id: 5,
    label: PROPSSALETYPE.shophouse.primaryLabel,
    value: PROPSSALETYPE.shophouse.code
  },
  {
    id: 6,
    label: PROPSSALETYPE.duan.primaryLabel,
    value: PROPSSALETYPE.duan.code
  },
  {
    id: 7,
    label: PROPSSALETYPE.dat.primaryLabel,
    value: PROPSSALETYPE.dat.code
  },
  {
    id: 8,
    label: PROPSSALETYPE.trangtrai.primaryLabel,
    value: PROPSSALETYPE.trangtrai.code
  },
  {
    id: 9,
    label: PROPSSALETYPE.condotel.primaryLabel,
    value: PROPSSALETYPE.condotel.code
  },
  {
    id: 10,
    label: PROPSSALETYPE.kho.primaryLabel,
    value: PROPSSALETYPE.kho.code
  },
  {
    id: 11,
    label: PROPSSALETYPE.khac.primaryLabel,
    value: PROPSSALETYPE.khac.code
  }
]

export const RENT_ITEM = [
  {
    id: 1,
    label: PROPSRENTTYPE.canho.primaryLabel,
    value: PROPSRENTTYPE.canho.code
  },
  {
    id: 2,
    label: PROPSRENTTYPE.nharieng.primaryLabel,
    value: PROPSRENTTYPE.nharieng.code
  },
  {
    id: 3,
    label: PROPSRENTTYPE.bietthu.primaryLabel,
    value: PROPSRENTTYPE.bietthu.code
  },
  {
    id: 4,
    label: PROPSRENTTYPE.nhamatpho.primaryLabel,
    value: PROPSRENTTYPE.nhamatpho.code
  },
  {
    id: 5,
    label: PROPSRENTTYPE.shophouse.primaryLabel,
    value: PROPSRENTTYPE.shophouse.code
  },
  {
    id: 6,
    label: PROPSRENTTYPE.nhatro.primaryLabel,
    value: PROPSRENTTYPE.nhatro.code
  },
  {
    id: 7,
    label: PROPSRENTTYPE.vanphong.primaryLabel,
    value: PROPSRENTTYPE.vanphong.code
  },
  {
    id: 8,
    label: PROPSRENTTYPE.cuahang.primaryLabel,
    value: PROPSRENTTYPE.cuahang.code
  },
  {
    id: 9,
    label: PROPSRENTTYPE.kho.primaryLabel,
    value: PROPSRENTTYPE.kho.code
  },
  {
    id: 10,
    label: PROPSRENTTYPE.khac.primaryLabel,
    value: PROPSRENTTYPE.khac.code
  }
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
    icon: 'icon-building'
  },
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
    icon: 'icon-warehouse'
  },
  {
    label: PROPSSALETYPE.khac.secondaryLabel,
    value: PROPSSALETYPE.khac.code,
    icon: 'icon-housegroup'
  }
]

export const FILTER_NEWS = [
  {
    label: NEWS_CATEGORY_TYPE.tintuc.primaryLabel,
    value: NEWS_CATEGORY_TYPE.tintuc.code,
    pathName: 'NewsDetail'
  },
  {
    label: NEWS_CATEGORY_TYPE.wiki.primaryLabel,
    value: NEWS_CATEGORY_TYPE.wiki.code,
    pathName: 'WikiDetail',
    subItem: [
      {
        label: NEWS_CATEGORY_TYPE.mua.primaryLabel,
        value: NEWS_CATEGORY_TYPE.mua.code,
        icon: 'icon-buyproperty'
      },
      {
        label: NEWS_CATEGORY_TYPE.ban.primaryLabel,
        value: NEWS_CATEGORY_TYPE.ban.code,
        icon: 'icon-saleproperty'
      },
      {
        label: NEWS_CATEGORY_TYPE.thue.primaryLabel,
        value: NEWS_CATEGORY_TYPE.thue.code,
        icon: 'icon-rentproperty'
      },
      {
        label: NEWS_CATEGORY_TYPE.taichinh.primaryLabel,
        value: NEWS_CATEGORY_TYPE.taichinh.code,
        icon: 'icon-finance'
      },
      {
        label: NEWS_CATEGORY_TYPE.quyhoach.primaryLabel,
        value: NEWS_CATEGORY_TYPE.quyhoach.code,
        icon: 'icon-planning'
      },
      {
        label: NEWS_CATEGORY_TYPE.noithat.primaryLabel,
        value: NEWS_CATEGORY_TYPE.noithat.code,
        icon: 'icon-interior'
      },
      {
        label: NEWS_CATEGORY_TYPE.phongthuy.primaryLabel,
        value: NEWS_CATEGORY_TYPE.phongthuy.code,
        icon: 'icon-zone'
      }
    ]
  },
  {
    label: NEWS_CATEGORY_TYPE.phantich.primaryLabel,
    value: NEWS_CATEGORY_TYPE.phantich.code,
    pathName: 'AnalysticDetail',
    subItem: [
      {
        label: NEWS_CATEGORY_TYPE.bieudo.primaryLabel,
        value: NEWS_CATEGORY_TYPE.bieudo.code,
        icon: 'icon-statistic'
      },
      {
        label: NEWS_CATEGORY_TYPE.video.primaryLabel,
        value: NEWS_CATEGORY_TYPE.video.code,
        icon: 'icon-video'
      },
      {
        label: NEWS_CATEGORY_TYPE.baocao.primaryLabel,
        href: `/${NEWS_CATEGORY_TYPE.baocao.code}`,
        icon: 'icon-report'
      },
      {
        label: NEWS_CATEGORY_TYPE.chuyengia.primaryLabel,
        value: NEWS_CATEGORY_TYPE.chuyengia.code,
        icon: 'icon-analystic'
      },
      { label: NEWS_CATEGORY_TYPE.interaktive.primaryLabel }
    ]
  }
]

export const MENU_ITEM = [
  {
    label: 'Nhà đất bán',
    href: 'PropertiesForSale',
    path: ['nha-dat-ban'],
    icon: 'icon-house',
    sub: [
      {
        label: PROPSSALETYPE.canho.primaryLabel,
        path: PROPSSALETYPE.canho.code
      },
      {
        label: PROPSSALETYPE.nharieng.primaryLabel,
        path: PROPSSALETYPE.nharieng.code
      },
      {
        label: PROPSSALETYPE.bietthu.primaryLabel,
        path: PROPSSALETYPE.bietthu.code
      },
      {
        label: PROPSSALETYPE.nhamatpho.primaryLabel,
        path: PROPSSALETYPE.nhamatpho.code
      },
      {
        label: PROPSSALETYPE.shophouse.primaryLabel,
        path: PROPSSALETYPE.shophouse.code
      },
      { label: PROPSSALETYPE.duan.primaryLabel, path: PROPSSALETYPE.duan.code },
      { label: PROPSSALETYPE.dat.primaryLabel, path: PROPSSALETYPE.dat.code },
      {
        label: PROPSSALETYPE.trangtrai.primaryLabel,
        path: PROPSSALETYPE.trangtrai.code
      },
      {
        label: PROPSSALETYPE.condotel.primaryLabel,
        path: PROPSSALETYPE.condotel.code
      },
      { label: PROPSSALETYPE.kho.primaryLabel, path: PROPSSALETYPE.kho.code },
      { label: PROPSSALETYPE.khac.primaryLabel, path: PROPSSALETYPE.khac.code }
    ]
  },
  {
    label: 'Nhà đất cho thuê',
    href: 'PropertiesForRent',
    path: ['nha-dat-cho-thue'],
    icon: 'icon-condotel',
    sub: [
      {
        label: PROPSRENTTYPE.canho.primaryLabel,
        path: PROPSRENTTYPE.canho.code
      },
      {
        label: PROPSRENTTYPE.nharieng.primaryLabel,
        path: PROPSRENTTYPE.nharieng.code
      },
      {
        label: PROPSRENTTYPE.bietthu.primaryLabel,
        path: PROPSRENTTYPE.bietthu.code
      },
      {
        label: PROPSRENTTYPE.nhamatpho.primaryLabel,
        path: PROPSRENTTYPE.nhamatpho.code
      },
      {
        label: PROPSRENTTYPE.shophouse.primaryLabel,
        path: PROPSRENTTYPE.shophouse.code
      },
      {
        label: PROPSRENTTYPE.nhatro.primaryLabel,
        path: PROPSRENTTYPE.nhatro.code
      },
      {
        label: PROPSRENTTYPE.vanphong.primaryLabel,
        path: PROPSRENTTYPE.vanphong.code
      },
      {
        label: PROPSRENTTYPE.cuahang.primaryLabel,
        path: PROPSRENTTYPE.cuahang.code
      },
      { label: PROPSRENTTYPE.kho.primaryLabel, path: PROPSRENTTYPE.kho.code },
      { label: PROPSRENTTYPE.khac.primaryLabel, path: PROPSRENTTYPE.khac.code }
    ]
  },
  {
    label: 'Dự án',
    icon: 'icon-building',
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
  { label: NEWS_CATEGORY_TYPE.tintuc.primaryLabel,
    href: 'News',
    path: [NEWS_CATEGORY_TYPE.tintuc.code],
    icon: 'icon-news'
  },
  {
    label: NEWS_CATEGORY_TYPE.wiki.primaryLabel,
    href: 'Wiki',
    path: [NEWS_CATEGORY_TYPE.wiki.code],
    icon: 'icon-books',
    sub: [
      {
        label: NEWS_CATEGORY_TYPE.mua.primaryLabel,
        path: NEWS_CATEGORY_TYPE.mua.code
      },
      {
        label: NEWS_CATEGORY_TYPE.ban.primaryLabel,
        path: NEWS_CATEGORY_TYPE.ban.code
      },
      {
        label: NEWS_CATEGORY_TYPE.thue.primaryLabel,
        path: NEWS_CATEGORY_TYPE.thue.code
      },
      {
        label: NEWS_CATEGORY_TYPE.taichinh.primaryLabel,
        path: NEWS_CATEGORY_TYPE.taichinh.code
      },
      {
        label: NEWS_CATEGORY_TYPE.quyhoach.primaryLabel,
        path: NEWS_CATEGORY_TYPE.quyhoach.code
      },
      {
        label: NEWS_CATEGORY_TYPE.noithat.primaryLabel,
        path: NEWS_CATEGORY_TYPE.noithat.code
      },
      {
        label: NEWS_CATEGORY_TYPE.phongthuy.primaryLabel,
        path: NEWS_CATEGORY_TYPE.phongthuy.code
      }
    ]
  },
  {
    label: NEWS_CATEGORY_TYPE.phantich.primaryLabel,
    href: 'Analystic',
    path: [NEWS_CATEGORY_TYPE.phantich.code],
    icon: 'icon-chart',
    sub: [
      {
        label: NEWS_CATEGORY_TYPE.bieudo.primaryLabel,
        path: NEWS_CATEGORY_TYPE.bieudo.code
      },
      {
        label: NEWS_CATEGORY_TYPE.video.primaryLabel,
        path: NEWS_CATEGORY_TYPE.video.code
      },
      {
        label: NEWS_CATEGORY_TYPE.baocao.primaryLabel,
        href: `/${NEWS_CATEGORY_TYPE.baocao.code}`
      },
      {
        label: NEWS_CATEGORY_TYPE.chuyengia.primaryLabel,
        path: NEWS_CATEGORY_TYPE.chuyengia.code
      },
      { label: NEWS_CATEGORY_TYPE.interaktive.primaryLabel }
    ]
  },
  {
    label: 'Danh bạ',
    path: ['/nha-moi-gioi'],
    icon: 'icon-contact',
    sub: [
      { label: 'Nhà môi giới', href: '/nha-moi-gioi' },
      { label: 'Doanh nghiệp' }
    ]
  }
]
