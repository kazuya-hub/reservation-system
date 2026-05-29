<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import { signupSteps } from "@/constants/signup";
import { requestRegisterComplete } from "@/services/auth";
import SignupStepIndicator from "@/components/SignupStepIndicator.vue";

const route = useRoute();
const router = useRouter();
const token = route.query.token as string || "";

const loginId = ref("");
const password = ref("");
const confirmPassword = ref("");

const canSubmit = computed(() => {
    return loginId.value !== ""
        && password.value !== ""
        && password.value === confirmPassword.value;
});

async function submitProfile() {
    if (!canSubmit.value) {
        return;
    }

    try {
        await requestRegisterComplete(token, loginId.value, password.value);
        router.push("/signup-completed");
    } catch (error) {
        console.error(error);
    }
}

</script>


<template>
    <h2>会員情報入力</h2>
    <SignupStepIndicator :step="signupSteps.profileSetup" />

    <div class="content-container">
        <div class="input-fields">
            <div class="input-item">
                <label for="loginId">ログインID</label>
                <input type="text" id="loginId" placeholder="ログインID" v-model="loginId">
                <span class="error-message">テスト</span>
            </div>
            <div class="input-item">
                <label for="password">パスワード</label>
                <input type="password" id="password" placeholder="パスワード" v-model="password">
                <span class="error-message">テスト</span>
            </div>
            <div class="input-item">
                <label for="confirmPassword">パスワード（確認）</label>
                <input type="password" id="confirmPassword" placeholder="パスワード（確認）" v-model="confirmPassword">
                <span class="error-message">テスト</span>
            </div>
        </div>
        <div class="actions">
            <button class="submit-button" @click="submitProfile" :disabled="!canSubmit">登録する</button>
        </div>
    </div>
</template>

<style scoped>
.content-container {
    margin: 48px auto;
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.input-fields {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.input-item {
    display: flex;
    flex-direction: row;
    gap: 8px;
}

label {
    width: 140px;
    font-size: 14px;
    color: #374151;
}

.error-message {
    color: #f87171;
}

.actions {
    margin-top: 48px;
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>
