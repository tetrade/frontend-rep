<script setup>
//routes import
  import {useRoute} from "vue-router";
  const route = useRoute()
  import {useAuthStore} from "@/stores/authStore.js";
  const authStore = useAuthStore();
</script>

<template>
  <header class="header bg-white py-[22px]">
    <div class="container flex justify-between items-center p-0">
      <router-link to="/main">
        <h1 class="font-semibold p text-2xl">Gadget Hub</h1>
      </router-link>
      <ul class="flex items-center gap-10 font-medium text-xl">
        <li>
          <router-link v-if = "authStore.isAuthenticated" :class="{'text-[#0B3589] bg-[#F3F6FA]': route.name === 'Catalog' }" to="/catalog" class="flex px-8 py-3 rounded-lg gap-2 items-center">
            <img :class="{'color-[#0B3589]': route.name === 'Catalog' }" :src="route.name === 'Catalog' ? '/catalog_active.svg' :  '/catalog.svg'" alt="Иконка каталога">
            Каталог
          </router-link>
        </li>
        <li>
          <router-link v-if = "authStore.isAuthenticated" :class="{'text-[#0B3589] bg-[#F3F6FA]': route.name === 'added' }" to = "/cart/added" class="flex px-8 py-3 rounded-lg gap-2 items-center">
            <img src="/cart2.svg" alt="Иконка профиля">
            Корзина
          </router-link>
        </li>
        <li>
          <router-link v-if = "!authStore.isAuthenticated" :class="{'text-[#0B3589] bg-[#F3F6FA]': route.name === 'added' }" to = "/login" class="flex px-8 py-3 rounded-lg gap-2 items-center">
            <img src="/profile.svg" alt="Иконка профиля">
            Войти
          </router-link>
        </li>
        <li>
          <router-link v-if = "authStore.isAuthenticated"  @click = "authStore.logout()" to = "/login" class="flex px-5 py-2 logout rounded-lg gap-2 items-center">
            Выйти
          </router-link>
        </li>
      </ul>
    </div>
  </header>
</template>



<style scoped>
.logout{
  background-color: rgba(115, 0, 255, 0.11);
}
</style>
