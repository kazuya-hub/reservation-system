
<script setup>

import { ref, onMounted } from "vue";

import LessonCalendar from "@/components/LessonCalendar.vue";

import { getAllLessons } from "@/services/lessonsApi.ts";

const lessons = ref([]);

onMounted(async () => {
    lessons.value = await getAllLessons();
});

</script>

<template>
    <h2>レッスンカレンダー</h2>
    <LessonCalendar :lessons="lessons" />
</template>

