<script setup>
//components import
import Catalog from "@/View/Catalog/usage/listOfGoods.vue"
import CatalogNav from "@/View/Catalog/usage/catalogNav.vue"
import Pagination from "@/View/Catalog/usage/pagination.vue";
import Filter from "@/View/Catalog/Filter/filter.vue";



</script>

<template>
  <div class = "mt-16">
    <h3 class="header32">Каталог товаров</h3>
      <CatalogNav/>
    <div class="flex gap-8 w-full">
      <Catalog/>
      <Filter/>
    </div>
    <Pagination/>
  </div>
</template>

<style scoped>

</style>