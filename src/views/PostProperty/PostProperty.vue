<template>
  <div class="content">
    <side-bar />
    <form @submit.prevent="handleSubmit" class="main-area" :class="[{ 'hide': !drawer }]">
      <div class="paper">
        <h2>Thông tin cơ bản</h2>
        <div class="btn-tab">
          <div :class="{ 'active': type === 'sale' }" @click="onChangeType('sale')">
            Bán
          </div>
          <div :class="{ 'active': type === 'rent' }" @click="onChangeType('rent')">
            Cho thuê
          </div>
        </div>
        <p class="txt-label">Loại bất động sản <span>*</span></p>
        <v-select placeholder="VD: Nhà riêng" dense outlined :items="type === 'sale' ? saleItem : rentItem"
          v-model="propertyType" item-text="label" item-value="value"></v-select>
        <v-row>
          <v-col class="col-form" cols="12" sm="6">
            <p class="txt-label">Tỉnh, thành phố <span>*</span></p>
            <v-combobox placeholder="Chọn" dense outlined :items="cityItem.map(item => item.name)" v-model="city"
              @change="onChangeCity"></v-combobox>
          </v-col>
          <v-col class="col-form" cols="12" sm="6">
            <p class="txt-label">Quận, huyện <span>*</span></p>
            <v-combobox placeholder="Chọn" dense outlined :items="districtItem.map(item => item.name)"
              v-model="district" @change="onChangeDistrict"></v-combobox>
          </v-col>
        </v-row>
        <v-row class="row-pos">
          <v-col class="col-form" cols="12" sm="6">
            <p class="txt-label">Phường, xã <span>*</span></p>
            <v-combobox placeholder="Chọn" dense outlined :items="wardItem.map(item => item.name)"
              v-model="ward"></v-combobox>
          </v-col>
          <v-col class="col-form" cols="12" sm="6">
            <p class="txt-label">Đường, phố</p>
            <v-combobox placeholder="Chọn" dense outlined v-model="street"></v-combobox>
          </v-col>
        </v-row>
        <p class="txt-label">Dự án</p>
        <v-combobox placeholder="Chọn" dense outlined v-model="project"></v-combobox>
        <p class="txt-label">Địa chỉ hiển thị trên tin đăng <span>*</span></p>
        <v-text-field placeholder="Bạn có thể bổ sung hẻm, ngách, ngõ..." dense outlined
          v-model="moreInfo"></v-text-field>
      </div>
      <div class="paper">
        <h2>Thông tin bài viết</h2>
        <p class="txt-label mt-4">Tiêu đề <span>*</span></p>
        <v-textarea placeholder="VD: Bán nhà riêng 50m2 chính chủ tại Cầu Giấy" dense outlined rows="2" no-resize
          v-model="title"></v-textarea>
        <p class="txt-description">Tối thiểu 30 ký tự, tối đa 99 ký tự</p>
        <p class="txt-label">Mô tả <span>*</span></p>
        <v-textarea
          placeholder="Nhập mô tả chung về bất động sản của bạn. Ví dụ: Khu nhà có vị trí thuận lợi, gần công viên, gần trường học ... "
          dense outlined rows="6" no-resize v-model="description"></v-textarea>
        <p class="txt-description">Tối thiểu 30 ký tự, tối đa 3.000 ký tự</p>
      </div>
      <div class="paper">
        <h2>Thông tin bất động sản</h2>
        <p class="txt-label mt-4">Diện tích <span>*</span></p>
        <v-text-field placeholder="Nhập diện tích, VD 80" dense outlined type="number" v-model="area"
          hide-spin-buttons></v-text-field>
        <v-row class="row-pos">
          <v-col class="col-form" cols="12" sm="8">
            <p class="txt-label">Mức giá <span>*</span></p>
            <v-text-field placeholder="Nhập giá, VD 12000000" dense outlined type="number" v-model="price"
              hide-spin-buttons></v-text-field>
          </v-col>
          <v-col class="col-form" cols="12" sm="4">
            <p class="txt-label">Đơn vị</p>
            <v-select dense outlined :items="priceTypeItem" v-model="priceType"></v-select>
          </v-col>
        </v-row>
      </div>
      <div class="paper">
        <h2>Hình ảnh & Video</h2>
        <input accept="image/*,.heic" multiple="" type="file" autocomplete="off" tabindex="-1" style="display: none;"
          ref="fileInput" @change="onFileSelected">
        <div class="img-upload-place" @click="selectFiles" @dragover.prevent="onDragOver"
          @dragleave.prevent="onDragLeave" @drop.prevent="onDrop">
          <icon-imageuploader />
          <p class="txt-upload-primary">Bấm để chọn ảnh cần tải lên</p>
          <p class="txt-upload-secondary">hoặc kéo thả ảnh vào đây</p>
        </div>
        <div v-if="images.length" class="img-preview">
          <div class="image-item" v-for="(image, index) in images" :key="index">
            <div class="img-holder">
              <img :src="image.url" :alt="image.name" />
              <div class="close-btn" @click="deleteImg(index)">
                <icon-closewb />
              </div>
            </div>
            <v-text-field placeholder="Thêm mô tả" hide-details="true" dense outlined class="mt-2"
              v-model="image.description"></v-text-field>
          </div>
        </div>
        <v-expansion-panels class="mt-2">
          <v-expansion-panel>
            <v-expansion-panel-header>
              <div class="collapse-header">
                <icon-mediaplay />
                Thêm video từ Youtube hoặc Tiktok
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-text-field placeholder="Dán đường dẫn Youtube hoặc Tiktok" hide-details="true" dense outlined
                v-model="url"></v-text-field>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <div class="paper">
        <h2>Thông tin liên hệ</h2>
        <v-row class="row-pos">
          <v-col class="col-form" cols="12" sm="6">
            <p class="txt-label mt-4">Tên liên hệ <span>*</span></p>
            <v-text-field placeholder="Nhập tên" dense outlined v-model="name"></v-text-field>
          </v-col>
          <v-col class="col-form" cols="12" sm="6">
            <p class="txt-label mt-4">Số điện thoại <span>*</span></p>
            <v-text-field placeholder="Nhập số điện thoại" dense outlined type="number" v-model="phoneNumber"
              hide-spin-buttons></v-text-field>
          </v-col>
        </v-row>
        <v-row class="row-pos">
          <v-col class="col-form" cols="12" sm="6">
            <p class="txt-label mt-4">Email</p>
            <v-text-field placeholder="Nhập email" dense outlined type="email" v-model="email"></v-text-field>
          </v-col>
        </v-row>
      </div>
      <div class="paper sticky-wrapper">
        <button type="submit" class="btn-submit">Đăng tin <icon-rightarrowwc /></button>
        <p>{{ errorMessage }}</p>
      </div>
    </form>
  </div>
</template>

<script>
import { PROPSSALETYPE, PROPSRENTTYPE } from '../../consts/propstype'
import SideBar from '../../components/SideBar'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import * as Yup from 'yup'
export default {
  components: {
    SideBar,
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      type: 'sale',
      propertyType: '',
      city: '',
      district: '',
      ward: '',
      street: '',
      project: '',
      moreInfo: '',
      title: '',
      description: '',
      area: '',
      price: '',
      priceType: 'VND',
      images: [],
      url: '',
      name: '',
      email: '',
      phoneNumber: '',
      isDragging: false,
      errorMessage: '',
      saleItem: [
        {
          label: PROPSSALETYPE.canho.primaryLabel,
          value: PROPSSALETYPE.canho.code
        },
        {
          label: PROPSSALETYPE.nharieng.primaryLabel,
          value: PROPSSALETYPE.nharieng.code
        },
        {
          label: PROPSSALETYPE.bietthu.primaryLabel,
          value: PROPSSALETYPE.bietthu.code
        },
        {
          label: PROPSSALETYPE.nhamatpho.primaryLabel,
          value: PROPSSALETYPE.nhamatpho.code
        },
        {
          label: PROPSSALETYPE.shophouse.primaryLabel,
          value: PROPSSALETYPE.shophouse.code
        },
        {
          label: PROPSSALETYPE.duan.primaryLabel,
          value: PROPSSALETYPE.duan.code
        },
        {
          label: PROPSSALETYPE.dat.primaryLabel,
          value: PROPSSALETYPE.dat.code
        },
        {
          label: PROPSSALETYPE.trangtrai.primaryLabel,
          value: PROPSSALETYPE.trangtrai.code
        },
        {
          label: PROPSSALETYPE.condotel.primaryLabel,
          value: PROPSSALETYPE.condotel.code
        },
        {
          label: PROPSSALETYPE.kho.primaryLabel,
          value: PROPSSALETYPE.kho.code
        },
        {
          label: PROPSSALETYPE.khac.primaryLabel,
          value: PROPSSALETYPE.khac.code
        }
      ],
      rentItem: [
        {
          label: PROPSRENTTYPE.canho.primaryLabel,
          value: PROPSRENTTYPE.canho.code
        },
        {
          label: PROPSRENTTYPE.nharieng.primaryLabel,
          value: PROPSRENTTYPE.nharieng.code
        },
        {
          label: PROPSRENTTYPE.bietthu.primaryLabel,
          value: PROPSRENTTYPE.bietthu.code
        },
        {
          label: PROPSRENTTYPE.nhamatpho.primaryLabel,
          value: PROPSRENTTYPE.nhamatpho.code
        },
        {
          label: PROPSRENTTYPE.shophouse.primaryLabel,
          value: PROPSRENTTYPE.shophouse.code
        },
        {
          label: PROPSRENTTYPE.nhatro.primaryLabel,
          value: PROPSRENTTYPE.nhatro.code
        },
        {
          label: PROPSRENTTYPE.vanphong.primaryLabel,
          value: PROPSRENTTYPE.vanphong.code
        },
        {
          label: PROPSRENTTYPE.cuahang.primaryLabel,
          value: PROPSRENTTYPE.cuahang.code
        },
        {
          label: PROPSRENTTYPE.kho.primaryLabel,
          value: PROPSRENTTYPE.kho.code
        },
        {
          label: PROPSRENTTYPE.khac.primaryLabel,
          value: PROPSRENTTYPE.khac.code
        }
      ],
      priceTypeItem: [
        'VND',
        'Giá / m²',
        'Thỏa thuận'
      ]
    }
  },
  computed: {
    cityItem: {
      get() {
        return this.$store.getters['common/city']
      }
    },
    districtItem: {
      get() {
        return this.$store.getters['common/district']
      }
    },
    wardItem: {
      get() {
        return this.$store.getters['common/ward']
      }
    },
    drawer: {
      get() {
        return this.$store.getters['user/drawer']
      }
    }
  },
  async created() {
    await this.$store.dispatch('common/getCity')
  },
  methods: {
    onChangeType(typechange) {
      this.type = typechange
    },
    async onChangeCity(input) {
      this.district = ''
      this.ward = ''
      this.street = ''
      const code = this.cityItem.find(item => item.name === input).code
      await this.$store.dispatch('common/getDistrict', code)
    },
    async onChangeDistrict(input) {
      this.ward = ''
      this.street = ''
      const code = this.districtItem.find(item => item.name === input).code
      await this.$store.dispatch('common/getWard', code)
    },
    selectFiles() {
      this.$refs.fileInput.click()
    },
    onFileSelected(event) {
      const files = event.target.files
      // eslint-disable-next-line no-useless-return
      if (files.length === 0) return
      for (const element of files) {
        if (element.type.split('/')[0] !== 'image') continue
        if (!this.images.some(e => e.name === element.name)) {
          const post = new FormData()
          post.append('file', element)
          post.append('upload_preset', 'nucez74c')
          post.append('cloud_name', 'dadyvbcci')
          this.$store.dispatch('properties/postImg', post).then(
            (res) => {
              this.images.push({ name: element.name, url: res.url, description: '' })
            }
          )
        }
      }
    },
    deleteImg(idx) {
      this.images.splice(idx, 1)
    },
    onDragOver(event) {
      event.preventDefault()
      this.isDragging = true
      event.dataTransfer.dropEffect = 'copy'
    },
    onDragLeave(event) {
      event.preventDefault()
      this.isDragging = false
    },
    onDrop(event) {
      event.preventDefault()
      this.isDragging = false
      const files = event.dataTransfer.files
      for (const element of files) {
        if (element.type.split('/')[0] !== 'image') continue
        if (!this.images.some(e => e.name === element.name)) {
          const post = new FormData()
          post.append('file', element)
          post.append('upload_preset', 'nucez74c')
          post.append('cloud_name', 'dadyvbcci')
          this.$store.dispatch('properties/postImg', post).then(
            (res) => {
              this.images.push({ name: element.name, url: res.url, description: '' })
            }
          )
        }
      }
    },
    handleSubmit() {
      const schema = Yup.object().shape({
        type: Yup.string().required(),
        propertyType: Yup.string().required('Vui lòng chọn loại bất động sản'),
        city: Yup.string().required('Vui lòng chọn tỉnh, thành phố'),
        district: Yup.string().required('Vui lòng chọn quận, huyện'),
        ward: Yup.string().required('Vui lòng chọn phường, xã'),
        street: Yup.string(),
        project: Yup.string(),
        moreInfo: Yup.string().required('Vui lòng nhập địa chỉ hiển thị'),
        title: Yup.string().min(30, 'Tiêu đề tối thiểu 30 ký tự').max(99, 'Tiêu đề không quá 99 ký tự').required('Vui lòng nhập tiêu đề'),
        description: Yup.string().min(30, 'Mô tả tối thiểu 30 ký tự').max(3000, 'Mô tả không vượt quá 3000 ký tự').required('Vui lòng nhập mô tả'),
        area: Yup.number().required('Vui lòng nhập diện tích'),
        price: Yup.number().required('Vui lòng nhập mức giá'),
        priceType: Yup.string().required('Vui lòng nhập đơn vị'),
        images: Yup.array().min(1, 'Tối thiểu 1 ảnh'),
        url: Yup.string(),
        name: Yup.string().required('Vui lòng nhập tên liên lạc'),
        phoneNumber: Yup.number().required('Vui lòng nhập số điện thoại'),
        email: Yup.string().email()
      })
      schema.validate(
        {
          type: this.type,
          propertyType: this.propertyType,
          city: this.city,
          district: this.district,
          ward: this.ward,
          street: this.street,
          project: this.project,
          moreInfo: this.moreInfo,
          title: this.title,
          description: this.description,
          area: Number(this.area) ? Number(this.area) : undefined,
          price: Number(this.price) ? Number(this.price) : undefined,
          priceType: this.priceType,
          images: this.images,
          url: this.url,
          name: this.name,
          phoneNumber: Number(this.phoneNumber) ? Number(this.phoneNumber) : undefined,
          email: this.email
        }
      )
        .then(() => {
          this.errorMessage = ''
          this.$store.dispatch('properties/postProperties', {
            type: this.type,
            propertyType: this.propertyType,
            city: this.city,
            district: this.district,
            ward: this.ward,
            street: this.street,
            project: this.project,
            moreInfo: this.moreInfo,
            title: this.title,
            description: this.description,
            area: Number(this.area),
            price: Number(this.price),
            priceType: this.priceType,
            images: this.images,
            url: this.url,
            name: this.name,
            phoneNumber: this.phoneNumber,
            email: this.email,
            user: localStorage.getItem('username'),
            createdAt: new Date()
          })
          // .then(() => {
          //   if (this.errRegister === '') {
          //     this.loginDialog = true
          //   }
          // })
        })
        .catch((err) => {
          this.errorMessage = err.toString().split(':')[1]
        })
    }
  }
}
</script>

<style scoped>
.content {
  display: flex;
}

.main-area {
  overflow: auto;
  height: calc(100vh - 72px);
  background-color: rgb(249, 249, 249);
  width: calc(100vw - 256px);
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.hide {
  width: 100vw;
}

.paper {
  width: 696px;
  padding: 24px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 4px;
  border-radius: 4px;
}

.sticky-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
  padding: 8px 24px;
  position: sticky;
  bottom: 0px;
  z-index: 10;
}

.sticky-wrapper p {
  color: red;
  margin: 0;
}

.btn-tab {
  margin-top: 16px;
  margin-bottom: 24px;
  width: 100%;
  display: flex;
}

.btn-tab div {
  height: 32px;
  width: 50%;
  color: #999;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #fff;
  border-radius: 4px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-tab :first-child {
  margin-right: -1px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.btn-tab :last-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.active {
  color: #fff !important;
  background: #505050 !important;
  border-color: #505050 !important;
}

.txt-label {
  margin-bottom: 8px;
  color: rgb(44, 44, 44);
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
}

.txt-description {
  margin-top: -10px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  color: rgb(80, 80, 80);
}

.txt-label span {
  color: red;
}

.col-form {
  padding: 0 12px;
}

.row-pos {
  margin-top: 0;
}

.img-upload-place {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  width: 100%;
  height: 138px;
  border: 1px dashed rgb(242, 242, 242);
  cursor: pointer;
}

.txt-upload-primary {
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: rgb(44, 44, 44);
  margin: 0;
}

.txt-upload-secondary {
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: rgb(153, 153, 153);
  margin: 0;
}

.img-preview {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
}

.image-item {
  width: calc(100% / 3);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 4px 16px 4px;
}

.img-holder {
  position: relative;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(64px);
  height: 100%;
  border-radius: 2px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
  border: 1px solid rgb(204, 204, 204);
}

.image-item img {
  max-width: -webkit-fill-available;
  height: 120px;
  object-fit: cover;
}

.btn-submit {
  display: flex;
  align-items: center;
  gap: 2px;
  height: 48px;
  border-radius: 8px;
  cursor: pointer;
  background-color: rgb(224, 60, 49);
  padding: 12px 8px 12px 16px;
  color: rgb(255, 255, 255);
  opacity: 1;
  border: none;
  transition: opacity .2s ease;
}

.btn-submit:hover {
  opacity: .7;
}

.collapse-header {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
