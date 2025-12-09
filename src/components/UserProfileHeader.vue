<script setup lang="ts">
// --- 데이터 타입 정의 ---
interface User {
  name: string;
  username: string;
  avatarUrl: string;
}

defineProps<{
  user: User;
}>();
</script>

<template>
  <!-- 1. 프로필 헤더 -->
  <header class="profileHeader">
    <div class="avatarContainer">
      <img :src="user.avatarUrl" :alt="`${user.name}'s avatar`" class="avatar" />
    </div>
    <div class="userInfoContainer">
      <h2 class="username">{{ user.username }}</h2>
    </div>
  </header>
</template>

<style scoped>
.profileHeader {
  display: flex;
  align-items: center;
  gap: 12px;
}
.avatarContainer {
  width: 80px;
  height: 80px;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 9999px;
  object-fit: cover;
}
.userInfoContainer {
  display: flex;
  align-items: center;
  gap: 12px;
}
.username {
  font-size: 20px;
  margin: 0;
}
</style>
