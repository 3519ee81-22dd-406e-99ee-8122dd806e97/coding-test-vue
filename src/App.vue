<script setup lang="ts">
import { ref, computed } from 'vue';
import UserProfile from './components/UserProfile.vue';
import ProductSearch from './components/ProductSearch.vue';
import DataDisplay from './components/DataDisplay.vue';
import BuggyCart from './components/BuggyCart.vue';
import CodeReviewChallenge from './components/CodeReviewChallenge.vue';

type Tab = 'ui' | 'async' | 'data' | 'bug' | 'review';
const activeTab = ref<Tab>('ui');

const mockUserProfile = {
  user: {
    id: 1,
    name: '신입개발',
    username: 'newbie.dev',
    bio: '프론트엔드 개발자를 꿈꾸고 있습니다. Vue와 TypeScript에 관심이 많습니다.',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
  },
  stats: { posts: 123, followers: 456, following: 789 },
  posts: Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    imageUrl: `https://picsum.photos/id/${i + 10}/300/300`,
    caption: `게시물 ${i + 1}`
  }))
};

const content = computed(() => activeTab.value);
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1>FE 신입 개발자 코딩 테스트</h1>
      <nav class="app-nav">
        <button :class="{ active: content === 'ui' }" @click="activeTab = 'ui'">과제 1: UI 리팩토링</button>
        <button :class="{ active: content === 'async' }" @click="activeTab = 'async'">과제 2: Debounce 구현</button>
        <button :class="{ active: content === 'data' }" @click="activeTab = 'data'">과제 3: 데이터 조작</button>
        <button :class="{ active: content === 'bug' }" @click="activeTab = 'bug'">과제 4: 버그 수정</button>
        <button :class="{ active: content === 'review' }" @click="activeTab = 'review'">과제 5: 코드 리뷰</button>
      </nav>
    </header>
    <main class="app-content">
      <UserProfile v-if="content === 'ui'" v-bind="mockUserProfile" />
      <ProductSearch v-else-if="content === 'async'" />
      <DataDisplay v-else-if="content === 'data'" />
      <BuggyCart v-else-if="content === 'bug'" />
      <CodeReviewChallenge v-else />
    </main>
  </div>
  
</template>

<style scoped>
.app-container { max-width: 980px; margin: 0 auto; padding: 24px; }
.app-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.app-nav { display: flex; gap: 8px; flex-wrap: wrap; }
.app-nav > button { padding: 8px 12px; border-radius: 6px; border: 1px solid #ddd; background: #9e9e9e; cursor: pointer; }
.app-nav > button.active { background: #111; color: #fff; border-color: #111; }
.app-content { margin-top: 20px; }
</style>
