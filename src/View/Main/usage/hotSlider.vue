<script setup>
import {Navigation} from 'swiper/modules'; // Импорт модулей
import {Swiper, SwiperSlide} from 'swiper/vue'; // Импорт компонентов Swiper
import SliderCard from "@/View/Main/usage/sliderCard.vue";
import axios from "@/API/axios.js"
import {onMounted, ref} from "vue";
// Swiper imports
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const hitsArr = ref([])

const fetchHit = async function () {
  try {
    const response = await axios.get('/goods/hit', {withCredentials: true});
    hitsArr.value = response.data;

  } catch (err) {
    console.log(err);
  }
};

onMounted(async () => {
  await fetchHit();

});


</script>

<template>
  <div class="pt-20 max-w-full">
    <div class="flex gap-8">
      <div class="w-[236px]">
        <img alt="Иконка пламени" class="w-[32px] h-[60px] pb-4" src="/flame.svg">
        <h2 class="text-[32px] font-medium pb-4">Хиты продаж</h2>
        <p class="text-slate-500 font-normal text-[16px]">
          Тысячи покупателей уже одобрили эти товары. Самые популярные, проверенные и надежные гаджеты!
        </p>
      </div>
      <div class="flex-1 overflow-hidden">
        <Swiper
            :modules="[Navigation]"
            :slides-per-view="3"
            :space-between="32"
            navigation
        >
          <SwiperSlide v-for = "item in hitsArr" :key = "item">
            <SliderCard :item = "item" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>
