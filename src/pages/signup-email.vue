<script setup lang="ts">
import { signupSteps } from "@/constants/signup";
import SignupStepIndicator from "@/components/SignupStepIndicator.vue";

</script>


<template>
    <h2>新規登録</h2>
    <SignupStepIndicator :step="signupSteps.emailInput" />

    <div class="content-container">
        <div class="left-column">
            <input type="email" placeholder="メールアドレス" />
            <RouterLink to="/signup-email-sent" class="link-to-login router-link-as-button">登録する</RouterLink>
        </div>
        
        <div class="right-column">
            <p>既に登録済みの方は</p>
            <RouterLink to="/login" class="link-to-login router-link-as-button">ログインページへ</RouterLink>
        </div>
    </div>
</template>

<style scoped>

.content-container {
    margin: 48px auto;
    display: flex;
    gap: 40px;
}

.left-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.left-column input {
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font-size: 14px;
}

.right-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
}

.right-column p {
    margin: 0;
    font-size: 14px;
    color: #6b7280;
}

</style>
