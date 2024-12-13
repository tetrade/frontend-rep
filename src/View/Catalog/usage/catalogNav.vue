<script setup>
// stores
import {useGoodsStore} from "@/stores/fetchGoodsStore.js";

// vue imports
import {useRouter, useRoute} from "vue-router";
import {watch} from "vue";

// const
const store = useGoodsStore();
const router = useRouter();
const route = useRoute();

// func
const sortHandler = (sort) => {
  router.push({query: {page: 1, sort}}); // Сбрасываем на первую страницу при смене сортировки
  store.fetchSorted(sort);
};

const isActive = (sort) => route.query.sort === sort;

// Слушаем изменения параметра сортировки
watch(
    () => route.query.sort,
    (newSort) => {
      if (newSort) {
        store.fetchSorted(newSort); // Обновляем список товаров
      }
    },
    {immediate: true} // Обрабатываем при первой загрузке
);
</script>

<template>
  <ul class="flex gap-6 text16_light text-[#484848] mt-9">
    <li @click="sortHandler('new')" :class="['cursor-pointer catalog__filter', { active: isActive('new') }]">
      Новые
    </li>
    <li @click="sortHandler('hit')" :class="['cursor-pointer catalog__filter', { active: isActive('hit') }]">
      Популярные
    </li>
    <li @click="sortHandler('cheap')" :class="['cursor-pointer catalog__filter', { active: isActive('cheap') }]">
      Подешевле
    </li>
    <li @click="sortHandler('expensive')"
        :class="['cursor-pointer catalog__filter', { active: isActive('expensive') }]">
      Подороже
    </li>
  </ul>
</template>

<style scoped>
.catalog__filter {
  display: inline-block;
  font-size: 16px !important;
  font-weight: 400;
  border-bottom: 2px dashed #115EFB;
}

.active {
  border-radius: 6px;
  background: rgb(132, 173, 255);
  border: none !important;
  color: white !important;
  font-size: 16px !important;
  font-weight: 400;
  padding: 4px 12px;
}
</style>
