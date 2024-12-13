<script setup>
//components import
import {Dialog, DialogContent, DialogDescription, DialogTrigger,} from '@/components/ui/dialog/index.js'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field/index.js';
import {toast} from 'vue-sonner'

//stores
import {useCartStore} from "@/stores/cartStores.js";

//vue imports
import { ref} from "vue";

//variables
let flag = ref(false)
const {addToCart} = useCartStore()
const quantityValue = ref(1)


//func
const props = defineProps({
  item: {
    type: Object
  }
})
const clickBtn = (id, quantity) => {
  addToCart(id, quantity)
  toast(`Был добавлен товар в корзину на сумму ${props.item.price * quantity} ₽`, {})
}

const char = props.item.characteristic.map((item) => {
  console.log(item)
  return item.split(':')
})
</script>

<template>
  <div>
    <div class="w-[286px] min-h-[509px] p-4 pb-4 rounded-lg item flex flex-col gap-2 ">
      <Dialog>
        <DialogTrigger>
          <div class="item__img h-[330px] pb-1 w-full bg-[#ECEFF3] relative rounded-lg grid grid-cols-1 place-items-center">
            <img :src="props.item.img" alt="" class="">
            <div v-if = "props.item.tags" class = "text-black z-50 absolute top-[12px] right-[12px]">
              <div class="flex flex-col text-white font-medium gap-2 items-end">
                <p
                    v-for="tag in props.item.tags"
                    :key="tag"
                    :class="{
                      'bg-[#FF60C3]': tag === 'hit',
                      'bg-[#00E398]': tag === 'new'
                }"
                class="text-center text-[12px] w-[68px] rounded-[20px] px-2"
                >
                {{ tag }}
                </p>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent class="h-[731px] w-[1304px] !max-w-none">
          <DialogDescription class="grid items-center grid-cols-1
           grid-rows-1 place-items-center">
            <div class="flex gap-8 w-[1028px]">

              <div class="w-[392px] h-[440px] bg-[#E4E7EB] rounded-lg grid grid-cols-1 place-items-center">
                <img :src="props.item.img" alt=""/>

              </div>
              <div class="">
                <h3 class="header32 text-black mb-3">{{ props.item.name }}</h3>
                <p class="rate text16_light text-[#484848] mb-8">{{ props.item.rating }}</p>
                <p class="text16_light text-[#484848] mb-6">{{ props.item.desc }}</p>
                <div>
                  <p class="header20 text-black mb-4">Характеристики</p>
                  <ul class = "flex flex-col gap-4">
                    <li class="flex justify-between items-center py-2"
                        v-for="(value, key) in char" :key="key">
                      <span>{{ char[key][0] }}</span>
                      <span>{{ char[key][1] }}</span>
                    </li>
                  </ul>
                  <div class = "flex flex-col items-end gap-5 mt-8">
                  <h3 class = "header32 text-black">{{props.item.price}}₽</h3>
                    <button v-if="flag === false" class="cart__btn " @click="clickBtn(props.item.id, 1)"><img alt="" src="/cart.svg"> В
                      корзину
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
      <h1 class="header24 ">{{ props.item.price + "₽" }}</h1>
      <p class="text16_light text-[#484848]">{{ props.item.name }}</p>
      <p class="rate text16_light text-[#484848]">{{ props.item.rating }}</p>
      <div>
        <button v-if="flag === false" class="cart__btn " @click="flag = true"><img alt="" src="/cart.svg"> В корзину
        </button>
        <div v-if="flag === true" class="flex gap-5">
          <button class="cart__btn-secondary bg-[#FF60C3] !important"
                  @click="clickBtn(props.item.id, quantityValue)"><img alt="" src="/cart.svg"> {{ quantityValue }} шт.
          </button>
          <NumberField v-model="quantityValue" :defaultValue="1" :min="1">
            <NumberFieldContent>
              <NumberFieldDecrement/>
              <NumberFieldInput/>
              <NumberFieldIncrement/>
            </NumberFieldContent>
          </NumberField>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.item {
  border-radius: 28px;
  padding-bottom: 15px !important;
}

.item:hover {
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.12);
  transition: 0.3s;
}

.rate {
  display: flex;
  gap: 2px;
}

.rate:before {
  content: url("/star.svg");
  display: inline-block;
}

.cart__btn {
  display: flex;
  align-items: center;
  gap: 9px;
  color: white;
  padding: 0 32px;
  max-width: 173px;
  height: 48px;
  justify-content: center;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  background: #115EFB;
}
.cart__btn-secondary{
  display: flex;
  align-items: center;
  gap: 9px;
  color: white;
  padding: 0 32px;
  max-width: 173px;
  height: 48px;
  justify-content: center;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  background: #FF60C3;
}

</style>