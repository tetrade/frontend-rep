<script setup>
// компоненты и зависимости
import { Button } from "@/components/ui/button/index.js";
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
} from "@/components/ui/pagination";
import { useGoodsStore } from "@/stores/fetchGoodsStore.js";
import { ref, watch, onMounted, watchEffect} from "vue";
import { useRouter, useRoute } from "vue-router";

const goodsStore = useGoodsStore();
const route = useRoute();
const router = useRouter();

const itemsPerPage = ref(9);
const currentPage = ref(1);

const totalCount = ref(0);

const fetchGoods = async () => {
  const offset = (currentPage.value - 1) * itemsPerPage.value;
  goodsStore.offset = offset;

  await goodsStore.setGoodsList({
    limit: itemsPerPage.value,
    offset,
    category: goodsStore.category,
    color: goodsStore.color,
  });

  totalCount.value = goodsStore.total;
};

const handleClick = async (newPage) => {
  if (newPage !== currentPage.value) {
    currentPage.value = newPage;
    console.log("Переход к странице:", newPage);

    await fetchGoods();
    await router.push({ query: { page: newPage, sort: goodsStore.currentSort } });
  }
};

watch(
     () => goodsStore.total,
    (newTotal) => {
      console.log("Обновлено количество товаров:", newTotal);
      totalCount.value = newTotal;
    }
);
watch(
    () => route.query.page,
    async (newPage) => {
      currentPage.value = parseInt(newPage);
      await fetchGoods();
    }
)
onMounted(async () => {
  await fetchGoods();
  await router.push({ query: { page: 1, sort: goodsStore.currentSort } });
  currentPage.value = parseInt(route.query.page)
  console.log(parseInt(route.query.page))
});

</script>

<template>
  <div class="mt-20 flex items-center justify-center w-full mb-10">
    <Pagination
        v-if = "goodsStore.products.length > 0"
        v-slot="{ page }"
        :total="totalCount"
        :sibling-count="1"
        show-edges
        :default-page="currentPage"
    >
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <PaginationFirst @click="handleClick(1)" />

        <template v-for="(item, index) in items" :key="index">
          <PaginationListItem
              v-if="item.type === 'page'"
              :value="item.value"
              as-child
              @click="handleClick(item.value)"
          >
            <Button class="w-10 h-10 p-0" :variant="item.value === currentPage ? 'default' : 'outline'">
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :index="index" />
        </template>

        <PaginationLast @click="handleClick(Math.ceil(totalCount / itemsPerPage))" />
      </PaginationList>
    </Pagination>
  </div>
</template>
