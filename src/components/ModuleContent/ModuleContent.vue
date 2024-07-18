<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <button class="btn-add" type="button" v-bind="attrs" v-on="on">
        <icon-plus /> Thêm module bài viết
      </button>
    </template>
    <v-sheet class="wrapper-model">
      <h3>Module bài viết</h3>
      <v-row class="mt-0">
        <v-col cols="12" sm="6" class="p-0">
          <button class="btn-add" type="button" @click="() => $emit('addModule', moduleTitle)">
            <icon-plus /> Tiêu đề
          </button>
        </v-col>
        <v-col cols="12" sm="6" class="p-0">
          <button class="btn-add" type="button">
            <icon-plus /> Đoạn văn
          </button>
        </v-col>
      </v-row>
    </v-sheet>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      moduleTitle: {
        id: 'title',
        content: ''
      }
    }
  },
  methods: {
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
