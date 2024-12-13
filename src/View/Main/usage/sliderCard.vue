<script setup>
const props = defineProps({
  item: {
    type: Object,
  }
})

</script>

<template>
  <div class = "h-[425px] flex flex-col">
  <div class = "rounded-lg color flex items-center justify-center h-[320px]">
    <img :src="props.item.img " alt="">
  </div>
    <p class = "text-2xl pt-2 pb-2 font-medium">{{props.item.name}}</p>
    <p class = "text-slate-500 text-base">{{props.item.price}}₽</p>
  </div>
</template>

<style scoped>
  .color{
    background-color: #ECEFF3;
  }
</style>