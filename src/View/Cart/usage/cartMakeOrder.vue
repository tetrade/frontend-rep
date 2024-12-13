<script setup>
// components import
import { Input } from '@/components/ui/input/index.js';
import { Label } from '@/components/ui/label/index.js';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group/index.js';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/index.js';
import { Checkbox } from '@/components/ui/checkbox/index.js';

import { useCartStore } from "@/stores/cartStores.js";
import { makeOrder } from "@/View/Cart/Orders/js/orders.js";
import { useUiStore } from "@/stores/UIStore.js";

import * as yup from "yup";

import { computed, ref } from "vue";

const cartStore = useCartStore();
const nameInput = ref('');
const emailInput = ref('');
const selector = ref('');
const emailError = ref('');

const uiStore = useUiStore();


const emailSchema = yup.string().email("Некорректный формат email").required("Введите email");

const validateEmail = async () => {
  try {
    await emailSchema.validate(emailInput.value);
    emailError.value = '';
  } catch (error) {
    emailError.value = error.message;
  }
};

const isOrderButtonDisabled = computed(() => {
  return !cartStore.counter
});

// Функция для проверки обязательных полей
const validateFields = () => {
  const errors = {};
  if (!nameInput.value) {
    errors.name = true;
  }
  if (!emailInput.value) {
    errors.email = true;
  } else if (emailError.value) {
    errors.email = true;
  }
  if (!selector.value) {
    errors.selector = true;
  }
  return errors;
};

const isFormSubmitted = ref(false);

const handleClick = async (event) => {
  isFormSubmitted.value = true;

  const errors = validateFields();

  if (Object.keys(errors).length > 0) {
    return;
  }

  try {
    await validateEmail();
    uiStore.isDialogOpen = true;
    await makeOrder(event);
  } catch (err) {
    console.error(err);
  }
};

</script>

<template>
  <div class="mt-36">
    <h3 class="header32 mb-8">Оформление заказа</h3>
    <div class="w-[1320px] p-10 max-h-[555px] bg-white rounded-lg flex flex-col gap-8">
      <div class="flex gap-8">
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <div class=" w-[286px] flex justify-between">
            <Label for="email">Имя</Label>
            <span v-if="!nameInput" class="text-[#FF60C3] h-0.5">*</span>
          </div>
          <Input
              v-model="nameInput"
              :class="{'input-error': isFormSubmitted && !nameInput}"
              class="w-[286px] bg-[#E4E7EB] focus:outline-none focus:ring-0"
              placeholder=""
              type="text"
          />
          <div class="error-placeholder"></div> <!-- Пустое место для ошибки -->
        </div>
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <div class="flex w-[286px] justify-between">
            <Label for="email">E-mail</Label>
            <span v-if="!emailInput" class="text-[#FF60C3] h-0.5">*</span>
          </div>
          <Input
              v-model="emailInput"
              :class="{'input-error': isFormSubmitted && (!emailInput || emailError)}"
              @input="validateEmail"
              id="email"
              class="w-[286px] bg-[#E4E7EB] focus:outline-none focus:ring-0"
              placeholder=""
              type="email"
          />
          <div class="error-placeholder">
            <span v-if="emailError" class="text-[#FF60C3] text-sm">{{ emailError }}</span>
          </div>
        </div>
      </div>
      <div>
        <RadioGroup class="flex gap-8" default-value="option-one">
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="option-one" value="option-one"/>
            <Label for="option-one">Самовывоз</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="option-two" value="option-two"/>
            <Label for="option-two">Доставка</Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <div class="w-[600px] items-center flex justify-between">
          <Label class="mt-2">Способ оплаты</Label>
          <span v-if="!selector" class="text-[#FF60C3] h-0.5">*</span>
        </div>
        <Select v-model="selector" :class="{'input-error': isFormSubmitted && !selector}">
          <SelectTrigger class="w-[604px] h-[48px] bg-[#E4E7EB]">
            <SelectValue placeholder="Не выбрано" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="cash">Оплата наличными/картой при получении</SelectItem>
              <SelectItem value="online">Оплата онлайн</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div class="flex gap-3 items-center">
        <Checkbox/>
        <Label>Нужна упаковка</Label>
      </div>
      <div>
        <button
            @click="handleClick(cartStore.counter)"
            :disabled="isOrderButtonDisabled"
            class="cart__btn">
          Оформить заказ
        </button>
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

.input:active, .input:hover, .input:focus {
  border: none !important;
}

.input-error {
  border: 2px solid #FF60C3 !important;
  background-color: #ffe6f2 !important;
}


.error-placeholder {
  min-height: 20px;
  font-size: 0.875rem;
}

.text-sm {
  font-size: 0.875rem;
}
</style>
