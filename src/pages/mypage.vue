
<script setup lang="ts">
import LessonCalendar from "@/components/LessonCalendar.vue";
import { useRouter } from "vue-router";

const router = useRouter();

function handleLogout() {
    // TODO: ログアウト処理を実装
    router.push("/login");
}

</script>

<template>
    <h2>マイページ</h2>
    <h3>予約状況</h3>
    <LessonCalendar />
    <div class="actions">
        <RouterLink to="/lesson-calendar" class="router-link-as-button">レッスンを予約する</RouterLink>
        <button @click="handleLogout">ログアウトする</button>
    </div>
</template>
