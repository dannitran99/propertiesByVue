import * as Yup from 'yup'

export const schema = Yup.object().shape({
  logo: Yup.string().required('Vui lòng chọn ảnh logo cty'),
  banner: Yup.string(),
  name: Yup.string().required('Vui lòng nhập tên cty'),
  city: Yup.string().required('Vui lòng chọn tỉnh, thành phố'),
  district: Yup.string().required('Vui lòng chọn quận, huyện'),
  ward: Yup.string().required('Vui lòng chọn phường, xã'),
  street: Yup.string(),
  businessField: Yup.string().required('Vui chọn lĩnh vực cty'),
  subBusiness: Yup.array(),
  description: Yup.string().required('Vui lòng nhập mô tả'),
  phoneNumber: Yup.string(),
  email: Yup.string().email(),
  website: Yup.string().url('Địa chỉ website không đúng')
})
