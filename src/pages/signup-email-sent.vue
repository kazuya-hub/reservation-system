
<script setup lang="ts">
import { signupSteps } from "@/constants/signup";
import SignupStepIndicator from "@/components/SignupStepIndicator.vue";
</script>

<template>
    <h2>メール受信確認</h2>
    <SignupStepIndicator :step="signupSteps.emailSent" />

    <div class="content-container">
        <p>ご入力いただいたメールアドレスに確認メールを送信しました。メール本文に記載の手順に従って手続きをお願いいたします。</p>
        <RouterLink to="/signup-form" class="link-to-login router-link-as-button">（仮置き）会員情報入力へ</RouterLink>
    </div>
</template>

<style scoped>
.content-container {
    margin: 48px auto;
    width: 80%;
}

</style>
