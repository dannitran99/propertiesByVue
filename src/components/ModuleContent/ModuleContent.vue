<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <button class="btn-add mt-3" type="button" v-bind="attrs" v-on="on" v-if="index === undefined">
        <icon-plus /> Thêm module bài viết
      </button>
      <button type="button" v-else v-bind="attrs" v-on="on">
        <icon-plus />
      </button>
    </template>
    <v-sheet class="wrapper-model">
      <h3>Module bài viết</h3>
      <v-row class="mt-0">
        <v-col cols="12" sm="6" class="p-0">
          <button class="btn-add" type="button" @click="handleAddTitle">
            <icon-plus /> Tiêu đề
          </button>
        </v-col>
        <v-col cols="12" sm="6" class="p-0">
          <button class="btn-add" type="button" @click="handleAddParagraph">
            <icon-plus /> Đoạn văn
          </button>
        </v-col>
        <v-col cols="12" sm="6" class="p-0">
          <button class="btn-add" type="button" @click="handleAddImage">
            <icon-plus /> Hình ảnh
          </button>
        </v-col>
        <v-col cols="12" sm="6" class="p-0">
          <button class="btn-add" type="button" @click="handleAddVideo">
            <icon-plus /> Video Youtube
          </button>
        </v-col>
        <v-col cols="12" sm="6" class="p-0">
          <button class="btn-add" type="button" @click="handleAddTable">
            <icon-plus /> Bảng
          </button>
        </v-col>
        <v-col cols="12" sm="6" class="p-0">
          <button class="btn-add" type="button" @click="handleAddList">
            <icon-plus /> Danh sách
          </button>
        </v-col>
      </v-row>
    </v-sheet>
  </v-dialog>
</template>

<script>
import { MODULE_TITLE, MODULE_PARAGRAPH, MODULE_IMAGE, MODULE_VIDEO, MODULE_TABLE, MODULE_LIST } from '@/consts/contentNews'
export default {
  props: {
    index: {
      type: Number
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    handleAddTitle() {
      this.$emit('addModule', {
        values: {
          id: MODULE_TITLE,
          content: '',
          size: ''
        },
        errors: {
          content: '',
          size: ''
        }
      }, this.index)
    },
    handleAddParagraph() {
      this.$emit('addModule', {
        values: {
          id: MODULE_PARAGRAPH,
          content: '',
          isBold: false,
          isItalic: false
        },
        errors: {
          content: '',
          isBold: '',
          isItalic: ''
        }
      }, this.index)
    },
    handleAddImage() {
      this.$emit('addModule', {
        values: {
          id: MODULE_IMAGE,
          image: '',
          description: ''
        },
        errors: {
          image: '',
          description: ''
        }
      }, this.index)
    },
    handleAddVideo() {
      this.$emit('addModule', {
        values: {
          id: MODULE_VIDEO,
          url: '',
          description: ''
        },
        errors: {
          url: '',
          description: ''
        }
      }, this.index)
    },
    handleAddTable() {
      this.$emit('addModule', {
        values: {
          id: MODULE_TABLE,
          hasHeader: true,
          tableHead: ['', ''],
          tableRow: [['', '']]
        },
        errors: {
          hasHeader: '',
          tableHead: '',
          tableRow: ''
        }
      }, this.index)
    },
    handleAddList() {
      this.$emit('addModule', {
        values: {
          id: MODULE_LIST,
          list: ['']
        },
        errors: {
          list: ['']
        }
      }, this.index)
    }
  }
}
</script>

<style scoped>
.wrapper-model {
  overflow: hidden;
  padding: 20px;
}

.btn-add {
  padding: 5px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  border-radius: 5px;
  transition: all .3s ease;
}

.btn-add:hover {
  background-color: rgb(242, 242, 242);
}
</style>
