<template>
  <div class="item-card">
    <div class="img-card">
        <img v-bind:src="data.images[0].url" :alt="data.images[0].name"/>
        <div class="img-holder">
          <icon-photo/>
          <span><b>{{ data.images.length }}</b></span>
        </div>
    </div>
    <div class="card-detail">{{data.name}}</div>
  </div>
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
    .item-card{
        position: relative;
        display: flex;
        width: 100%;
        height: calc(232px * 4/5);
        min-width: 666px;
        border-radius: 4px;
        border: 1px solid #F2F2F2;
        box-sizing: border-box;
        box-shadow: 0px 4px 6px 0px rgba(44,44,44,0.04);
    }
    .img-card{
        position: relative;
        width: 232px;
        height: 100%;
        float: left;
        display: block;
        overflow: initial;
        border-radius: 4px 0 0 4px;
    }
    .img-card img{
        border-radius: 4px 0 0 4px;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .img-holder{
    position: absolute;
    display: flex;
    align-items: center;
    gap: 5px;
    bottom: 8px;
    right: 8px;
    z-index: 2;
  }
  .img-holder span{
    color: #fff;
    font-family: "Roboto Medium",Roboto,Arial !important;
    font-size: 14px;
    line-height: 20px;
    font-weight: normal !important
  }
  .card-detail{
    padding:16px 16px 16px 24px ;
    width: calc(100% - 232px);
  }
</style>
