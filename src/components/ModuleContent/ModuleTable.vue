<template>
  <v-row class="mt-0">
    <v-col cols="12" class="pb-0 row-checkbox" sm="6">
      <p class="txt-label">Tiêu đề bảng</p>
      <input type="checkbox" v-model="dataForm.hasHeader" />
    </v-col>
    <v-col cols="12" class="pb-0 row-table">
      <div class="pb-3">
        <table class="mb-3 ">
          <tbody>
            <tr class="table-header" :class="[{ 'disable-header': !dataForm.hasHeader }]" ref="table-head">
              <td v-for="(_, idx) in dataForm.tableHead" :key="idx" class="insert-cell"
                @mousemove="(e) => handleMouseMove(e, idx)" @mouseleave="handleMouseLeave">
                <div class="insert-button" :class="[{ 'show-btn': showBtnInsertLeft && indexInsert === idx }]"></div>
                <div class="insert-button right-btn"
                  :class="[{ 'show-btn': showBtnInsertRight && indexInsert === idx }]"></div>
                <input v-model="dataForm.tableHead[idx]" class="pt-1 pb-1 pl-1 pr-1" :disabled="!dataForm.hasHeader" />
              </td>
            </tr>
            <tr v-for="(_, i) in dataForm.tableRow" :key="`row${i}`">
              <td v-for="(_, j) in dataForm.tableRow[i]" :key="`cell-${i}-${j}`">
                <input v-model="dataForm.tableRow[i][j]" class="pt-1 pb-1 pl-1 pr-1" />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="button" class="button-add" @click="handleAddRow">
          <p class="txt-label">Thêm hàng</p>
          <div class="close-btn">
            <icon-plus />
          </div>
        </button>
      </div>
      <button type="button" class="button-add" @click="() => handleAddColumn()">
        <p class="txt-label">Thêm cột</p>
        <div class="close-btn">
          <icon-plus />
        </div>
      </button>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    dataForm: {
      type: Object
    },
    errors: {
      type: Object
    }
  },
  data() {
    return {
      column: 1,
      showBtnInsertLeft: false,
      showBtnInsertRight: false,
      indexInsert: -1
    }
  },
  computed: {
    cellWidth() {
      return this.$refs[`table-head`].clientWidth / this.column
    },
    boundingLeft() {
      return this.$refs[`table-head`].getBoundingClientRect().left
    }
  },
  methods: {
    handleAddColumn(idx) {
      const index = idx !== undefined ? idx : this.column
      this.dataForm.tableHead.splice(index, 0, '')
      this.dataForm.tableRow.forEach((item) => {
        item.splice(index, 0, '')
      })
      this.column++
    },
    handleAddRow() {
      const row = []
      for (let i = 0; i < this.column; i++) {
        row.push('')
      }
      this.dataForm.tableRow.push(row)
    },
    handleMouseMove: function (e, idx) {
      const pos = e.clientX - (this.boundingLeft + this.cellWidth * idx)
      this.showBtnInsertLeft = pos < 10
      this.showBtnInsertRight = pos > this.cellWidth - 10
      this.indexInsert = this.showBtnInsertLeft || this.showBtnInsertRight ? idx : -1
    },
    handleMouseLeave() {
      this.showBtnInsertLeft = false
      this.showBtnInsertRight = false
      this.indexInsert = -1
    }
  }
}
</script>

<style lang="scss" scoped>
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}

.txt-label {
  color: rgb(44, 44, 44);
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
}

.insert-cell {
  position: relative;
}

.insert-button {
  position: absolute;
  display: none;
  height: 100%;
  width: 10px;
  background-color: red;
  bottom: 100%;
}

.right-btn {
  right: 0;
}

.show-btn {
  display: block;
}

.table-header {
  background-color: #ccc;
}

.row-checkbox {
  display: flex;
  align-items: center;
  gap: 12px;
}

.row-table {
  display: flex;
  gap: 12px;
  overflow: auto;

  table {
    min-height: 32px;
  }
}

p {
  margin: 0;
}

.button-add {
  width: fit-content;
  height: fit-content;
  display: flex;
  padding: 2px 8px;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  border: 1px dashed #ccc;
  border-radius: 6px;
  cursor: pointer;
}

.disable-header {
  opacity: .5;
}

.close-btn {
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
</style>
