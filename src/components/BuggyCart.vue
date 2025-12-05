<script setup lang="ts">
import { shallowRef, computed } from 'vue';

/**
 * ## 과제 4: 버그 수정 (고급)
 *
 * 이 컴포넌트는 버그를 포함하고 있습니다.
 *
 * ### 현재 버그 시나리오:
 * 1. 각 상품의 '+' 버튼을 클릭하여 수량을 늘려도, 하단의 '총가격'이 업데이트되지 않습니다.
 *
 * ### 요구사항:
 * - `handleIncreaseQuantity` 함수를 수정하여 '+' 버튼 클릭 시 '총가격'이 즉시 정확하게 업데이트되도록 만드세요.
 */

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const initialItems: CartItem[] = [
  { id: 1, name: 'Vue 후드티', price: 35000, quantity: 1 },
  { id: 2, name: 'TypeScript 티셔츠', price: 28000, quantity: 2 },
  { id: 3, name: 'Vite 머그컵', price: 15000, quantity: 1 },
];

const items = shallowRef<CartItem[]>(initialItems);

// 버그가 있는 Handler
const handleIncreaseQuantity = (itemId: number) => {
  const found = items.value.find(i => i.id === itemId);
  if (found) {
    found.quantity += 1;
  }
};

const totalPrice = computed(() => {
  console.log('총가격을 다시 계산합니다...');
  return items.value.reduce((sum, i) => sum + i.price * i.quantity, 0);
});
</script>

<template>
  <div class="container">
    <h2>과제 4: 버그 수정하기</h2>
    <div class="description">
      <p>
        <code>BuggyCart.vue</code>의 <code>handleIncreaseQuantity</code> 함수를 수정하여,
        수량 변경 시 총가격이 즉시 업데이트되도록 만드세요.
      </p>
    </div>
    <ul class="itemList">
      <li v-for="item in items" :key="item.id" class="item">
        <span class="itemName">{{ item.name }}</span>
        <span class="itemPrice">{{ item.price.toLocaleString() }}원</span>
        <div class="quantityControl">
          <span>수량: {{ item.quantity }}</span>
          <button @click="handleIncreaseQuantity(item.id)">+</button>
        </div>
      </li>
    </ul>
    <div class="totalPrice">총가격: {{ totalPrice.toLocaleString() }}원</div>
  </div>
</template>

<style scoped>
.container { display: grid; gap: 12px; }
.description { color: var(--muted); }
.itemList { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
.item { display: grid; grid-template-columns: 1fr auto auto; gap: 8px; align-items: center; border: 1px solid var(--border); border-radius: 8px; padding: 8px; }
.itemName { font-weight: 600; }
.itemPrice { color: var(--muted); }
.quantityControl { display: flex; gap: 8px; align-items: center; }
.totalPrice { font-weight: 700; font-size: 18px; }
</style>
