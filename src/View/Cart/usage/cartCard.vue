<script setup>

//components import
import {Checkbox} from '@/components/ui/checkbox/index.js'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field/index.js'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog/index.js'
import {Button} from "@/components/ui/button/index.js";

//stores
import {useCartStore} from "@/stores/cartStores.js";

//variables
const cartStore = useCartStore()

//func
const props = defineProps({
  cartItem: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="flex justify-between mb-14 cart">
    <div class="flex">
      <div class="flex items-center">
        <Checkbox :checked="props.cartItem.checked" class="mr-3.5" @click="cartStore.checker(props.cartItem.id)"/>
        <div class="rounded-lg w-[148px] h-[148px] bg-[#ECEFF3] grid grid-cols-1 place-content-center">
          <img :src="props.cartItem.img" alt="">
        </div>
      </div>
      <p class="ml-3.5 text16_light">{{ props.cartItem.name }}</p>
    </div>
    <div>
      <NumberField :defaultValue="1" :min="1" :modelValue="props.cartItem.quantity">
        <NumberFieldContent>
          <NumberFieldDecrement @click="cartStore.decrement(props.cartItem.id)"/>
          <NumberFieldInput/>
          <NumberFieldIncrement @click="cartStore.increment(props.cartItem.id)"/>
        </NumberFieldContent>
      </NumberField>
    </div>
    <p class="header20">{{ props.cartItem.price * props.cartItem.quantity }} ₽</p>
    <Dialog>
      <DialogTrigger class="flex flex-col justify-start">
        <p class="text-[#FF60C3]">X Удалить</p>
      </DialogTrigger>
      <DialogContent class="rounded-2xl !important grid grid-cols-1 place-items-center w-[556px] h-[200px] ">
        <DialogHeader>
          <DialogDescription class="">
            <p class="header20 text-black">Вы действительно хотите удалить {{ props.cartItem.name }}?</p>
          </DialogDescription>
          <DialogFooter>
            <div class="flex gap-14 mt-6">

              <DialogClose>
                <button class = "text-[#FF60C3]">Отмена</button>
              </DialogClose>
              <button @click="cartStore.removeFromCart(props.cartItem.id)" class = "px-8 rounded-xl text-white py-3 bg-[#115EFB]">Да, удалить</button>
            </div>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>

  </div>


</template>

<style scoped>
.cart {
  position: relative;

}

.cart::after {
  content: "";
  width: 1240px;
  height: 2px;
  background-color: grey;
  position: absolute;
  top: 200px;
  left: 50%; /* Смещаем на середину родителя */
  transform: translateX(-50%); /* Центрируем по оси X */
}
</style>