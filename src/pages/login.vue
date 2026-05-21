
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function handleLogin(event: Event) {
    event.preventDefault();

    // ログイン処理の実装（例: API呼び出し、バリデーションなど）
    console.log("ログイン処理を実行");

    if (Math.random() > 0.5) {
        // ログイン成功
        console.log("ログイン成功");
        router.push("/mypage");

    } else {
        // ログイン失敗
        console.log("ログイン失敗");
        router.push("/login-error");
    }

}
</script>

<template>
    <h2>ログイン</h2>

    <div class="login-layout">
        <section class="left-column">
            <div class="field-row">
                <label for="login-id">ログインID</label>
                <input id="login-id" type="text" placeholder="ログインIDを入力" />
            </div>

            <div class="field-row">
                <label for="password">パスワード</label>
                <input id="password" type="password" placeholder="パスワードを入力" />
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
