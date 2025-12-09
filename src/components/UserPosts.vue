<script setup lang="ts">
// --- 데이터 타입 정의 ---
interface Post {
  id: number;
  imageUrl: string;
  caption: string;
}
defineProps<{
  posts: Post[];
}>();
</script>

<template>
  <!-- 4. 게시물 그리드 -->
  <main class="postsGrid">
    <div v-for="post in posts" :key="post.id" class="postItem">
      <img :src="post.imageUrl" :alt="post.caption" class="postImage" />
    </div>
  </main>
</template>

<style scoped>
.postsGrid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}
.postItem {
  aspect-ratio: 1/1;
  overflow: hidden;
  border-radius: 8px;
}
.postImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
