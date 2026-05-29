
<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

import LessonDetail from "@/components/LessonDetail.vue";
import LessonReservationModal from "@/components/LessonReservationModal.vue";
import { reserveLesson } from "@/services/reservationApi.ts";


const route = useRoute();
const router = useRouter();
const lessonId = Number(route.query.id) || 1;
const isReserveModalOpen = ref(false);

function handleOpenReserveModal() {
    isReserveModalOpen.value = true;
}

function handleCloseReserveModal() {
    isReserveModalOpen.value = false;
}

async function handleConfirmReserve() {
    await reserveLesson(lessonId);
    isReserveModalOpen.value = false;
    router.push("/reservation-completed?id=" + lessonId);
}

</script>

<template>
    <LessonDetail :id="lessonId" />

    <div class="actions">
        <button type="button" class="reserve-button" @click="handleOpenReserveModal">このレッスンを予約する</button>
    </div>

    <LessonReservationModal
        v-if="isReserveModalOpen"
        :id="lessonId"
        @close="handleCloseReserveModal"
        @confirm="handleConfirmReserve"
    />
</template>

<style scoped>
.actions {
    margin-top: 24px;
    display: flex;
    justify-content: center;
}

.reserve-button {
    padding: 10px 16px;
    border: 1px solid #2563eb;
    border-radius: 4px;
    background-color: #2563eb;
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
}
</style>
