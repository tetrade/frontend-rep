import {defineStore} from 'pinia'

import {ref} from "vue";


export const useRange = defineStore('rangeStore', () => {
    const goodsStore = useGoodsStore();
    const rangeLimit = async () => {
        try{
            await goodsStore.setGoodsList();
            return () => {
                let maxPrice = 0;
                goodsStore.products.forEach(item => {
                    maxPrice = Math.max(maxPrice, item.price);
                })
                return maxPrice;
            }
        }catch(err){
            console.log(err);
        }

    }

    const range = ref([0, rangeLimit])


    const resetRange = () => {
        range.value = [0, rangeLimit.value]
    }
    console.log(rangeLimit)
    return {range, rangeLimit, resetRange}
})