<script setup lang="ts">
import * as utils from '../utils/dataUtils';
import type { User, Product } from '../utils/dataUtils';
import { ref, computed } from 'vue';

// 확장된 Mock 데이터
const mockUsers: User[] = [
  { id: 1, name: '앨리스', age: 28, isActive: true, department: '인사팀' },
  { id: 2, name: '밥', age: 35, isActive: false, department: '개발팀' },
  { id: 3, name: '찰리', age: 22, isActive: true, department: '개발팀' },
  { id: 4, name: '데이브', age: 40, isActive: false, department: '마케팅팀' },
  { id: 5, name: '이브', age: 31, isActive: true, department: '인사팀' },
];

const mockProducts: Product[] = [
  { id: 1, name: '노트북', price: 1200000, category: '전자기기', stock: 15 },
  { id: 2, name: '마우스', price: 25000, category: '전자기기', stock: 30 },
  { id: 3, name: '티셔츠', price: 30000, category: '의류', stock: 100 },
  { id: 4, name: '청바지', price: 80000, category: '의류', stock: 0 },
  { id: 5, name: '소설책', price: 15000, category: '도서', stock: 50 },
  { id: 6, name: '키보드', price: 75000, category: '전자기기', stock: 5 },
  { id: 7, name: '모니터', price: 350000, category: '전자기기', stock: 10 },
  { id: 8, name: '후드티', price: 55000, category: '의류', stock: 20 },
];

const currentPage = ref(1);
const pageSize = 3;

const activeUsers = computed(() => utils.filterActiveUsers(mockUsers));
const categoryTotals = computed(() => utils.getCategoryTotals(mockProducts));
const paginatedProducts = computed(() => utils.paginate(mockProducts, currentPage.value, pageSize));
const departmentSummary = computed(() => utils.getDepartmentSummary(mockUsers));
</script>

<template>
  <div class="container">
    <h2>데이터 조작 결과 (UI 연동)</h2>
    <p><code>src/utils/dataUtils.ts</code> 파일의 함수들을 완성하면 아래 결과가 올바르게 표시됩니다.</p>

    <div class="section">
      <h3>문제 1: 활성 사용자 (filterActiveUsers)</h3>
      <ul v-if="activeUsers.length > 0" class="list">
        <li v-for="u in activeUsers" :key="u.id">{{ u.name }}</li>
      </ul>
      <p v-else class="noResult">결과 없음</p>
    </div>

    <div class="section">
      <h3>문제 7: 카테고리별 총액 (getCategoryTotals)</h3>
      <table v-if="Object.keys(categoryTotals).length > 0" class="table">
        <thead><tr><th>카테고리</th><th>총액</th></tr></thead>
        <tbody>
          <tr v-for="([category, { totalPrice }]) in Object.entries(categoryTotals)" :key="category">
            <td>{{ category }}</td>
            <td>{{ totalPrice.toLocaleString() }}원</td>
          </tr>
        </tbody>
      </table>
      <p v-else class="noResult">결과 없음</p>
    </div>

    <div class="section">
      <h3>문제 5: 상품 목록 페이지네이션 (paginate)</h3>
      <template v-if="paginatedProducts.items.length > 0">
        <table class="table">
          <thead><tr><th>ID</th><th>상품명</th><th>가격</th></tr></thead>
          <tbody>
            <tr v-for="p in paginatedProducts.items" :key="p.id">
              <td>{{ p.id }}</td><td>{{ p.name }}</td><td>{{ p.price.toLocaleString() }}원</td>
            </tr>
          </tbody>
        </table>
        <div class="paginationControls">
          <button @click="currentPage = Math.max(1, currentPage - 1)" :disabled="currentPage === 1">이전</button>
          <span>페이지 {{ paginatedProducts.currentPage }} / {{ paginatedProducts.totalPages }}</span>
          <button @click="currentPage = Math.min(paginatedProducts.totalPages, currentPage + 1)" :disabled="currentPage === paginatedProducts.totalPages">다음</button>
        </div>
      </template>
      <p v-else class="noResult">결과 없음</p>
    </div>

    <div class="section">
      <h3>문제 10: 부서별 요약 (getDepartmentSummary)</h3>
      <table v-if="Object.keys(departmentSummary).length > 0" class="table">
        <thead><tr><th>부서</th><th>인원수</th><th>평균 연령</th></tr></thead>
        <tbody>
          <tr v-for="([dept, summary]) in Object.entries(departmentSummary)" :key="dept">
            <td>{{ dept }}</td>
            <td>{{ summary.userCount }}명</td>
            <td>{{ summary.averageAge.toFixed(1) }}세</td>
          </tr>
        </tbody>
      </table>
      <p v-else class="noResult">결과 없음</p>
    </div>
  </div>
</template>

<style scoped>
.container { display: grid; gap: 16px; }
.section { border: 1px solid var(--border); padding: 12px; border-radius: 10px; }
.table { width: 100%; border-collapse: collapse; }
.table th, .table td { border: 1px solid var(--border); padding: 6px 8px; text-align: left; }
.paginationControls { display: flex; gap: 8px; align-items: center; }
.list { margin: 0; padding-left: 18px; }
.noResult { color: var(--muted); }
</style>
