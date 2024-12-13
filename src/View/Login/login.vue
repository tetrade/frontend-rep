<script setup>
import { login } from "@/View/Login/js/login.js";
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import {useAuthStore} from "@/stores/authStore.js"
const validationSchema = yup.object({
  username: yup.string().required("Логин обязателен"),
  password: yup.string().required("Пароль обязателен"),
});

const validateError = ref('')
const authStore = useAuthStore()
const router = useRouter();
const handleLogin = async (values) => {
  try {
    const res = await login(values.username, values.password);
    router.push('/catalog');
    authStore.checkAuth();
  } catch (error) {
    if(error.response.status === 403) {
      validateError.value = "Неверный логин или пароль";
    }
  }
};
</script>

<template>
  <div class="login__bg"></div>
  <div class="h-[90vh] grid grid-cols-1 place-items-center">
    <div>
      <h1 class="header32 text-center">Добро пожаловать!</h1>
      <div class="login__block w-[382px] h-[354px] flex flex-col gap-20 bg-white rounded-lg mt-8">
        <Form @submit="handleLogin" :validation-schema="validationSchema">
          <div class = "mb-5">
            <h1 class="text14">Логин</h1>
            <Field
                name="username"
                placeholder="Введите логин"
                class="w-full rounded-md input__login"
                as="input"
                type="text"
            />
            <ErrorMessage name="username" class="text-[#FF60C3] text-sm mt-1" />
          </div>
          <div class = "mb-6">
            <h1 class="text14">Пароль</h1>
            <Field
                name="password"
                placeholder="Введите пароль"
                class="w-full rounded-md input__login"
                as="input"
                type="password"
            />
            <ErrorMessage name="password" class="text-[#FF60C3] text-sm mt-1" />
          </div>
          <div>
            <div v-if = "validateError" class = "text-[#FF60C3]">{{validateError}}</div>
            <button type="submit" class="login__btn text16">Войти</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login__bg {
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url("/bg.png");
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh; /* Площадь фона растягивается на весь экран */
  background-color: #AEBDDB;
  position: absolute; /* Абсолютное позиционирование, чтобы фон был за контентом */
  z-index: -1; /* Фон всегда будет позади содержимого */
}

.login__block {
  width: 382px;
  height: 354px;
  background-color: white;
  padding: 48px;
}

.input__login {
  padding: 12px 16px;
  border: 1px solid grey;

}
.login__btn{
  padding: 12px 32px;
  border-radius: 8px;
  background: rgb(66, 66, 66);
  color: white;
}
</style>