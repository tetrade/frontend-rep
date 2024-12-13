import {defineStore} from "pinia";

export const useAuthStore = defineStore("authStore", {
    state: () => ({
        isAuthenticated: false,
    }),
    actions: {
        checkAuth(){
            this.isAuthenticated = localStorage.getItem('isAuth') != null;
            return this.isAuthenticated
        },
        logout(){
            localStorage.removeItem('isAuth');
            this.checkAuth();
        }
    }
})