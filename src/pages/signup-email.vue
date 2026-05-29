<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import { signupSteps } from "@/constants/signup";
import { requestEmailVerification } from "@/services/auth";

import SignupStepIndicator from "@/components/SignupStepIndicator.vue";


const email = ref("");
const router = useRouter();

async function submitEmail() {
    try {
        const emailTrimmed = email.value.trim();
        if (emailTrimmed === "") {
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailTrimmed)) {
            // 簡単なメールアドレスの形式チェック
            alert("有効なメールアドレスを入力してください");
            return;
        }

        await requestEmailVerification(email.value);
        router.push("/signup-email-sent");
    } catch (error) {
        // エラー処理
        console.error(error);
    }
}

</script>


<template>
    <h2>新規登録</h2>
    <SignupStepIndicator :step="signupSteps.emailInput" />

    <div class="content-container">
        <div class="left-column">
            <input type="email" placeholder="メールアドレス" v-model="email" />
            <button @click="submitEmail" class="link-to-login router-link-as-button">登録する</button>
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
