<script setup lang="ts">

const lesson = {
    date: "2026-05-21",
    startTime: "10:00",
    endTime: "11:00",
    studio: "渋谷スタジオ A",
    className: "モーニングヨガ",
    instructorName: "山田 花子",
    reservedCount: 12,
};

</script>

<template>
    <section class="lesson-detail">
        <h2>予約完了</h2>

        <p>下記の内容で予約しました</p>

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
