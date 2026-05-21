<script setup lang="ts">
import { signupSteps } from "@/constants/signup";
import SignupStepIndicator from "@/components/SignupStepIndicator.vue";

</script>


<template>
    <h2>会員情報入力</h2>
    <SignupStepIndicator :step="signupSteps.profileSetup" />

    <div class="content-container">
        <div class="input-fields">
            <div class="input-item">
                <label for="loginId">ログインID</label>
                <input type="text" id="loginId" placeholder="ログインID">
                <span class="error-message">テスト</span>
            </div>
            <div class="input-item">
                <label for="password">パスワード</label>
                <input type="password" id="password" placeholder="パスワード">
                <span class="error-message">テスト</span>
            </div>
            <div class="input-item">
                <label for="confirmPassword">パスワード（確認）</label>
                <input type="password" id="confirmPassword" placeholder="パスワード（確認）">
                <span class="error-message">テスト</span>
            </div>
        </div>
        <div class="actions">
            <RouterLink to="/signup-completed" class="submit-button router-link-as-button">登録する</RouterLink>
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
