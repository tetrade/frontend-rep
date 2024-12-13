<template>
  <div class = "flex mt-10 flex-col gap-4">
    <img class = "w-[147px]" src="/emptyCart.svg" alt="">
    <h1 class = "header32">Пока пусто</h1>
    <p class = "text16_light">Ознакомьтесь с новинками и хитами на главной или найдите нужное в каталоге</p>
    <div class = "flex items-center gap-8">
      <router-link class = "px-8 py-3 text-white bg-[#115EFB] rounded-lg" to="/catalog">Перейти в каталог</router-link>
      <router-link class = "text-[#115EFB]" to="/main">Главная страница</router-link>
    </div>
  </div>
</template>
