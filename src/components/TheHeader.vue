
<template>
    <header>
        <RouterLink to="/" id="site-title">
            <h1>予約システム</h1>
        </RouterLink>
        <nav>
            <ul>
                <li><RouterLink to="/">ホーム</RouterLink></li>
                <li><RouterLink to="/signup-email">新規登録</RouterLink></li>
                <li><RouterLink to="/login">ログイン</RouterLink></li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>

#site-title {
    text-decoration: none;
    color: inherit;
}

header {
    position: sticky;
    top: 0;
    z-index: 1000;

    width: 100%;
    background-color: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

    padding: 16px;

    display: flex;
    align-items: center;
    justify-content: space-between;
}

h1 {
    margin: 0;
}

ul {
    margin: 0;
    padding: 0;
    list-style: none;

    display: flex;
    align-items: center;
    gap: 16px;
}

</style>
