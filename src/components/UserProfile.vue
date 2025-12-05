<script setup lang="ts">
// --- 데이터 타입 정의 ---
interface User {
  id: number;
  name: string;
  username: string;
  bio: string;
  avatarUrl: string;
}

interface UserStats {
  posts: number;
  followers: number;
  following: number;
}

interface Post {
  id: number;
  imageUrl: string;
  caption: string;
}

defineProps<{
  user: User;
  stats: UserStats;
  posts: Post[];
}>();

/**
 * ## UI 문제 1: 컴포넌트 리팩토링
 *
 * 이 컴포넌트는 사용자 프로필 페이지를 렌더링합니다.
 * 현재는 하나의 컴포넌트에 모든 UI가 들어가 있어 재사용성과 가독성이 떨어집니다.
 *
 * ### 요구사항:
 * 1. 이 파일을 의미 있는 단위의 여러 작은, 재사용 가능한 컴포넌트로 분리하세요.
 *   - 컴포넌트의 이름과 구조는 자유롭게 결정하되, 왜 그렇게 분리했는지 논리적으로 설명할 수 있어야 합니다.
 * 2. 분리된 컴포넌트들은 `props` 로 필요한 데이터만 전달받아야 합니다.
 * 3. 최종적으로 `UserProfile` 은 분리된 컴포넌트들을 조합하여 동일한 UI를 렌더링해야 합니다.
 * 4. 각 컴포넌트는 scoped 스타일을 사용하세요.
 *
 */
</script>

<template>
  <div class="profileContainer">
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

    <!-- 4. 게시물 그리드 -->
    <main class="postsGrid">
      <div v-for="post in posts" :key="post.id" class="postItem">
        <img :src="post.imageUrl" :alt="post.caption" class="postImage" />
      </div>
    </main>
  </div>
</template>

<style scoped>
.profileContainer { display: grid; gap: 16px; }
.profileHeader { display: flex; align-items: center; gap: 12px; }
.avatarContainer { width: 80px; height: 80px; }
.avatar { width: 80px; height: 80px; border-radius: 9999px; object-fit: cover; }
.userInfoContainer { display: flex; align-items: center; gap: 12px; }
.username { font-size: 20px; margin: 0; }
.userInfoSection { color: var(--muted); }
.name { margin: 0; color: var(--fg); }
.statsSection { display: flex; gap: 24px; }
.statItem { display: grid; }
.statValue { font-weight: 700; font-size: 18px; }
.statLabel { color: var(--muted); }
.postsGrid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
.postItem { aspect-ratio: 1/1; overflow: hidden; border-radius: 8px; }
.postImage { width: 100%; height: 100%; object-fit: cover; }
</style>
