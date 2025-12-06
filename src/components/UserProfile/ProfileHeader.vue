<script setup>
  import { defineProps } from 'vue';
    const props = defineProps({
        user : Object
    })
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

    <!-- 2. 사용자 정보 -->
    <section class="userInfoSection">
      <h1 class="name">{{ user.name }}</h1>
      <p class="bio">{{ user.bio }}</p>
    </section>
</template>
<style scoped>
.profileHeader { display: flex; align-items: center; gap: 12px; }
.avatarContainer { width: 80px; height: 80px; }
.avatar { width: 80px; height: 80px; border-radius: 9999px; object-fit: cover; }
.userInfoSection { color: var(--muted); }
.userInfoContainer { display: flex; align-items: center; gap: 12px; }
.username { font-size: 20px; margin: 0; }
.name { margin: 0; color: var(--fg); }


</style>