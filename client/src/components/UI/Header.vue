<template>
    <header>
        <h2 class="logo">Ментор CODDY</h2>
        <nav>
            <router-link class="link" to="/">Главная</router-link>
            <router-link class="link" to="/mentor/mentee-list">Менти</router-link>
            <router-link class="link" to="/mentor/users-list" v-if="currentUser.role=='admin'">Пользователи</router-link>
            <router-link class="link" to="/mentor/lk">Профиль</router-link>
            <a class="link" @click.prevent="logout">Выйти</a>
        </nav>
    </header>
</template>

<script>
export default {
    props: ['currentUser'],
    methods: {
        logout() {
            document.cookie = 'ACCESS_TOKEN = ; max-age=-1 ; path=/'
            this.$store.dispatch('checkAuthorization', this.$router)
        }
    }
}
</script>

<style scoped>
header {
    background: var(--color_accent_darkBlue);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 60px;
    margin-bottom: 30px;
}

.logo,
.link {
    color: var(--color_accent_gray);
    position: relative;
    z-index: 5;
}

.link::after{
    content: '';
    position: absolute;
    width: 0%;
    height: 1px;
    left: 0;
    bottom: -5px;
    transition-duration: 0.2s;
    background-color: var(--color_accent_gray);
}
.link:hover:after{
    width: 100%;
}

.logo {
    font-size: 28px;
    user-select: none;
}

nav {
    display: flex;
    gap: 20px;
}
</style>