<template>
  <div class="wrapper-content">
    <side-bar />
    <form class="main-area" :class="[{ 'hide': !drawer }]" @submit.prevent="handleForm">
      <div :class="[{ 'point-event': isLoading }, 'paper']">
        <h2 class="px-5">Quản lý tài khoản doanh nghiệp</h2>
        <div class="paper-content">
          <div class="status-notify" v-if="status === 'pending'">
            <p>Mẫu đã được gửi, vui lòng chờ phê duyệt</p>
          </div>
          <div class="status-notify alert" v-if="status === 'refused'">
            <p>Mẫu của bạn đã không được phê duyệt! <span @click="handleDeleteRequest">Gửi lại mẫu khác</span></p>
          </div>
          <div class="notice-container">
            <p>Chức năng này chỉ dành cho tài khoản Doanh nghiệp. Để nâng cấp tài khoản của bạn thành tài khoản Doanh
              nghiệp, vui lòng cung cấp các thông tin dưới đây.</p>
          </div>
          <h3>Thông tin doanh nghiệp</h3>
          <v-row class="mt-1 mb-5">
            <v-col cols="12" class="pb-0">
              <p class="txt-label txt-highlight">Logo công ty <span>*</span></p>
              <input accept="image/*,.heic" type="file" autocomplete="off" tabindex="-1" style="display: none;"
                ref="fileInput" @change="onFileSelected">
              <div v-if="values.avatar" class="img-upload-place">
                <img :src="values.avatar" alt="avatar" class="avatar-img">
                <div class="close-btn" @click="handleDeleteAvatar">
                  <icon-closewb />
                </div>
              </div>
              <template v-else>
                <div class="img-upload-place" @click="selectFiles" @dragover.prevent="onDragOver"
                  @dragleave.prevent="onDragLeave" @drop.prevent="onDrop">
                  <icon-camera />
                  <p class="mb-0">Tải ảnh</p>
                </div>
                <p v-if="errors.avatar" class="warning-txt">{{ errors.avatar }}</p>
              </template>
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col cols="12" sm="6" class="pb-0">
              <p class="txt-label txt-highlight">Tên công ty <span>*</span></p>
              <v-text-field dense outlined v-model="values.name" :error-messages="errors.name"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="pb-0">
              <p class="txt-label txt-highlight">Số điện thoại <span>*</span></p>
              <v-text-field dense outlined type="number" hide-spin-buttons v-model="values.phoneNumber"
                :error-messages="errors.phoneNumber"></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col cols="12" sm="6" class="pb-0">
              <p class="txt-label txt-highlight">Tỉnh, thành phố <span>*</span></p>
              <v-combobox placeholder="Chọn" dense outlined :items="cityItem.map(item => item.name)"
                v-model="values.city" :error-messages="errors.city" @change="onChangeCity"></v-combobox>
            </v-col>
            <v-col cols="12" sm="6" class="pb-0">
              <p class="txt-label txt-highlight">Quận, huyện <span>*</span></p>
              <v-combobox placeholder="Chọn" dense outlined :items="districtItem.map(item => item.name)"
                v-model="values.district" :error-messages="errors.district" @change="onChangeDistrict"></v-combobox>
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col cols="12" sm="6" class="pb-0">
              <p class="txt-label txt-highlight">Phường, xã <span>*</span></p>
              <v-combobox placeholder="Chọn" dense outlined :items="wardItem.map(item => item.name)"
                v-model="values.ward" :error-messages="errors.ward"></v-combobox>
            </v-col>
            <v-col cols="12" sm="6" class="pb-0">
              <p class="txt-label txt-highlight">Đường, phố</p>
              <v-text-field placeholder="Chọn" dense outlined v-model="values.street"
                :error-messages="errors.street"></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-0 pb-3">
            <v-col class="pb-0">
              <p class="txt-label txt-highlight">Giới thiệu <span>*</span></p>
              <v-textarea placeholder="Nhập lời giới thiệu của nhà môi giới" dense outlined rows="6" no-resize
                v-model="values.description" :error-messages="errors.description"></v-textarea>
              <p class="txt-description">Tối thiểu 30 ký tự, tối đa 3.000 ký tự</p>
            </v-col>
          </v-row>
          <h3>Khu vực môi giới</h3>
          <div v-for="(item, idx) in values.scope" :key="idx">
            <div class="title-dynamic">
              <h4>Khu vực {{ idx + 1 }}</h4>
              <div>
                <button v-if="idx !== 0" @click="() => handleRemove(idx)" type="button">
                  <icon-minus />
                </button>
                <button @click="() => handleAdd(idx)" type="button">
                  <icon-plus />
                </button>
              </div>
            </div>
            <v-row class="mt-0">
              <v-col cols="12" sm="6" class="pb-0">
                <p class="txt-label txt-highlight">Loại giao dịch <span>*</span></p>
                <v-select placeholder="Chọn" dense outlined :items="typePropertyItem" item-text="label"
                  item-value="value" v-model="item['typeProperty']" :error-messages="errors.scope[idx].typeProperty"
                  @change="() => handleChangeType(idx)"></v-select>
              </v-col>
              <v-col cols="12" sm="6" class="pb-0">
                <p class="txt-label txt-highlight">Loại nhà đất <span>*</span></p>
                <v-select placeholder="Chọn" dense outlined
                  :items="[...defaultType, ...(item['typeProperty'] ? (item['typeProperty'] === 'sale' ? saleItem : rentItem) : [])]"
                  item-text="label" item-value="value" v-model="item['type']"
                  :error-messages="errors.scope[idx].type"></v-select>
              </v-col>
            </v-row>
            <v-row class="mt-0">
              <v-col cols="12" sm="6" class="pb-0">
                <p class="txt-label txt-highlight">Tỉnh, thành phố <span>*</span></p>
                <v-combobox placeholder="Chọn" dense outlined :items="cityItem.map(item => item.name)"
                  v-model="item['city']" :error-messages="errors.scope[idx].city"
                  @change="() => onChangeCitySub(idx)"></v-combobox>
              </v-col>
              <v-col cols="12" sm="6" class="pb-0">
                <p class="txt-label txt-highlight">Quận, huyện <span>*</span></p>
                <v-combobox placeholder="Chọn" dense outlined :items="subSelector.map(item => item.name)"
                  v-model="item['district']" :error-messages="errors.scope[idx].district"
                  @click="() => handleSelectDistrictSub(idx)"></v-combobox>
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
      <div class="paper sticky-wrapper">
        <button type="submit" class="btn-submit"
          :class="[{ 'disabled-btn': status === 'pending' || status === 'refused' }]"
          :disabled="status === 'pending' || status === 'refused'">Đăng ký</button>
      </div>
    </form>
    <v-progress-circular indeterminate class="loading" v-if="isLoading"></v-progress-circular>
  </div>
</template>

<script>
import { UPLOAD_PRESET, CLOUD_NAME } from '@/consts/cloudinary'
import SideBar from '@/components/SideBar'
import * as Yup from 'yup'
import { setNestedProperty } from '@/helpers/arrayHandler'
import { PROPSSALETYPE, PROPSRENTTYPE } from '@/consts/propstype'

const scopeSchema = Yup.object().shape({
  typeProperty: Yup.string().required('Vui lòng chọn loại giao dịch'),
  type: Yup.string().required('Vui lòng chọn loại nhà đất'),
  city: Yup.string().required('Vui lòng chọn tỉnh, thành phố'),
  district: Yup.string().required('Vui lòng chọn quận, huyện')
})

const schema = Yup.object().shape({
  avatar: Yup.string().required('Vui lòng tải lên logo công ty'),
  name: Yup.string().required('Vui lòng điền tên công ty'),
  phoneNumber: Yup.string().required('Vui lòng điền số điện thoại'),
  city: Yup.string().required('Vui lòng chọn tỉnh, thành phố'),
  district: Yup.string().required('Vui lòng chọn quận, huyện'),
  ward: Yup.string().required('Vui lòng chọn phường, xã'),
  street: Yup.string(),
  description: Yup.string().required('Vui lòng nhập lời giới thiệu'),
  scope: Yup.array().of(scopeSchema)
})
export default {
  components: { SideBar },
  data() {
    return {
      isDragging: false,
      subSelector: [],
      typePropertyItem: [
        {
          label: 'Loại giao dịch',
          value: ''
        },
        {
          label: 'Nhà đất bán',
          value: 'sale'
        },
        {
          label: 'Nhà đất cho thuê',
          value: 'rent'
        }
      ],
      defaultType: [
        {
          label: 'Loại nhà đất',
          value: ''
        }
      ],
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
      values: {
        avatar: '',
        name: '',
        phoneNumber: '',
        city: '',
        district: '',
        ward: '',
        street: '',
        description: '',
        scope: [{
          typeProperty: '',
          type: '',
          city: '',
          district: '',
          code: ''
        }]
      },
      errors: {
        avatar: '',
        name: '',
        phoneNumber: '',
        city: '',
        district: '',
        ward: '',
        street: '',
        description: '',
        scope: [{
          typeProperty: '',
          type: '',
          city: '',
          district: ''
        }]
      },
      status: ''
    }
  },
  computed: {
    isLoading: {
      get() {
        return this.$store.getters['contact/isLoading']
      }
    },
    drawer: {
      get() {
        return this.$store.getters['user/drawer']
      }
    },
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
    contactUser: {
      get() {
        return this.$store.getters['contact/contactUser']
      }
    }
  },
  watch: {
    contactUser() {
      if (this.contactUser.type === 'doanh-nghiep') {
        this.values.avatar = this.contactUser.avatar
        this.values.name = this.contactUser.name
        this.values.phoneNumber = this.contactUser.phoneNumber
        this.values.city = this.contactUser.city
        this.values.district = this.contactUser.district
        this.values.ward = this.contactUser.ward
        this.values.street = this.contactUser.street
        this.values.description = this.contactUser.description
        this.values.scope = this.contactUser.scope.map(item => ({
          ...item,
          code: ''
        }))
        this.errors.scope = this.contactUser.scope.map(() => ({
          typeProperty: '',
          type: '',
          city: '',
          district: ''
        }))
        this.status = this.contactUser.status
      }
    }
  },
  async created() {
    await this.$store.dispatch('contact/getContactUser')
    await this.$store.dispatch('common/getCity')
  },
  methods: {
    onFileSelected(event) {
      const files = event.target.files
      if (files[0].type.split('/')[0] === 'image') {
        const post = new FormData()
        post.append('file', files[0])
        post.append('upload_preset', UPLOAD_PRESET)
        post.append('cloud_name', CLOUD_NAME)
        this.$store.dispatch('user/postImg', post).then(
          (res) => {
            this.values.avatar = res.url
          }
        )
      }
    },
    handleDeleteRequest() {
      this.$store.dispatch('contact/deleteRequestAgency')
    },
    handleDeleteAvatar() {
      this.values.avatar = ''
    },
    selectFiles() {
      this.$refs.fileInput.click()
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
        const post = new FormData()
        post.append('file', files[0])
        post.append('upload_preset', UPLOAD_PRESET)
        post.append('cloud_name', CLOUD_NAME)
        this.$store.dispatch('user/postImg', post).then(
          (res) => {
            this.values.avatar = res.url
          }
        )
        return
      }
    },
    handleForm() {
      this.errors = {
        avatar: '',
        name: '',
        phoneNumber: '',
        city: '',
        district: '',
        ward: '',
        street: '',
        description: '',
        scope: this.errors.scope.map(() => ({
          typeProperty: '',
          type: '',
          city: '',
          district: ''
        }))
      }
      schema.validate(this.values, { abortEarly: false })
        .then(() => {
          if (this.status) {
            this.$store.dispatch('contact/updateAgency', {
              avatar: this.values.avatar,
              name: this.values.name,
              phoneNumber: this.values.phoneNumber,
              city: this.values.city,
              district: this.values.district,
              ward: this.values.ward,
              street: this.values.street,
              description: this.values.description,
              scope: this.values.scope.map(item => ({
                typeProperty: item.typeProperty,
                type: item.type,
                city: item.city,
                district: item.district
              }))
            }).then(() => {
              location.reload()
            })
          } else {
            this.$store.dispatch('contact/registerEnterprise', {
              avatar: this.values.avatar,
              name: this.values.name,
              phoneNumber: this.values.phoneNumber,
              city: this.values.city,
              district: this.values.district,
              ward: this.values.ward,
              street: this.values.street,
              description: this.values.description,
              scope: this.values.scope.map(item => ({
                typeProperty: item.typeProperty,
                type: item.type,
                city: item.city,
                district: item.district
              })),
              createdAt: new Date()
            })
              .then(() => {
                location.reload()
              })
          }
        })
        .catch((err) => {
          err.inner.forEach(error => {
            setNestedProperty(this.errors, error.path, error.message)
          })
        })
    },
    async onChangeCity(input) {
      this.values.district = ''
      this.values.ward = ''
      this.values.street = ''
      const code = this.cityItem.find(item => item.name === input).code
      await this.$store.dispatch('common/getDistrict', code)
    },
    async onChangeDistrict(input) {
      this.values.ward = ''
      this.values.street = ''
      const code = this.districtItem.find(item => item.name === input).code
      await this.$store.dispatch('common/getWard', code)
    },
    handleAdd(idx) {
      this.values.scope.splice(idx + 1, 0, {
        typeProperty: '',
        type: '',
        city: '',
        code: '',
        district: ''
      })
      this.errors.scope.splice(idx + 1, 0, {
        typeProperty: '',
        type: '',
        city: '',
        district: ''
      })
    },
    handleRemove(idx) {
      this.values.scope.splice(idx, 1)
      this.errors.scope.splice(idx, 1)
    },
    handleChangeType(idx) {
      this.values.scope[idx].type = ''
    },
    onChangeCitySub(idx) {
      const code = this.cityItem.find(item => item.name === this.values.scope[idx].city).code
      this.values.scope[idx].district = ''
      this.values.scope[idx].code = code
    },
    async handleSelectDistrictSub(idx) {
      this.subSelector = await this.$store.dispatch('common/getFlexibleDistrict', this.values.scope[idx].code)
    }
  }
}
</script>

<style scoped>
* {
  font-family: 'Roboto-Regular', sans-serif;
}

h2 {
  font-family: 'Lexend-Medium', sans-serif;
  font-weight: 400;
}

.status-notify p {
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: rgb(44, 44, 44);
}

.wrapper-content {
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
}

.hide {
  width: 100vw;
}

.paper {
  width: 696px;
  padding-top: 24px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 4px;
  border-radius: 4px;
}

.notice-container {
  margin-bottom: 12px;
  padding: 16px 24px;
  border-radius: 4px;
  background-color: rgb(242, 242, 242);
}

.paper-content {
  padding: 20px;
}

.notice-container p {
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: rgb(44, 44, 44);
}

.sticky-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
  padding: 8px 24px;
  position: sticky;
  bottom: 0px;
  z-index: 7;
}

.btn-submit {
  height: 40px;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  width: fit-content;
  letter-spacing: -0.2px;
  background-color: rgb(224, 60, 49);
  padding: 6px 12px;
  color: rgb(255, 255, 255);
  opacity: 1;
  transition: all .3s ease;
}

.btn-submit:hover {
  opacity: .7;
}

.disabled-btn {
  opacity: .7;
}

.txt-label {
  margin-bottom: 8px;
  color: rgb(44, 44, 44);
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
}

.txt-highlight span {
  color: red;
}

.img-upload-place {
  position: relative;
  margin: auto;
  border: 1px dashed rgb(204, 204, 204);
  border-radius: 100%;
  width: 128px;
  height: 128px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgb(153, 153, 153);
  cursor: pointer;
  background-color: rgb(250, 250, 250);
}

.avatar-img {
  margin: auto;
  border-radius: 100%;
  width: 128px;
  height: 128px;
  object-fit: cover;
  cursor: default;
}

.alert {
  border: 1px solid red;
  background: #FFECEB;
}

.alert span {
  color: red;
  text-decoration: underline;
  cursor: pointer;
}

.status-notify {
  margin-bottom: 16px;
  background-color: rgb(255, 248, 231);
  padding: 12px 16px;
  box-shadow: rgba(44, 44, 44, 0.04) 0px 4px 6px;
  border-radius: 8px;
  border: 1px solid rgb(252, 180, 10);
}

.warning-txt {
  color: rgb(224, 60, 49);
  margin-top: 8px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  text-align: center;
}

.close-btn {
  position: absolute;
  top: 2px;
  right: 2px;
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

.title-dynamic {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.loading {
  position: absolute;
  top: 50%;
  left: calc(50% + 115px);
  transform: translate(-50%, -50%)
}

.point-event {
  filter: blur(1px);
  pointer-events: none;
}
</style>
