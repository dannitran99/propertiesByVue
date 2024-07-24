<template>
  <div class="wrapper-content">
    <side-bar />
    <form class="main-area" :class="[{ 'hide': !drawer }]" @submit.prevent="handleForm">
      <div :class="[{ 'point-event': isLoading }, 'paper', 'mb-2']">
        <h2 class="px-5">Nội dung cơ bản</h2>
        <div class="paper-content">
          <v-row class="mt-0">
            <v-col cols="12" sm="6" class="pb-0">
              <p class="txt-label txt-highlight">Danh mục tin tức <span>*</span></p>
              <v-select placeholder="Chọn" dense outlined :items="newsCategory" item-text="label" item-value="value"
                v-model="values.category" :error-messages="errors.category"></v-select>
            </v-col>
            <v-col cols="12" sm="6" class="pb-0">
              <p class="txt-label txt-highlight">Thẻ</p>
              <v-combobox placeholder="Chọn" dense outlined v-model="values.tags" :error-messages="errors.tags"
                :items="tags" hide-details hide-no-data hide-selected multiple single-line small-chips></v-combobox>
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col cols="12" class="pb-0">
              <p class="txt-label txt-highlight">Tiêu đề <span>*</span></p>
              <v-text-field placeholder="Nhập tiêu đề bài viết" dense outlined v-model="values.title"
                :error-messages="errors.title"></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-0 pb-3">
            <v-col class="pb-0">
              <p class="txt-label txt-highlight">Mô tả <span>*</span></p>
              <v-textarea placeholder="Nhập mô tả bài viết" dense outlined rows="4" no-resize
                v-model="values.description" :error-messages="errors.description"></v-textarea>
            </v-col>
          </v-row>
          <v-row class="mt-1 mb-5">
            <v-col cols="12" class="pb-0">
              <p class="txt-label txt-highlight">Ảnh thu nhỏ bài viết <span>*</span></p>
              <input accept="image/*,.heic" type="file" autocomplete="off" tabindex="-1" style="display: none;"
                ref="fileInput" @change="onFileSelected">
              <div v-if="values.thumbnail" class="img-upload-place">
                <img :src="values.thumbnail" alt="avatar" class="avatar-img">
                <div class="close-btn" @click="handleDeleteThumbnail">
                  <icon-closewb />
                </div>
              </div>
              <template v-else>
                <div class="img-upload-place" @click="selectFiles" @dragover.prevent="onDragOver"
                  @dragleave.prevent="onDragLeave" @drop.prevent="onDrop">
                  <icon-imageuploader />
                  <p class="txt-upload-primary">Bấm để chọn ảnh cần tải lên</p>
                  <p class="txt-upload-secondary">hoặc kéo thả ảnh vào đây</p>
                </div>
                <p v-if="errors.thumbnail" class="warning-txt">{{ errors.thumbnail }}</p>
              </template>
            </v-col>
          </v-row>
          <v-row class="mt-0 pb-3">
            <v-col class="pb-0">
              <p class="txt-label txt-highlight">Nguồn</p>
              <v-text-field placeholder="Nhập nguồn bài viết" dense outlined v-model="values.source"
                :error-messages="errors.source"></v-text-field>
            </v-col>
          </v-row>
        </div>
      </div>
      <div :class="[{ 'point-event': isLoading }, 'paper']">
        <h2 class="px-5">Nội dung bài viết</h2>
        <div class="paper-content">
          <div template v-for="(item, idx) in values.content" :key="idx" :class="[{ 'mt-5': idx }]">
            <div class="content-dynamic">
              <h3>Module {{ idx + 1 }}</h3>
              <div>
                <button type="button" @click="() => handleRemove(idx)">
                  <icon-minus />
                </button>
                <module-content @addModule="handleAddModule" :index="idx" />
              </div>
            </div>
            <component :is="item.id" :dataForm="item" :errors="errors.content[idx]" />
          </div>
          <module-content @addModule="handleAddModule" />
          <p v-if="errors.content && typeof errors.content === 'string'" class="warning-txt">{{ errors.content }}
          </p>
        </div>
      </div>
      <div class="paper sticky-wrapper">
        <button type="submit" class="btn-submit">Đăng bài</button>
      </div>
    </form>
    <v-progress-circular indeterminate class="loading" v-if="isLoading"></v-progress-circular>
  </div>
</template>

<script>
import { UPLOAD_PRESET, CLOUD_NAME } from '@/consts/cloudinary'
import { ModuleContent, ModuleTitle, ModuleParagraph, ModuleImage, ModuleVideo, ModuleTable } from '@/components/ModuleContent'
import SideBar from '@/components/SideBar'
import { NEWS_ITEM } from '@/consts/label'
import { setNestedProperty } from '@/helpers/arrayHandler'
import { schema, handleErrorContent } from './validate'
import { DEFAULT_TAGS } from '@/consts/contentNews'

export default {
  components: { SideBar, ModuleContent, ModuleTitle, ModuleParagraph, ModuleImage, ModuleVideo, ModuleTable },
  data() {
    return {
      tags: DEFAULT_TAGS,
      isDragging: false,
      newsCategory: [
        {
          id: 0,
          label: 'Chọn loại tin',
          value: ''
        },
        ...NEWS_ITEM
      ],
      values: {
        category: '',
        tags: [],
        title: '',
        description: '',
        thumbnail: '',
        source: '',
        content: []
      },
      errors: {
        category: '',
        tags: '',
        title: '',
        description: '',
        thumbnail: '',
        source: '',
        content: ''
      }
    }
  },
  computed: {
    isLoading: {
      get() {
        return this.$store.getters['news/isLoading']
      }
    },
    drawer: {
      get() {
        return this.$store.getters['user/drawer']
      }
    }
  },
  methods: {
    handleAddModule(item, idx) {
      const index = idx !== undefined ? idx : this.values.content.length
      this.values.content.splice(index, 0, item.values)
      if (typeof this.errors.content === 'object') this.errors.content.splice(index, 0, item.errors)
      else this.errors.content = [item.errors]
    },
    handleForm() {
      this.errors = {
        category: '',
        tags: '',
        title: '',
        description: '',
        thumbnail: '',
        source: '',
        content: handleErrorContent(this.values.content)
      }
      schema.validate(this.values, { abortEarly: false })
        .then(() => {
          this.$store.dispatch('news/postNews', {
            category: this.values.category,
            tags: this.values.tags,
            title: this.values.title,
            description: this.values.description,
            thumbnail: this.values.thumbnail,
            source: this.values.source,
            content: this.values.content,
            createdAt: new Date()
          })
            .then(() => {
            })
        })
        .catch((err) => {
          err.inner.forEach(error => {
            setNestedProperty(this.errors, error.path, error.message)
          })
        })
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
            this.values.thumbnail = res.url
          }
        )
      }
    },
    handleDeleteThumbnail() {
      this.values.thumbnail = ''
    },
    handleRemove(idx) {
      this.values.content.splice(idx, 1)
      this.errors.content.splice(idx, 1)
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
            this.values.thumbnail = res.url
          }
        )
        return
      }
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

.wrapper-content {
  display: flex;
}

.paper-content {
  padding: 20px;
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

.paper {
  width: 696px;
  padding-top: 24px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 4px;
  border-radius: 4px;
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

.point-event {
  filter: blur(1px);
  pointer-events: none;
}

.loading {
  position: absolute;
  top: 50%;
  left: calc(50% + 115px);
  transform: translate(-50%, -50%)
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

.img-upload-place {
  position: relative;
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

.avatar-img {
  margin: auto;
  width: auto;
  height: 138px;
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

.warning-txt {
  color: rgb(224, 60, 49);
  margin-top: 8px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
}

.content-dynamic {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
