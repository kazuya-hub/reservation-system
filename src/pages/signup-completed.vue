<script setup lang="ts">
import { signupSteps } from "@/constants/signup";
import SignupStepIndicator from "@/components/SignupStepIndicator.vue";

</script>


<template>
    <h2>会員情報入力</h2>
    <SignupStepIndicator :step="signupSteps.completed" />

    <div class="content-container">
        <p>会員登録が完了しました。<br>
            ログインページへ移動して、登録した情報でログインしてください。</p>
        <RouterLink to="/login" class="link-to-login router-link-as-button">ログインページへ</RouterLink>
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

.link-to-login {
    margin-top: 24px;
    display: flex;
    justify-content: center;
}
</style>
