<script setup>
//stores
import {useGoodsStore} from "@/stores/fetchGoodsStore.js";
// components
import Item from "@/View/Catalog/usage/item.vue";
import Placeholder from "@/View/Catalog/usage/placeholder.vue";
const goodsStore = useGoodsStore();

</script>

<template>
  <div class="mt-2 grid grid-cols-3 flex-wrap gap-x-8 gap-y-14">
    <Item v-for = "item in goodsStore.products" :key="item.id" :item = "item"/>
  </div>
<Placeholder v-if = "goodsStore.products.length == 0"/>
</template>

<style scoped>

</style>