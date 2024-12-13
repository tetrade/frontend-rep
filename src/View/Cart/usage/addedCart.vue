<script setup>

import CartPlaceholder from "@/View/Cart/Orders/usage/cartPlaceholder.vue";
import {Checkbox} from "@/components/ui/checkbox/index.js";
import CartMakeOrder from "@/View/Cart/usage/cartMakeOrder.vue";
import CartCard from "@/View/Cart/usage/cartCard.vue";

//stores
import {useCartStore} from "@/stores/cartStores.js";

//vue
import {computed} from "vue";

//variables
const cartStore = useCartStore()
const cartItems = computed(() => cartStore.cart)

</script>

<template>
  <div>
    <div v-if="cartItems != null && cartItems.length > 0" class="w-[1320px] mt-8 min-h-[500px] bg-white rounded-lg flex flex-col gap-10">
      <div class="flex items-center p-10 gap-3">
        <Checkbox :checked="cartStore.selAll" @click="cartStore.selectAll()"/>
        <p class="text16_light">Выбрать все</p>
        <p class="text16_light cursor-pointer ml-8" @click="cartStore.deleteAll()">Х Удалить все</p>
      </div>
      <CartCard v-for="cartItem in cartItems" :key="cartItem.id" :cartItem='cartItem'/>

      <div class="header24 mb-14 flex justify-end mr-52 -mt-14">
        <h3 v-if="cartStore.counter === 1">{{ cartStore.counter }} товар на {{ cartStore.total }}₽</h3>
        <h3 v-else-if="cartStore.counter < 10">{{ cartStore.counter }} товара на {{ cartStore.total }}₽</h3>
        <h3 v-else>{{ cartStore.counter }} товаров на {{ cartStore.total }}₽</h3>
      </div>
    </div>
    <CartPlaceholder v-if="cartItems == null || cartItems.length === 0"/>
  </div>
  <CartMakeOrder v-if="cartItems != null && cartItems.length > 0"/>
</template>

<style scoped>
body {
  background-color: #F3F6FA !important;;
  background-position: center;
  background-size: cover;
}

.cart {
  padding: 0 40px 40px;
}
</style>