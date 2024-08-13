<template>
  <div id="left-menu">
    <leftmeun></leftmeun>
  </div>
  <div id="main">
    <element></element>
  </div>
</template>
<script>
import leftmeun from '../components/menuleft.vue';
import element from '../components/element-look.vue'
export default {
  components: {
    leftmeun,
    element
  }
}
</script>