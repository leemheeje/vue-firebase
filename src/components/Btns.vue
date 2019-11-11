<template>
  <a :href="href" class="btns" :class="cssClass" :id="id" @click="eventBusClick">
    <slot></slot>
  </a>
</template>
<script>
export default {
  props:['href', 'cssClass', 'id', 'isIco'],
  methods:{
    eventBusClick(){
      this.$emit('eventBus_click' , {
        $el : this.$el
      });
    }
  }
};
</script>