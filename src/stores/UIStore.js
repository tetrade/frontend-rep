// stores/uiStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUiStore = defineStore('ui', () => {
    const isDialogOpen = ref(false);
    return { isDialogOpen };
});
