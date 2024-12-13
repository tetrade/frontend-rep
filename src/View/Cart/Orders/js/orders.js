import axios from '@/API/axios.js'
import {useCartStore} from "@/stores/cartStores.js";
import {saveToLocalStorage} from "@/utils/localStorage.js";

export async function getOrders() {
    try {
        const response = await axios.get(
            '/order',
            {
                withCredentials: true,
            }
        );
        console.log('Response:', response);
        console.log('Data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
    }
}

export async function makeOrder(count) {
    const total = localStorage.getItem('total');
    const cartStore = useCartStore();
    try {
        const res = await axios.post(
            '/order',
            null,
            {
                withCredentials: true,
                params: {
                    price: parseInt(total),
                    count: parseInt(count)
                }
            },
    )
        cartStore.cart = cartStore.cart.filter((item) => item.checked !== true)
        saveToLocalStorage('cart', cartStore.cart)
    } catch (error) {
        console.error('Error fetching orders:', error);
    }
}

export async function getOrderNum() {
    try {
        const orders = await getOrders();
        if (!orders || orders.length === 0) {
            throw new Error("No orders found.");
        }
        return orders[orders.length - 1].id;
    } catch (error) {
        console.error("Error getting order number:", error);
        return null; // Вернуть null или значение по умолчанию, если что-то пошло не так
    }
}

