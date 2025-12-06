<script setup>
  import { defineProps } from 'vue';
    const props = defineProps({
        stats : Object
    })
</script>
<template>
    <!-- 3. 사용자 통계 -->
    <section class="statsSection">
      <div class="statItem">
        <span class="statValue">{{ stats.posts }}</span>
        <span class="statLabel">게시물</span>
      </div>
      <div class="statItem">
        <span class="statValue">{{ stats.followers }}</span>
        <span class="statLabel">팔로워</span>
      </div>
      <div class="statItem">
        <span class="statValue">{{ stats.following }}</span>
        <span class="statLabel">팔로잉</span>
      </div>
    </section>
</template>

<style scoped>
.statsSection { display: flex; gap: 24px; }
.statItem { display: grid; }
.statValue { font-weight: 700; font-size: 18px; }
.statLabel { color: var(--muted); }
</style>