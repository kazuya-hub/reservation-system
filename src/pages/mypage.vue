<script setup lang="ts">
import { ref, onMounted } from "vue"
import LessonCalendar from "@/components/LessonCalendar.vue";
import { useRouter } from "vue-router";

import * as auth from "@/services/auth.ts";
import * as lessonsApi from "@/services/lessonsApi.ts";

const router = useRouter();

function handleLogout() {
    auth.logout();
    router.push("/login");
}



const myReservedLessons = ref<lessonsApi.Lesson[]>([]);

onMounted(async () => {
    const reservationsData = await lessonsApi.getMyReservedLessons();
    myReservedLessons.value = reservationsData;
});

</script>

<route lang="yaml">
    meta:
        requiresAuth: true
</route>

<template>
    <h2>マイページ</h2>
    <h3>予約状況</h3>
    <LessonCalendar :lessons="myReservedLessons" />
    <div class="actions">
        <RouterLink to="/lesson-calendar" class="router-link-as-button">レッスンを予約する</RouterLink>
        <button @click="handleLogout">ログアウトする</button>
    </div>
</template>
