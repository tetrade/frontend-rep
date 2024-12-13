<script setup>
import {useUiStore} from "@/stores/UIStore.js";
import {makeOrder, getOrderNum} from "@/View/Cart/Orders/js/orders.js";
import { ref, onMounted} from "vue";

const uiStore = useUiStore();
const orderNumber = ref('');
const closeModal = () => {
  uiStore.isDialogOpen = false;
}

onMounted(async () => {
  orderNumber.value = await getOrderNum();
})
</script>

<template>
  <div
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 w-[700px]" @click.stop>
      <div class="flex flex-col items-center gap-4">
        <img alt="" class="w-[75px]" src="/ThanksForOrder.svg">
        <h3 class="header24 text-center">Спасибо за заказ!</h3>
        <p class="mb-1 text16_light text-center">Номер заказа {{ orderNumber + 1}}.</p>
        <p class="text16_light text-center">
          Мы свяжемся с вами в течение 10 минут, чтобы уточнить удобное для вас время доставки.
        </p>
        <button @click="closeModal" class="cart__btn mt-4">Ок</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart__btn {
  display: flex;
  align-items: center;
  gap: 9px;
  color: white;
  padding: 0 32px;
  max-width: 193px;
  height: 48px;
  justify-content: center;
  border-radius: 8px;
  background: #115EFB;
}
</style>