<script setup lang="ts">
import { type SignupStep, stepLabels } from '@/constants/signup';

defineProps<{ step: SignupStep }>();
</script>

<template>
    <div class="signup-step-indicator">
        <ul>
            <li v-for="(label, key) in stepLabels" :key="key" :class="{ active: key === step }">
                {{ label }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
.signup-step-indicator ul {
    margin: 0;
    padding: 0;
    list-style: none;

    display: flex;
    align-items: stretch;
}

.signup-step-indicator li {
    flex: 1;
    position: relative;

    background-color: #f3f4f6;
    border: 1px solid #d1d5db;
    padding: 12px 16px;
    text-align: center;
    font-weight: 500;
    font-size: 14px;

    display: flex;
    align-items: center;
    justify-content: center;
}

.signup-step-indicator li:first-child {
    border-radius: 4px 0 0 4px;
}

.signup-step-indicator li:last-child {
    border-radius: 0 4px 4px 0;
}

/* ステップ間の矢印 */
.signup-step-indicator li:not(:last-child)::after {
    content: "";
    position: absolute;
    right: -12px;
    top: 50%;
    transform: translateY(-50%);

    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 8px solid #d1d5db;

    z-index: 10;
}

/* アクティブなステップとそれ以前のステップのスタイル */
.signup-step-indicator li.active {
    background-color: #3b82f6;
    color: #ffffff;
    border-color: #3b82f6;
}

.signup-step-indicator li.active::after {
    border-left-color: #3b82f6;
}
</style>
