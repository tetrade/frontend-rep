<script setup>
//components import
import Header from '@/components/Header/header.vue'
import Footer from '@/components/Footer/footer.vue'
import {Toaster} from '@/components/ui/sonner'
import {useAuthStore} from "@/stores/authStore.js";
import {onMounted} from "vue";

onMounted(() => {
  useAuthStore().checkAuth()
})
</script>

<template>
  <div class="wrapper">
    <Header/>
    <div class="container">
      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>
    <Footer/>
    <Toaster/>
  </div>

</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.main-content{
  min-height: 90vh;
  flex: 1 1 auto;
}

</style>
