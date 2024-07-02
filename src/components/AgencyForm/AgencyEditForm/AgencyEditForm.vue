<template>
  <form @submit.prevent="handleAgencyForm">
    <div class="form-edit">
      <h3>Thông tin môi giới</h3>
      <v-row class="mt-1 mb-5">
        <v-col cols="12" class="pb-0">
          <p class="txt-label txt-highlight">Ảnh đại diện <span>*</span></p>
          <p class="notice-warning">
            Ảnh nên chụp nửa người phía trên, nhìn rõ mặt và thể hiện sự chuyên nghiệp của bạn
          </p>
          <input accept="image/*,.heic" type="file" autocomplete="off" tabindex="-1" style="display: none;"
            ref="fileInput" @change="onFileSelected">
          <div v-if="valuesAgency.avatar" class="img-upload-place">
            <img :src="valuesAgency.avatar" alt="avatar" class="avatar-img">
            <div class="close-btn" @click="handleDeleteAvatar">
              <icon-closewb />
            </div>
          </div>
          <template v-else>
            <div class="img-upload-place" @click="selectFiles" @dragover.prevent="onDragOver"
              @dragleave.prevent="onDragLeave" @drop.prevent="onDrop">
              <icon-camera />
              <p class="txt-upload-secondary mb-0">Tải ảnh</p>
            </div>
            <p v-if="errValuesAgency.avatar" class="warning-txt">{{ errValuesAgency.avatar }}</p>
          </template>
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col cols="12" sm="6" class="pb-0">
          <p class="txt-label txt-highlight">Họ và tên <span>*</span></p>
          <v-text-field dense outlined v-model="valuesAgency.name"
            :error-messages="errValuesAgency.name"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" class="pb-0">
          <p class="txt-label txt-highlight">Số điện thoại chính <span>*</span></p>
          <v-text-field dense outlined v-model="valuesAgency.phoneNumber" :error-messages="errValuesAgency.phoneNumber"
            type="number" hide-spin-buttons></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col cols="12" sm="6" class="pb-0">
          <p class="txt-label txt-highlight">Tỉnh, thành phố <span>*</span></p>
          <v-combobox placeholder="Chọn" dense outlined :items="cityItem.map(item => item.name)"
            v-model="valuesAgency.city" :error-messages="errValuesAgency.city" @change="onChangeCity"></v-combobox>
        </v-col>
        <v-col cols="12" sm="6" class="pb-0">
          <p class="txt-label txt-highlight">Quận, huyện <span>*</span></p>
          <v-combobox placeholder="Chọn" dense outlined :items="districtItem.map(item => item.name)"
            v-model="valuesAgency.district" :error-messages="errValuesAgency.district"
            @change="onChangeDistrict"></v-combobox>
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col cols="12" sm="6" class="pb-0">
          <p class="txt-label txt-highlight">Phường, xã <span>*</span></p>
          <v-combobox placeholder="Chọn" dense outlined :items="wardItem.map(item => item.name)"
            v-model="valuesAgency.ward" :error-messages="errValuesAgency.ward"></v-combobox>
        </v-col>
        <v-col cols="12" sm="6" class="pb-0">
          <p class="txt-label txt-highlight">Đường, phố</p>
          <v-text-field placeholder="Chọn" dense outlined v-model="valuesAgency.street"
            :error-messages="errValuesAgency.street"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-0 pb-3">
        <v-col class="pb-0">
          <p class="txt-label txt-highlight">Giới thiệu <span>*</span></p>
          <v-textarea placeholder="Nhập lời giới thiệu của nhà môi giới" dense outlined rows="6" no-resize
            v-model="valuesAgency.description" :error-messages="errValuesAgency.description"></v-textarea>
          <p class="txt-description">Tối thiểu 30 ký tự, tối đa 3.000 ký tự</p>
        </v-col>
      </v-row>
      <h3>Khu vực môi giới</h3>
      <div v-for="(item, idx) in valuesAgency.scope" :key="idx">
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
            <v-select placeholder="Chọn" dense outlined :items="typePropertyItem" item-text="label" item-value="value"
              v-model="item['typeProperty']" :error-messages="errValuesAgency.scope[idx].typeProperty"
              @change="() => handleChangeType(idx)"></v-select>
          </v-col>
          <v-col cols="12" sm="6" class="pb-0">
            <p class="txt-label txt-highlight">Loại nhà đất <span>*</span></p>
            <v-select placeholder="Chọn" dense outlined
              :items="[...defaultType, ...(item['typeProperty'] ? (item['typeProperty'] === 'sale' ? saleItem : rentItem) : [])]"
              item-text="label" item-value="value" v-model="item['type']"
              :error-messages="errValuesAgency.scope[idx].type"></v-select>
          </v-col>
        </v-row>
        <v-row class="mt-0">
          <v-col cols="12" sm="6" class="pb-0">
            <p class="txt-label txt-highlight">Tỉnh, thành phố <span>*</span></p>
            <v-combobox placeholder="Chọn" dense outlined :items="cityItem.map(item => item.name)"
              v-model="item['city']" :error-messages="errValuesAgency.scope[idx].city"
              @change="() => onChangeCitySub(idx)"></v-combobox>
          </v-col>
          <v-col cols="12" sm="6" class="pb-0">
            <p class="txt-label txt-highlight">Quận, huyện <span>*</span></p>
            <v-combobox placeholder="Chọn" dense outlined :items="subSelector.map(item => item.name)"
              v-model="item['district']" :error-messages="errValuesAgency.scope[idx].district"
              @click="() => handleSelectDistrictSub(idx)"></v-combobox>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="paper sticky-wrapper">
      <button type="submit" class="btn-submit">Cập nhật</button>
    </div>
  </form>
</template>

<script>
import { UPLOAD_PRESET, CLOUD_NAME } from '@/consts/cloudinary'
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
  avatar: Yup.string().required('Vui lòng tải lên ảnh đại diện'),
  name: Yup.string().required('Vui lòng điền họ và tên'),
  phoneNumber: Yup.string().required('Vui lòng điền số điện thoại'),
  city: Yup.string().required('Vui lòng chọn tỉnh, thành phố'),
  district: Yup.string().required('Vui lòng chọn quận, huyện'),
  ward: Yup.string().required('Vui lòng chọn phường, xã'),
  street: Yup.string(),
  description: Yup.string().required('Vui lòng nhập lời giới thiệu'),
  scope: Yup.array().of(scopeSchema)
})

export default {
  props: {
    data: {
      type: Object,
      default: () => ({
        avatar: '',
        name: '',
        phoneNumber: ''
      })
    }
  },
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
      valuesAgency: {
        avatar: this.data.avatar,
        name: this.data.name,
        phoneNumber: this.data.phoneNumber,
        city: this.data.city,
        district: this.data.district,
        ward: this.data.ward,
        street: this.data.street,
        description: this.data.description,
        scope: this.data.scope.map(item => ({
          ...item,
          code: ''
        }))
      },
      errValuesAgency: {
        avatar: '',
        name: '',
        phoneNumber: '',
        city: '',
        district: '',
        ward: '',
        street: '',
        description: '',
        scope: this.data.scope.map(() => ({
          typeProperty: '',
          type: '',
          city: '',
          district: ''
        }))
      }
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
    }
  },
  async created() {
    await this.$store.dispatch('common/getCity')
  },
  methods: {
    async onChangeCity(input) {
      this.valuesAgency.district = ''
      this.valuesAgency.ward = ''
      this.valuesAgency.street = ''
      const code = this.cityItem.find(item => item.name === input).code
      await this.$store.dispatch('common/getDistrict', code)
    },
    async onChangeDistrict(input) {
      this.valuesAgency.ward = ''
      this.valuesAgency.street = ''
      const code = this.districtItem.find(item => item.name === input).code
      await this.$store.dispatch('common/getWard', code)
    },
    onFileSelected(event) {
      const files = event.target.files
      if (files[0].type.split('/')[0] === 'image') {
        const post = new FormData()
        post.append('file', files[0])
        post.append('upload_preset', UPLOAD_PRESET)
        post.append('cloud_name', CLOUD_NAME)
        this.$store.dispatch('user/postImg', post).then(
          (res) => {
            this.valuesAgency.avatar = res.url
          }
        )
      }
    },
    handleDeleteAvatar() {
      this.valuesAgency.avatar = ''
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
            this.valuesAgency.avatar = res.url
          }
        )
        return
      }
    },
    handleAgencyForm() {
      this.errValuesAgency = {
        avatar: '',
        name: '',
        phoneNumber: '',
        city: '',
        district: '',
        ward: '',
        street: '',
        description: '',
        scope: this.errValuesAgency.scope.map(() => ({
          typeProperty: '',
          type: '',
          city: '',
          district: ''
        }))
      }
      schema.validate(this.valuesAgency, { abortEarly: false })
        .then(() => {
          console.log(this.valuesAgency.street)
          this.$store.dispatch('contact/updateAgency', {
            avatar: this.valuesAgency.avatar,
            name: this.valuesAgency.name,
            phoneNumber: this.valuesAgency.phoneNumber,
            city: this.valuesAgency.city,
            district: this.valuesAgency.district,
            ward: this.valuesAgency.ward,
            street: this.valuesAgency.street,
            description: this.valuesAgency.description,
            scope: this.valuesAgency.scope.map(item => ({
              typeProperty: item.typeProperty,
              type: item.type,
              city: item.city,
              district: item.district
            }))
          })
            .then(() => {
              location.reload()
            })
        })
        .catch((err) => {
          err.inner.forEach(error => {
            setNestedProperty(this.errValuesAgency, error.path, error.message)
          })
        })
    },
    handleChangeType(idx) {
      this.valuesAgency.scope[idx].type = ''
    },
    onChangeCitySub(idx) {
      const code = this.cityItem.find(item => item.name === this.valuesAgency.scope[idx].city).code
      this.valuesAgency.scope[idx].district = ''
      this.valuesAgency.scope[idx].code = code
    },
    async handleSelectDistrictSub(idx) {
      this.subSelector = await this.$store.dispatch('common/getFlexibleDistrict', this.valuesAgency.scope[idx].code)
    },
    handleAdd(idx) {
      this.valuesAgency.scope.splice(idx + 1, 0, {
        typeProperty: '',
        type: '',
        city: '',
        code: '',
        district: ''
      })
      this.errValuesAgency.scope.splice(idx + 1, 0, {
        typeProperty: '',
        type: '',
        city: '',
        district: ''
      })
    },
    handleRemove(idx) {
      this.valuesAgency.scope.splice(idx, 1)
      this.errValuesAgency.scope.splice(idx, 1)
    }
  }
}
</script>

<style scoped>
* {
  font-family: 'Roboto-Regular', sans-serif;
}

h3 {
  font-family: 'Lexend-Medium', sans-serif;
  font-weight: 400;
}

.form-edit {
  margin: 24px;
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

.notice-warning {
  margin: 10px 0px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: rgb(44, 44, 44);
}

.img-upload-place {
  position: relative;
  margin: auto;
  border: 1px dashed rgb(204, 204, 204);
  ;
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

.warning-txt {
  color: rgb(224, 60, 49);
  margin-top: 8px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  text-align: center;
}

.paper {
  width: 696px;
  padding-top: 24px;
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

.txt-description {
  margin-top: -10px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  color: rgb(80, 80, 80);
}

.title-dynamic {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
</style>
