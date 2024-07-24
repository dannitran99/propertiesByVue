<template>
  <table>
    <tr v-if="data.hasHeader" class="table-head">
      <td v-for="(item, idx) in data.tableHead" :key="idx">{{ item }}</td>
    </tr>
    <tr v-for="(item, i) in data.tableRow" :key="i" class="table-row" :class="[{ 'odd-row': i & 1 }]">
      <td v-for="(subItem, j) in item" :key="j">{{ subItem }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  }
}
</script>

<style scoped>
table,
th,
td {
  border: none;
  border-collapse: collapse;
}

td {
  padding: 20px;
}

table {
  width: 100%;
  border: 1px solid #ccc;
  margin-bottom: 35px;
}

.table-head {
  font-family: 'Lexend-medium', sans-serif;
  background-color: #ccc;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #1c1f22;
}

.odd-row {
  background-color: #eff1f5;
  ;
}

.table-row {
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #1c1f22;
}
</style>
