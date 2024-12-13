<script setup>
import CartBg from '@/View/Cart/ui/cartBg.vue'
import CartNav from '@/View/Cart/usage/cartNav.vue'
import Modal from "@/View/Cart/usage/modal.vue"
//stores
import {useCartStore} from "@/stores/cartStores.js";
import {useUiStore} from "@/stores/UIStore.js";
//vue
import {onMounted} from "vue";

//variables
const cartStore = useCartStore()
const uiStore = useUiStore()
//func
onMounted(() => {
  cartStore.loadCart()
  cartStore.recalculateTotal()
  cartStore.selectCheck()
})

</script>

<template>
  <cartBg/>
  <div>
    <CartNav/>
  </div>
  <router-view></router-view>
  <Modal v-if="uiStore.isDialogOpen"/>
</template>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}


</style>