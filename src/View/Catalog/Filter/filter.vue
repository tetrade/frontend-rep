<script setup>


//components import
import {Slider} from '@/components/ui/slider/index.js'
import {Checkbox} from '@/components/ui/checkbox/index.js'

import {rangeLimit, getColorList, getCategoryList} from "@/View/Catalog/Filter/js/filter.js";
import {useRoute, useRouter} from "vue-router";
//vue import
import {onMounted, ref} from "vue";


//other imports
import {Button} from "@/components/ui/button/index.js";

import {useGoodsStore} from "@/stores/fetchGoodsStore.js";

const router = useRouter();
const route = useRoute();
const goodsStore = useGoodsStore();
const range = ref([]);
const maxPrice = ref();
let colorsList = ref([])
let categoryList = ref([])

const selectedCategory = ref([])
const selectedColor = ref([])

const toggleColorSelection = (color) => {
  if (selectedColor.value.includes(color)) {
    selectedColor.value = selectedColor.value.filter(item => item !== color);
  } else {
    selectedColor.value = [...selectedColor.value, color];
  }
  goodsStore.color = selectedColor.value
};
const toggleCategoriesSelection = (color) => {
  if (selectedCategory.value.includes(color)) {
    selectedCategory.value = selectedCategory.value.filter(item => item !== color);
  } else {
    selectedCategory.value = [...selectedCategory.value, color];
  }
  console.log(selectedCategory.value)
  goodsStore.category = selectedCategory.value
};

const rangeFunc = async () => {
  try {
    const { range: resultRange, maxPrice: resultMaxPrice } = await rangeLimit();
    const {colors} = await getColorList();
    const {categories} = await getCategoryList();
    colorsList.value = colors;
    categoryList.value = categories;
    range.value = resultRange;
    maxPrice.value = resultMaxPrice;
  } catch (e) {
    console.error("Ошибка загрузки диапазона:", e);
  }
};
const resetFiltersUI = () => {
  selectedCategory.value = [];
  selectedColor.value = [];
  range.value = [0, maxPrice.value];
  goodsStore.from = null;
  goodsStore.to = null;
  goodsStore.category = [];
  goodsStore.color = [];
};

const resetFunc = async () => {
  try{
    resetFiltersUI();
    await goodsStore.resetFilter();
    await router.push({query: {page: 1, sort: goodsStore.currentSort}});
  }catch(e){
    console.error(e);
  }
}

const clickHandler = (a, b) => {
  goodsStore.from = range.value[0];
  goodsStore.to = range.value[1];
  goodsStore.sendFilter(a, b)
  router.push({query: {page: 1, sort: goodsStore.currentSort}});
}

onMounted(async () => {
  await goodsStore.setGoodsList()
  await rangeFunc()
  await resetFunc()
})

</script>

<template>
  <div class="flex flex-col gap-8">
    <h3 class="header20">Цена, ₽</h3>
    <div class="flex gap-8">
      <div>
        <p>От</p>
        <input v-model="range[0]" class="price__input border border-slate-300 rounded-lg">
      </div>
      <div>
        <p>До</p>
        <input v-model="range[1]" class="price__input border border-slate-300 rounded-lg">
      </div>
    </div>
    <div class="w-[288px]">
      <Slider
          v-model="range"
          :min="0"
          :max="maxPrice"
          :step="1"
          range
          thumb-color="#115EFB"
          track-color="#3490dc"
      />
    </div>
    <h1 class="header20">Тип товара</h1>
    <div>
      <ul>
        <li v-for = "item in categoryList" :key = item>
          <checkbox :checked="selectedCategory.includes(item)" @click = "toggleCategoriesSelection(item)" :value = "item" class = "bg-slate-300"/> {{item}}
        </li>
      </ul>
    </div>
    <h1 class="header20">Цвет товара</h1>
    <div>
      <ul>
        <li v-for = "item in colorsList" :key = item>
          <checkbox :checked="selectedColor.includes(item)" @click = "toggleColorSelection(item)" :value = "item" class = "bg-slate-300"/> {{item}}
        </li>
      </ul>
    </div>
    <div class = "flex gap-2">
      <Button class = "bg-[#115EFB]" @click = "clickHandler(range[0], range[1])">Применить</Button>
      <Button @click = "resetFunc()">Сбросить фильтры</Button>
    </div>

  </div>
</template>

<style scoped>
.price__input {
  padding: 16px 12px;
  height: 48px;
  width: 128px;
}
</style>