<template>
  <div>
    <bread-crumb v-bind:items="breadCrumb"/>
    <div  ref="keybox" class="ww">
      <h1>testtttt</h1>
    </div>
    <div  ref="keybox1" class="ww">
      <h1>testtttt</h1>
    </div>
    <div  ref="keybox2" class="ww">
      <h1>testtttt</h1>
    </div>
    <div  ref="keybox3" class="ww">
      <h1>testtttt</h1>
    </div>
    <div  ref="keybox4" class="ww">
      <h1>testtttt</h1>
    </div>
    <div  ref="keybox5" class="ww">
      <h1>testtttt</h1>
    </div>
    <div  ref="keybox6" class="ww">
      <h1>testtttt</h1>
    </div>
    <div  ref="keybox7" class="ww">
      <h1>testtttt</h1>
    </div>
    <div  ref="keybox8" class="ww">
      <h1>testtttt</h1>
    </div>
    <div  ref="keybox9" class="ww">
      <h1>testtttt</h1>
    </div>
    <div  ref="keybox10" class="ww">
      <h1>testtttt</h1>
    </div>
    <div  ref="keybox11" class="ww">
      <h1>testtttt</h1>
    </div>
  </div>
</template>

<script>
import {ref, onMounted} from 'vue'
import { gsap } from 'gsap'

export default {
  setup () {
    const keybox = ref()
    const keybox1 = ref()
    const keybox2 = ref()
    const keybox3 = ref()
    const keybox4 = ref()
    const keybox5 = ref()
    const keybox6 = ref()
    const keybox7 = ref()
    const keybox8 = ref()
    const keybox9 = ref()
    const keybox10 = ref()
    const keybox11 = ref()
    onMounted(() => {
      gsap.from(keybox.value, {
        delay: 0.5,
        duration: 1,
        y: '+100',
        autoAlpha: 0,
        ease: 'black.out(1.7)'
      })
      gsap.from(keybox1.value, {
        delay: 0.5,
        duration: 1,
        y: '+100',
        autoAlpha: 0,
        ease: 'black.out(1.7)'
      })
      gsap.from(keybox2.value, {
        delay: 0.5,
        duration: 1,
        y: '+100',
        autoAlpha: 0,
        ease: 'black.out(1.7)'
      })
      gsap.from(keybox3.value, {
        delay: 0.5,
        duration: 1,
        y: '+100',
        autoAlpha: 0,
        ease: 'black.out(1.7)'
      })
      gsap.from(keybox4.value, {
        delay: 0.5,
        duration: 1,
        y: '+100',
        autoAlpha: 0,
        ease: 'black.out(1.7)'
      })
      gsap.from(keybox5.value, {
        delay: 0.5,
        duration: 1,
        y: '+100',
        autoAlpha: 0,
        ease: 'black.out(1.7)'
      })
      gsap.from(keybox6.value, {
        delay: 0.5,
        duration: 1,
        y: '+100',
        autoAlpha: 0,
        ease: 'black.out(1.7)'
      })
      gsap.from(keybox7.value, {
        delay: 0.5,
        duration: 1,
        y: '+100',
        autoAlpha: 0,
        ease: 'black.out(1.7)'
      })
      gsap.from(keybox8.value, {
        delay: 0.5,
        duration: 1,
        y: '+100',
        autoAlpha: 0,
        ease: 'black.out(1.7)'
      })
      gsap.from(keybox9.value, {
        delay: 0.5,
        duration: 1,
        y: '+100',
        autoAlpha: 0,
        ease: 'black.out(1.7)'
      })
      gsap.from(keybox10.value, {
        delay: 0.5,
        duration: 1,
        y: '+100',
        autoAlpha: 0,
        ease: 'black.out(1.7)'
      })
      gsap.from(keybox11.value, {
        delay: 0.5,
        duration: 1,
        y: '+100',
        autoAlpha: 0,
        ease: 'black.out(1.7)'
      })
    })
    return {
      keybox, keybox1, keybox2, keybox3, keybox4, keybox5, keybox6, keybox7, keybox8, keybox9, keybox10, keybox11
    }
  },
  data () {
    return {
      breadCrumb: [
        'Tin tức'
      ]
    }
  }
}
</script>

<style scoped>
  .ww{
    height: 200px;
  }
</style>
