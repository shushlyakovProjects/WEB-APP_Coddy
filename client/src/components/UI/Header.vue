<template>
    <header>
        <h2 class="logo">Ментор CODDY</h2>
        <nav>
            <router-link class="link" to="/">Главная</router-link>
            <router-link class="link" to="/mentor/ls">Профиль</router-link>
        </nav>
    </header>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
header{
    background: var(--color_accent_darkBlue);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 60px;
    margin-bottom: 30px;
}
.logo, .link{
    color: var(--color_accent_gray);
}
.logo{
    font-size: 28px;
    user-select: none;
}
nav{
    display: flex;
    gap: 20px;
}
</style>