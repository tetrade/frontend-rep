<script setup>
import {getOrders} from "@/View/Cart/Orders/js/orders.js";
import {onMounted, ref} from "vue";

const orders = ref([])

onMounted(async() => {
  orders.value = await getOrders()
})
</script>

<template>
  <div class = "w-[1320px] min-h-[70px] mt-8 bg-white px-10 pt-5 pb-6">
    <div v-for = "order in orders" :key = "order.id" class = "grid py-2 grid-cols-3 mt-2 order text16_light items-center">
      <p>№ {{order.id}} от {{order.date}}</p>
      <div class = "">
      <p v-if = "order.count == 1">{{order.count}} товар</p>
      <p v-else-if="order.count < 5">{{order.count}} товара</p>
      <p v-else>{{order.count}} товаров</p>
      </div>
      <p>{{order.price}}₽</p>
    </div>
  </div>
</template>

<style scoped>
.order{
  position: relative;
}
.order::after{
  content: "";
  width: 1240px;
  height: 2px;
  background-color: #E4E7EB;
  position: absolute;
  top: 40px;
  left: 50%; /* Смещаем на середину родителя */
  transform: translateX(-50%); /* Центрируем по оси X */
}
</style>