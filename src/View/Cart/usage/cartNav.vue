<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div class="flex mt-20 gap-20 header24">
    <router-link
        to="/cart/added"
        :class="{ active: route.path === '/cart/added' }"
        class="link"
    >
      <h1>Корзина</h1>
    </router-link>
    <router-link
        to="/cart/orders"
        :class="{ active: route.path === '/cart/orders' }"
        class="link"
    >
      <h1>История заказов</h1>
    </router-link>
  </div>
</template>

<style scoped>
/* Общий стиль для ссылок */
.link {
  position: relative;
  text-decoration: none;
  color: inherit;
}

/* Полоска под текстом */
.link::after {
  content: '';
  position: absolute;
  bottom: -5px; /* Расстояние полоски от текста */
  left: 0;
  width: 0;
  height: 2px; /* Толщина полоски */
  background-color: #0b3589;
  transition: width 0.3s, background-color 0.3s;
}

/* Активный стиль для полоски */
.link.active::after {
  width: 100%;
   /* Цвет активной полоски */
}
</style>
