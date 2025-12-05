<script setup lang="ts">
import { ref, watch } from 'vue';
import { useDebounce } from '../composables/useDebounce';

// Mock API: 실제 네트워크 호출 대신 비동기 동작을 시뮬레이션합니다.
const searchProductsAPI = async (query: string): Promise<string[]> => {
  console.log(`Searching for: ${query}`);
  // 실제 API라면 여기에서 fetch/axios를 사용하여 서버에 요청을 보냅니다.
  if (!query) return [];
  // 검색어에 따라 가짜 데이터를 반환합니다.
  const mockData = ['Apple', 'Banana', 'Orange', 'Grape', 'Pineapple'];
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockData.filter(item => item.toLowerCase().includes(query.toLowerCase())));
    }, 500); // 500ms의 네트워크 지연을 시뮬레이션합니다.
  });
};

const searchTerm = ref('');
const debounced = useDebounce(searchTerm, 500);
const results = ref<string[]>([]);
const isLoading = ref(false);

watch(debounced, async (q) => {
  if (!q) {
    results.value = [];
    return;
  }
  isLoading.value = true;
  results.value = await searchProductsAPI(q);
  isLoading.value = false;
});
</script>

<template>
  <div class="searchContainer">
    <h2>상품 검색 (Debounce 테스트)</h2>
    <p>아래 입력창에 과일 이름을 입력하면, 500ms 후에 검색 결과가 나타납니다.</p>
    <p><code>src/composables/useDebounce.ts</code> 파일을 수정하여 <code>useDebounce</code>를 완성하세요.</p>
    <input
      v-model="searchTerm"
      placeholder="과일 이름 검색... (예: apple)"
      class="searchInput"
    />
    <div v-if="isLoading">검색 중...</div>
    <ul class="resultsList">
      <li v-for="item in results" :key="item">{{ item }}</li>
      <li v-if="!isLoading && results.length === 0 && debounced">검색 결과가 없습니다.</li>
    </ul>
  </div>
  
</template>

<style scoped>
.searchContainer { display: grid; gap: 12px; }
.searchInput { padding: 8px 10px; border: 1px solid #ddd; border-radius: 6px; }
.resultsList { margin: 0; padding-left: 18px; }
</style>
