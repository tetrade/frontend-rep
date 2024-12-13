<template>
  <div class="footer h-[208px] grid grid-cols-1 place-items-center item w-full bg-[#0C368A] text-[#B7CEFF]">
    <div class="container flex justify-between items-center pt-10">
      <ul>
        <li>
          <router-link to="main">
            <h1 class="footer__name text-2xl">Gadget Hub</h1>
          </router-link>
        </li>
        <li class="text-base pt-1">Магазин надежных гаджетов</li>
        <li class="mt-8 text-base pt-1">© 2024 ООО “Гаджет Хаб”. Все права защищены</li>
      </ul>
      <a class="flex items-center" href="#">
        <img class="w-[21px] h-[32px] pr-1.5" src="/phone.svg" alt="Иконка телефона">
        8 (800) 678-34-24
      </a>
      <div class="flex gap-5">
        <a href="#" aria-label="ВКонтакте">
          <img src="/vk.svg" alt="ВКонтакте">
        </a>
        <a href="#" aria-label="Telegram">
          <img src="/telegram.svg" alt="Telegram">
        </a>
        <a href="#" aria-label="WhatsApp">
          <img src="/whatsapp.svg" alt="WhatsApp">
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer__name {
  font-family: "Inter", sans-serif;
}
</style>
