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
            <tr v-if="dataForm.hasHeader" class="table-header">
              <td v-for="(_, idx) in dataForm.tableHead" :key="idx">
                <input v-model="dataForm.tableHead[idx]" class="pt-1 pb-1 pl-1 pr-1" />
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
      <button type="button" class="button-add" @click="handleAddColumn">
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
      column: 0
    }
  },
  methods: {
    handleAddColumn() {
      this.dataForm.tableHead.push('')
      this.dataForm.tableRow.forEach((item) => {
        item.push('')
      })
      this.column++
    },
    handleAddRow() {
      const row = []
      for (let i = 0; i < this.column; i++) {
        row.push('')
      }
      this.dataForm.tableRow.push(row)
    }
  }
}
</script>

<style scoped>
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
}

.row-table table {
  min-height: 40px;
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
