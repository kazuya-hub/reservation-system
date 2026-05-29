<script setup lang="ts">

import { computed } from "vue";

import { useRouter } from "vue-router";

import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import type { Lesson } from "@/services/lessonsApi.ts";

const props = defineProps<{
    lessons: Lesson[]
}>();

const router = useRouter();

const events = computed(() => {
    return props.lessons
        .map(lesson => ({
            title: lesson.lesson_series_name || "レッスン",
            date: lesson.start_at.split("T")[0],
            id: lesson.lesson_id.toString(),
        }));
});

const calendarOptions = computed(() => ({
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: "dayGridMonth",
    dateClick: handleDateClick,
    eventClick: handleEventClick,
    events: events.value
}));

function handleDateClick(arg: any) {
    alert(arg.dateStr);
}

function handleEventClick(arg: any) {
    router.push(`/lesson-detail?id=${arg.event.id}`);
}

</script>

<template>
    <FullCalendar v-bind:options="calendarOptions" v-on:dateClick="handleDateClick" />
</template>

<style scoped>

:deep(.fc-event-title) {
  white-space: nowrap;     
  overflow: hidden;        
  text-overflow: ellipsis; 
}


</style>
