<script setup lang="ts">
import ProfileHeader from './UserProfile/ProfileHeader.vue';
import UserStats from './UserProfile/UserStats.vue';
import PostGrid from './UserProfile/PostGrid.vue';

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
 * 
 * 
 */
</script>

<template>
  <div class="profileContainer">
    <!-- 궁극적으로 데이터 구조와 화면 구조를 사용했을 때 Props drilling을 가장 적게 하면서도 화면의 영역별로 쪼갤 수 있도록 컴포넌트를 분리했습니다. -->
    <ProfileHeader :user="user"/>
    <UserStats :stats="stats"/>
    <PostGrid :posts="posts"/>
  </div>
</template>

<style scoped>
.profileContainer { display: grid; gap: 16px; }

</style>
