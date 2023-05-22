<template>
  <div>
    <button>{{ label }}</button>
  </div>
</template>

<script>
export default {
  name: 'NavBarButton',
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
  button{
    background-color: transparent;
    border: none;
    font-size: 14px;
    line-height: 20px;
    font-weight: normal !important;
    letter-spacing: -.2px;
    cursor: pointer;
  }
</style>
