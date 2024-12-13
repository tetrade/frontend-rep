import {defineStore} from "pinia";
import {getGoodsList} from "@/View/Catalog/js/goods.js";



export const useGoodsStore = defineStore('goods', {
    state: () => ({
        products: [],
        total: 0,
        limit: 9,
        offset: 0,
        currentSort: null,
        from: null,
        to: null,
        color: null,
        category: null
    }),
    actions: {
        async setGoodsList({limit = 9, offset = 0, category = null, color = null} = {}) {

            if(this.color !== null ){
                if(this.color.length == 0){
                    this.color = null
                }

            }
            if(this.category !== null ){
                if(this.category.length == 0){
                    this.category = null
                }

            }
            try{
                const response = await getGoodsList({limit, offset: offset, sortBy: this.currentSort, from: this.from, to: this.to, color: color, type: category});
                this.products = response.products;
                this.limit = limit;
                this.total = response.total;
            }catch(err){
                console.log(err);
            }
            console.log(this.total)
        },
        async fetchSorted(sortBy) {
            if (!sortBy) {
                return;
            }

            this.currentSort = sortBy;
            try {
                if(this.color !== null ){
                    if(this.color.length == 0){
                        this.color = null
                    }

                }
                if(this.category !== null ){
                    if(this.category.length == 0){
                        this.category = null
                    }

                }
                const res = await getGoodsList({
                    limit: 9,
                    offset: 0,
                    sortBy,
                    from: this.from,
                    to: this.to,
                    color: this.color,
                    category: this.category
                });

                this.products = res.products;
            } catch (err) {
                console.error('Ошибка при выполнении сортировки:', err);
            }
        },
        async sendFilter(from, to) {
            try{
                if(this.color !== null ){
                    if(this.color.length == 0){
                        this.color = null
                    }

                }
                if(this.category !== null ){
                    if(this.category.length == 0){
                        this.category = null
                    }

                }
                let sortBy = this.currentSort
                const response = await getGoodsList({limit: 9, offset: this.offset, sortBy, from: this.from, to: this.to, color: this.color, type: this.category});
                this.products = response.products;
                console.log(response)
                this.from = from;
                this.to = to;
                console.log(response);
                this.total = response.total;
            }catch(err){
                console.log(err);
            }
        },
        async resetFilter() {
            const response = await getGoodsList({limit: 9, offset: this.offset, sortBy: this.currentSort, from: this.from, to: this.to, color: this.color, type: this.category});
            this.products = response.products;
            await this.setGoodsList()
        }
    }
})