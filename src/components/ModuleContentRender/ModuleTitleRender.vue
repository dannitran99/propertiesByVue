<template>
  <component :is="data.size">{{ data.content }}</component>
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
* {
  font-family: 'Lexend-Medium', sans-serif;
  color: #1c1f22;
  font-weight: 400;
  margin-bottom: 20px;
}

h1 {
  font-size: 40px !important;
  line-height: 52px !important;
}

h2 {
  font-size: 32px !important;
  line-height: 44px !important;
}

h3 {
  font-size: 24px;
  line-height: 32px;
}

h4 {
  font-size: 1.5rem;
  line-height: 1.2;
}

h5 {
  font-size: 1.3rem;
  line-height: 1.1;
}

h6 {
  font-size: 1rem;
  line-height: 1;
}
</style>
