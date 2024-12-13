import axios from "@/API/axios.js";

export async function getGoodsList({limit = 9, offset = 0, sortBy = null, from = null, to = null, color = null, type = null}) {
    try {
        const res = await axios.post(
            '/goods',
            {
                limit,
                offset,
                sortBy,
                from,
                to,
                color,
                type,
            }, {withCredentials: true},
        );
        return res.data
    } catch (err) {
        console.error('Ошибка при получении списка товаров:', err);
    }
}