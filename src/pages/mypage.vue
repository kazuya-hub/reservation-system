
<script setup lang="ts">
import LessonCalendar from "@/components/LessonCalendar.vue";
</script>

<template>
    <h2>マイページ</h2>
    <h3>予約状況</h3>
    <LessonCalendar />
    <div class="actions">
        <RouterLink to="/mypage/lesson-calendar" class="router-link-as-button">予約の確認・変更</RouterLink>
        <button>ログアウトする</button>
    </div>
</template>
