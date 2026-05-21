
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const lesson = {
    date: "2026-05-21",
    startTime: "10:00",
    endTime: "11:00",
    studio: "渋谷スタジオ A",
    className: "モーニングヨガ",
    instructorName: "山田 花子",
    reservedCount: 12,
};

const isReserveModalOpen = ref(false);

function handleReserveButtonClick() {
    isReserveModalOpen.value = true;
}

function handleCancelReserve() {
    isReserveModalOpen.value = false;
}

function handleConfirmReserve() {
    // TODO: 予約API連携時にここへ処理を実装
    router.push("/reservation-completed");
    isReserveModalOpen.value = false;
}
</script>

<template>
    <section class="lesson-detail">
        <h2>レッスン情報</h2>

        <dl class="detail-list">
            <div class="detail-row">
                <dt>日付</dt>
                <dd>{{ lesson.date }}</dd>
            </div>
            <div class="detail-row">
                <dt>開始時間 / 終了時間</dt>
                <dd>{{ lesson.startTime }} - {{ lesson.endTime }}</dd>
            </div>
            <div class="detail-row">
                <dt>実施スタジオ</dt>
                <dd>{{ lesson.studio }}</dd>
            </div>
            <div class="detail-row">
                <dt>クラス名</dt>
                <dd>{{ lesson.className }}</dd>
            </div>
            <div class="detail-row">
                <dt>講師名</dt>
                <dd>{{ lesson.instructorName }}</dd>
            </div>
            <div class="detail-row">
                <dt>予約済み人数</dt>
                <dd>{{ lesson.reservedCount }} 人</dd>
            </div>
        </dl>

        <div class="actions">
            <button type="button" class="reserve-button" @click="handleReserveButtonClick">このレッスンを予約する</button>
        </div>

        <div v-if="isReserveModalOpen" class="modal-overlay" @click.self="handleCancelReserve">
            <section class="reserve-modal" role="dialog" aria-modal="true" aria-labelledby="reserve-modal-title">
                <h3 id="reserve-modal-title">このレッスンを予約しますか？</h3>

                <dl class="detail-list modal-detail-list">
                    <div class="detail-row">
                        <dt>日付</dt>
                        <dd>{{ lesson.date }}</dd>
                    </div>
                    <div class="detail-row">
                        <dt>開始時間 / 終了時間</dt>
                        <dd>{{ lesson.startTime }} - {{ lesson.endTime }}</dd>
                    </div>
                    <div class="detail-row">
                        <dt>実施スタジオ</dt>
                        <dd>{{ lesson.studio }}</dd>
                    </div>
                    <div class="detail-row">
                        <dt>クラス名</dt>
                        <dd>{{ lesson.className }}</dd>
                    </div>
                    <div class="detail-row">
                        <dt>講師名</dt>
                        <dd>{{ lesson.instructorName }}</dd>
                    </div>
                    <div class="detail-row">
                        <dt>予約済み人数</dt>
                        <dd>{{ lesson.reservedCount }} 人</dd>
                    </div>
                </dl>

                <div class="modal-actions">
                    <button type="button" class="cancel-button" @click="handleCancelReserve">キャンセル</button>
                    <button type="button" class="reserve-button" @click="handleConfirmReserve">予約する</button>
                </div>
            </section>
        </div>
    </section>
</template>

<style scoped>
.lesson-detail {
    margin: 40px auto;
    width: 80%;
}

.detail-list {
    margin: 24px 0 0;
    padding: 0;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
}

.detail-row {
    display: flex;
    border-bottom: 1px solid #e5e7eb;
}

.detail-row:last-child {
    border-bottom: none;
}

.detail-row dt {
    width: 220px;
    margin: 0;
    padding: 12px 16px;
    background-color: #f9fafb;
    font-weight: 600;
}

.detail-row dd {
    margin: 0;
    padding: 12px 16px;
}

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
    width: min(720px, 100%);
    max-height: 85vh;
    overflow-y: auto;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px;
}

.reserve-modal h3 {
    margin: 0;
}

.modal-detail-list {
    margin-top: 16px;
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
</style>
