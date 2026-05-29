<script setup lang="ts">

import { useRoute } from "vue-router";

import LessonDetail from "@/components/LessonDetail.vue";

const route = useRoute();
const lessonId = Number(route.query.id) || 1;

</script>

<template>
    <section class="lesson-detail">
        <h2>予約完了</h2>

        <p>下記の内容で予約しました</p>

        <LessonDetail :id="lessonId" />

        <div class="actions">
            <RouterLink to="/mypage" class="router-link-as-button">マイページに戻る</RouterLink>
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
</style>
