<script setup lang="ts">
import LessonDetail from "@/components/LessonDetail.vue";

const props = defineProps<{
    id: number;
}>();

const emit = defineEmits<{
    (e: "close"): void;
    (e: "confirm"): void;
}>();

function handleClose() {
    emit("close");
}

function handleConfirm() {
    emit("confirm");
}
</script>

<template>
    <div class="modal-overlay" @click.self="handleClose">
        <section class="reserve-modal" role="dialog" aria-modal="true" aria-labelledby="reserve-modal-title">
            <h3 id="reserve-modal-title">このレッスンを予約しますか？</h3>

            <LessonDetail :id="props.id" />

            <div class="modal-actions">
                <button type="button" class="cancel-button" @click="handleClose">キャンセル</button>
                <button type="button" class="reserve-button" @click="handleConfirm">予約する</button>
            </div>
        </section>
    </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(17, 24, 39, 0.45);
    padding: 16px;
}

.reserve-modal {
    width: min(900px, 100%);
    max-height: 85vh;
    overflow-y: auto;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px;
}

.reserve-modal h3 {
    margin: 0;
}

.modal-actions {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}

.cancel-button {
    padding: 10px 16px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    background-color: #ffffff;
    color: #374151;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
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

:deep(.lesson-detail) {
    margin: 16px 0 0;
    width: 100%;
}
</style>
