import * as Yup from 'yup'
import {MODULE_TITLE, MODULE_PARAGRAPH} from '@/consts/contentNews'

// const CONTENT_VALIDATE = 'content-validate'

export const schema = Yup.object().shape({
  category: Yup.string().required('Vui lòng chọn danh mục tin'),
  tags: Yup.array(),
  title: Yup.string().required('Vui lòng điền tiêu đề bài viết'),
  description: Yup.string().required('Vui lòng điền mô tả bài viết'),
  thumbnail: Yup.string().required('Vui lòng chọn ảnh thu nhỏ bài viết'),
  content: Yup.array()
    .of(
      Yup.lazy(value => {
        switch (value.id) {
          case MODULE_TITLE:
            return schemaTitle
          case MODULE_PARAGRAPH:
            return schemaParagraph
          default:
            return schemaParagraph
        }
      })
    )
    .min(1, 'Nhập ít nhất 1 nội dung')
})

const schemaTitle = Yup.object().shape({
  id: Yup.string(),
  content: Yup.string().required('Vui lòng điền tiêu đề'),
  size: Yup.string().required('Vui lòng chọn cỡ chữ')
})

const schemaParagraph = Yup.object().shape({
  id: Yup.string(),
  content: Yup.string().required('Vui lòng nhập đoạn văn bản')
})

export const handleErrorContent = (input) => {
  return input.map(item => {
    switch (item.id) {
      case MODULE_TITLE:
        return ({
          content: '',
          size: ''
        })
      case MODULE_PARAGRAPH:
        return ({
          content: ''
        })
      default: break
    }
  })
}
