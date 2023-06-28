export const FILTER_LABEL = ['Tất cả nhà đất', 'Căn hộ chung cư', 'Các loại nhà bán', 'Nhà riêng', 'Nhà biệt thự, liền kề', 'Nhà mặt phố', 'Shophouse, nhà phố thương mại', 'Các loại đất bán', 'Đất nền dự án', 'Bán đất', 'Kho, nhà xưởng', 'Bất động sản khác', 'Condotel', 'Trang trại, khu nghỉ dưỡng']

export const FILTER_OPTION = [
  { label: 'Tất cả nhà đất', icon: 'icon-house' },
  { label: 'Căn hộ chung cư', icon: 'icon-building' },
  {
    label: 'Các loại nhà bán',
    icon: 'icon-homeaccount',
    subItem: [
      {
        label: 'Nhà riêng'
      },
      {
        label: 'Nhà biệt thự, liền kề'
      },
      {
        label: 'Nhà mặt phố'
      },
      {
        label: 'Shophouse, nhà phố thương mại'
      }
    ]
  },
  {
    label: 'Các loại đất bán',
    icon: 'icon-pinmap',
    subItem: [
      {
        label: 'Đất nền dự án'
      },
      {
        label: 'Bán đất'
      }
    ]
  },
  {
    label: 'Trang trại, khu nghỉ dưỡng',
    icon: 'icon-condotel',
    subItem: [
      {
        label: 'Condotel'
      }
    ]
  },
  { label: 'Kho, nhà xưởng', icon: 'icon-warehouse' },
  { label: 'Bất động sản khác', icon: 'icon-housegroup' }
]

export const MENU_ITEM = [
  {
    label: 'Nhà đất bán',
    href: 'PropertiesForSale',
    path: 'nha-dat-ban',
    sub: [
      { label: 'Bán căn hộ chung cư',
        path: 'can-ho-chung-cu' },
      { label: 'Bán nhà riêng',
        path: 'nha-rieng' },
      { label: 'Bán nhà biệt thự, liền kề',
        path: 'nha-biet-thu-lien-ke' },
      { label: 'Bán nhà mặt phố',
        path: 'nha-mat-pho' },
      { label: 'Bán shophouse, nhà phố thương mại',
        path: 'shophouse-nha-pho-thuong-mai' },
      { label: 'Bán đất nền dự án',
        path: '-dat-nen-du-an' },
      { label: 'Bán đất',
        path: 'dat' },
      { label: 'Bán trang trại, khu nghỉ dưỡng',
        path: 'trang-trai-khu-nghi-duong' },
      { label: 'Bán condotel',
        path: 'condotel'},
      { label: 'Bán kho, nhà xưởng',
        path: 'kho-nha-xuong'},
      { label: 'Bán loại bất động sản khác',
        path: 'bat-dong-san-khac' }
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
