<template>
  <transition name="modal" enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
    <div class="modalWrap" v-if="show">
      <div class="dimm"></div>
      <slot name="itemsDetailView"></slot>
      <slot></slot>
    </div>
  </transition>
</template>
<script>
export default {
  props: ["show"],
  mounted() {}
};
</script>
<style scoped>
.animated {
  -webkit-animation-duration: .3s;
  animation-duration: .3s;
}
.modalWrap{position: fixed; width: 100%; height: 100%; top: 0; left: 0; bottom: 0; transform: translateY(0); z-index: 999;}
</style>