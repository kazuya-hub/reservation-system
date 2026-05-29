<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

import type { Lesson } from "@/services/lessonsApi.ts";
import { getLessonById } from "@/services/lessonsApi.ts";

const props = defineProps<{
    id: number;
}>();

const lesson = ref({} as Lesson);

onMounted(async () => {
	lesson.value = await getLessonById(props.id);
});

const date = computed(() => {
    if (!lesson.value.start_at) {
        return "";
    }
    return lesson.value.start_at.split("T")[0];
});

const startTime = computed(() => {
    if (!lesson.value.start_at) {
        return "";
    }
    return (lesson.value.start_at.split("T") as [string, string])[1].slice(0, 5);
});

const endTime = computed(() => {
    if (!lesson.value.end_at) {
        return "";
    }
    return (lesson.value.end_at.split("T") as [string, string])[1].slice(0, 5);
});

</script>

<template>
	<section class="lesson-detail">
		<h2>レッスン情報</h2>

		<dl class="detail-list">
			<div class="detail-row">
				<dt>日付</dt>
				<dd>{{ date }}</dd>
			</div>
			<div class="detail-row">
				<dt>開始時間 / 終了時間</dt>
				<dd>{{ startTime }} - {{ endTime }}</dd>
			</div>
			<div class="detail-row">
				<dt>実施スタジオ</dt>
				<dd>{{ lesson.studio_name }}</dd>
			</div>
			<div class="detail-row">
				<dt>クラス名</dt>
				<dd>{{ lesson.lesson_series_name }}</dd>
			</div>
			<div class="detail-row">
				<dt>講師名</dt>
				<dd>{{ lesson.teacher_name }}</dd>
			</div>
			<div class="detail-row">
				<dt>予約済み人数</dt>
				<dd>{{ lesson.current_reservations }} 人 / {{ lesson.max_reservations }} 人</dd>
			</div>
		</dl>
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

</style>
