<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

let loginID = ref("");
let password = ref("");

async function handleLogin(event: Event) {
    event.preventDefault();

    const params = new URLSearchParams()
    params.append("username", loginID.value)
    params.append("password", password.value)

    const response = await fetch(
        "http://127.0.0.1:8000/token",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
        }
    );
    
    if (response.ok) {
        const data = await response.json();
        const accessToken: String = data.access_token;
        // TODO: トークンを保管して再利用する
    } else {
        window.alert("認証に失敗しました");
    }


}
</script>

<template>
    <h2>ログイン</h2>

    <div class="login-layout">
        <section class="left-column">
            <div class="field-row">
                <label for="login-id">ログインID</label>
                <input id="login-id" type="text" v-model=loginID placeholder="ログインIDを入力" />
            </div>

            <div class="field-row">
                <label for="password">パスワード</label>
                <input id="password" type="password" v-model=password placeholder="パスワードを入力" />
            </div>

            <button @click="handleLogin">ログインする</button>
        </section>

        <aside class="right-column">
            <RouterLink to="/signup-email" class="router-link-as-button">新規登録ページへ</RouterLink>
        </aside>
    </div>
</template>

<style scoped>
.login-layout {
    width: 80%;
    margin: 40px auto;
    display: flex;
    gap: 40px;
}

.left-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 36px;
}

.field-row {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.field-row label {
    font-weight: 600;
}

.field-row input {
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font-size: 14px;
}

.right-column {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
