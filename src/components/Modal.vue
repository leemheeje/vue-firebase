<template>
    <div class="modalWrap" v-if="show">
        <slot></slot>
    </div>
</template>
<script>
export default{
    props:['show'],
    mounted(){
    }
}
</script>