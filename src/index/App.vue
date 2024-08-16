<template>
  <div class="overlay">
    <div class="mask"></div>
    <img src="https://resource-files.xiao-feishu.top/img/2024-08-14_21-47-16.webp" alt="Image">
  </div>
  <div id="left-menu">
    <leftmeun></leftmeun>
  </div>
  <div id="main">
    <element></element>
  </div>
</template>
<script>
import leftmeun from '../components/menuleft.vue';
import element from '../components/element.vue'
export default {
  components: {
    leftmeun,
    element
  }
}
</script>