<script setup lang="ts">
// --- 데이터 타입 정의 ---
interface User {
  name: string;
  bio: string;
}

defineProps<{
  user: User;
}>();
</script>

<template>
  <!-- 2. 사용자 정보 -->
  <section class="userInfoSection">
    <h1 class="name">{{ user.name }}</h1>
    <p class="bio">{{ user.bio }}</p>
  </section>
</template>

<style scoped>
.name {
  margin: 0;
  color: var(--fg);
}
</style>
