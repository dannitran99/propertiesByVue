<template>
  <div class="card-new">
    <div class="img"/>
    <div class="card-info">
      <p/>
      <h3/>
      <p/>
    </div>
  </div>
</template>

<style scoped>
.card-new{
  display: flex;
  gap: 12px;
  border-bottom: 1px solid #dfdddd;
  padding-bottom: 15px;
  margin-bottom: 25px;
}

.card-new .img {
  height: 150px;
  width: 260px;
  background-color: #ddd;
  border-radius: 8px;
}
.card-info{
    flex-grow: 1;
}
.card-info p:first-child{
  margin: 0;
  font-size: 12px;
  line-height: 18px;
  background-color: #ddd;
  height: 18px;
  width: 50%;
}
.card-info h3{
  font-size: 18px;
  line-height: 28px;
  margin: 5px 0 10px 0;
  background-color: #ddd;
  height: 28px;
}
.card-info p:last-child{
  background-color: #ddd;
  font-size: 14px;
  line-height: 22px;
  height: 22px;
}
</style>
