import * as Yup from 'yup'
import {MODULE_TITLE, MODULE_PARAGRAPH, MODULE_IMAGE, MODULE_VIDEO, MODULE_TABLE} from '@/consts/contentNews'

export const schema = Yup.object().shape({
  category: Yup.string().required('Vui lòng chọn danh mục tin'),
  tags: Yup.array(),
  title: Yup.string().required('Vui lòng điền tiêu đề bài viết'),
  description: Yup.string().required('Vui lòng điền mô tả bài viết'),
  thumbnail: Yup.string().required('Vui lòng chọn ảnh thu nhỏ bài viết'),
  source: Yup.string(),
  content: Yup.array()
    .of(
      Yup.lazy(value => {
        switch (value.id) {
          case MODULE_TITLE:
            return schemaTitle
          case MODULE_PARAGRAPH:
            return schemaParagraph
          case MODULE_IMAGE:
            return schemaImage
          case MODULE_VIDEO:
            return schemaVideo
          case MODULE_TABLE:
            return schemaTable
          default:
            break
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
  content: Yup.string().required('Vui lòng nhập đoạn văn bản'),
  isBold: Yup.boolean(),
  isItalic: Yup.boolean()
})

const schemaImage = Yup.object().shape({
  id: Yup.string(),
  image: Yup.string().required('Vui lòng chọn ảnh'),
  description: Yup.string()
})

const schemaVideo = Yup.object().shape({
  id: Yup.string(),
  url: Yup.string().required('Vui lòng nhập link youtube'),
  description: Yup.string()
})

const schemaTable = Yup.object().shape({
  id: Yup.string(),
  hasHeader: Yup.boolean(),
  tableHead: Yup.array(Yup.string()),
  tableRow: Yup.array(Yup.array(Yup.string()))
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
          content: '',
          isBold: '',
          isItalic: ''
        })
      case MODULE_IMAGE:
        return ({
          image: '',
          description: ''
        })
      case MODULE_VIDEO:
        return ({
          url: '',
          description: ''
        })
      case MODULE_TABLE:
        return ({
          hasHeader: '',
          tableHead: '',
          tableRow: ''
        })
      default: break
    }
  })
}
