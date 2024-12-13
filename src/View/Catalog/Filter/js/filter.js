import {getGoodsList} from "@/View/Catalog/js/goods.js";
import {useGoodsStore} from "@/stores/fetchGoodsStore.js";

export const rangeLimit = async () => {
    const goodsStore = useGoodsStore();
    const goods = await getGoodsList({limit: goodsStore.total, offset: 0});
    let maxPrice = 0;

    goods.products.forEach((item) => {
        maxPrice = Math.max(maxPrice, item.price);
    });
    console.log(goods);
    return {
        range: [0, maxPrice],
        maxPrice,
    }
};
export const getColorList = async () => {
    const goodsStore = useGoodsStore();
    const goods = await getGoodsList({limit: goodsStore.total, offset: 0});
    let colors = new Set()
    goods.products.forEach((item) => {
        if (item.color) {
            colors.add(item.color);
        }
    })
    return { colors: Array.from(colors) };
}
export const getCategoryList = async () => {
    const goodsStore = useGoodsStore();
    const goods = await getGoodsList({limit: goodsStore.total, offset: 0});
    let categories = new Set()
    goods.products.forEach((item) => {
        if (item.category) {
            categories.add(item.category);
        }
    })
    return { categories: Array.from(categories) };
}