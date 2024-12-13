import {defineStore} from 'pinia'
import {loadFromLocalStorage, saveToLocalStorage} from "@/utils/localStorage.js";
import {useGoodsStore} from "@/stores/fetchGoodsStore.js"

export const useCartStore = defineStore('cart', {
    state: () => ({
        cart: loadFromLocalStorage('cart'),
        total: 0,
        counter: 0,
        selAll: false,
        selCounter: 0
    }),
    actions: {
        addToCart(id, quantity) {
            const items = useGoodsStore().products
            const item = items.find((item) => item.id === id);
            const existingItem = this.cart.find((cartItem) => cartItem.id === id);

            if (item) {
                if (existingItem) {
                    existingItem.quantity += quantity;
                    existingItem.price = item.price * existingItem.quantity;
                    saveToLocalStorage('cart', this.cart);
                } else {
                    const newItem = {
                        ...item,
                        price: item.price * quantity,
                        quantity: quantity,
                        checked: false
                    };
                    this.cart.push(newItem);
                    saveToLocalStorage('cart', this.cart);
                }
            }
        },
        removeFromCart(id) {
            this.cart = this.cart.filter((item) => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(this.cart))
            this.recalculateTotal()
        },
        loadCart() {
            const savedCarts = loadFromLocalStorage('cart')
            this.cart = savedCarts
            this.recalculateTotal()
        },
        increment(id) {
            const item = this.cart.find((item) => item.id === id)
            item.quantity++
            saveToLocalStorage('cart', this.cart);
            console.log(item)
            this.recalculateTotal()
        },
        decrement(id) {
            const item = this.cart.find((item) => item.id === id)
            item.quantity--
            saveToLocalStorage('cart', this.cart);
            console.log(item)
            this.recalculateTotal()
        },
        deleteAll() {
            this.cart = []
            saveToLocalStorage('cart', this.cart);
            this.recalculateTotal()
        },
        checker(id) {
            const item = this.cart.find((item) => item.id === id);
            if (item) {
                item.checked = !item.checked
                this.selCounter++
                if (item.checked === false){
                    this.selAll = false
                }
                this.selAll = this.cart.every((cartItem) => cartItem.checked);
                saveToLocalStorage('cart', this.cart)
                this.recalculateTotal()
            }

        },
        recalculateTotal() {
            this.total = 0
            this.counter = 0
            if(this.cart){
                this.cart.forEach(item => {
                    if (item.checked) {
                        this.total += item.price * item.quantity
                        this.counter += item.quantity
                    }
                })
            }

            saveToLocalStorage('total', this.total)
        },
        selectAll() {
            this.selAll = !this.selAll
            if(this.cart){
                this.cart.forEach((item) => {
                    item.checked = this.selAll
                })
            }

            this.recalculateTotal()
            saveToLocalStorage('cart', this.cart)
        },
        selectCheck(){
            if (this.selAll === true && this.cart){

                this.cart.forEach((item) =>{
                    item.checked = true
                })
            }
        }
    }
});