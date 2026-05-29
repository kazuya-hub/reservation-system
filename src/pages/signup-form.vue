<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import { signupSteps } from "@/constants/signup";
import { validatePublicUserId, validatePassword, fetchPublicUserIdAvailability, requestRegisterComplete } from "@/services/auth";
import SignupStepIndicator from "@/components/SignupStepIndicator.vue";

const route = useRoute();
const router = useRouter();
const token = route.query.token as string || "";

const loginId = ref("");
const password = ref("");
const confirmPassword = ref("");

const loginIdError = ref("");
const passwordError = ref("");
const confirmPasswordError = ref("");

const canSubmit = computed(() => {
    return loginId.value !== ""
        && password.value !== ""
        && password.value === confirmPassword.value
        && loginIdError.value === ""
        && passwordError.value === ""
        && confirmPasswordError.value === "";
});

function handleIdInput() {
    const trimmedLoginId = loginId.value.trim();
    if (trimmedLoginId === "") {
        return;
    }

    const validationResult = validatePublicUserId(trimmedLoginId);
    if (!validationResult.valid) {
        loginIdError.value = validationResult.reason || "不正なIDです";
    } else {
        loginIdError.value = "";
    }
}

function handlePasswordInput() {
    const trimmedPassword = password.value.trim();
    if (trimmedPassword === "") {
        return;
    }

    const validationResult = validatePassword(trimmedPassword);
    if (!validationResult.valid) {
        passwordError.value = validationResult.reason || "不正なパスワードです";
    } else {
        passwordError.value = "";
    }
}

function handleConfirmPasswordInput() {
    if (confirmPassword.value !== password.value) {
        confirmPasswordError.value = "パスワードが一致しません";
    } else {
        confirmPasswordError.value = "";
    }
}

async function submitProfile() {
    if (!canSubmit.value) {
        return;
    }

    try {
        const isUserIdAvailable = await fetchPublicUserIdAvailability(loginId.value);
        if (!isUserIdAvailable) {
            loginIdError.value = "このIDは既に使用されています";
            return;
        }

        await requestRegisterComplete(token, loginId.value, password.value);
        router.push("/signup-completed");
    } catch (error) {
        console.error(error);
    }
}

</script>

<route lang="yaml">
    meta:
        requiresGuest: true
</route>


<template>
    <h2>会員情報入力</h2>
    <SignupStepIndicator :step="signupSteps.profileSetup" />

    <div class="content-container">
        <div class="input-fields">
            <div class="input-item">
                <label for="loginId">ログインID</label>
                <input type="text" id="loginId" placeholder="ログインID" v-model="loginId" v-on:input="handleIdInput">
                <span class="error-message">{{ loginIdError }}</span>
            </div>
            <div class="input-item">
                <label for="password">パスワード</label>
                <input type="password" id="password" placeholder="パスワード" v-model="password" v-on:input="handlePasswordInput">
                <span class="error-message">{{ passwordError }}</span>
            </div>
            <div class="input-item">
                <label for="confirmPassword">パスワード（確認）</label>
                <input type="password" id="confirmPassword" placeholder="パスワード（確認）" v-model="confirmPassword" v-on:input="handleConfirmPasswordInput">
                <span class="error-message">{{ confirmPasswordError }}</span>
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
