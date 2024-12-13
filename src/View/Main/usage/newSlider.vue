<script setup>
import {Navigation} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/vue';
import SliderCard from "@/View/Main/usage/sliderCard.vue";

//Swiper imports
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {onMounted, ref} from "vue";
import axios from "@/API/axios.js";

const hitsArr = ref([])

const fetchHit = async function () {
  try {
    const response = await axios.get('/goods/new', {withCredentials: true});
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
  <div class="pt-20">
    <div class="flex gap-8 hits">
      <div class="max-w-[236px]">
        <img alt="" class="w-[32px] h-[60px] pb-4" src="/new.svg">
        <h2 class="text-[32px] font-medium pb-4">Новинки</h2>
        <p class="text-slate-500 font-normal text-[16px]">Их только произвели - они уже у нас! Все самое новое и свежее
          на рынке электроники</p>
      </div>
      <div class="flex-1 overflow-hidden">
        <swiper
            :modules="[Navigation]"
            :slides-per-view="3"
            :space-between="30"
            navigation

        >
          <swiper-slide v-for="item in hitsArr" :key="item" >
            <SliderCard :item = "item"/>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>


</template>

<style scoped>

</style>