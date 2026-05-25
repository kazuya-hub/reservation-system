<script setup lang="ts">
import { ref, onMounted } from "vue"
import LessonCalendar from "@/components/LessonCalendar.vue";
import { useRouter } from "vue-router";

import * as auth from "@/services/auth.ts";
import * as userApi from "@/services/userApi.ts";

const router = useRouter();

function handleLogout() {
    auth.logout();
    router.push("/login");
}



let pageContents = ref("");

onMounted(async () => {
    const data = await userApi.getCurrentUser();
    pageContents.value = JSON.stringify(data, null, 4);
});

</script>

<route lang="yaml">
    meta:
        requiresAuth: true
</route>

<template>
    <h2>マイページ</h2>
    <h3>予約状況</h3>
    <div style="white-space: pre-wrap">
        {{ pageContents }}
    </div>
    <LessonCalendar />
    <div class="actions">
        <RouterLink to="/lesson-calendar" class="router-link-as-button">レッスンを予約する</RouterLink>
        <button @click="handleLogout">ログアウトする</button>
    </div>
</template>
