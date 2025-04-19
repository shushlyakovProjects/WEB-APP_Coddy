<template>
    <div>
        <main>
            <EditAdmin @closeAdminSettings="isOpenAdminSettings = false" v-if="isOpenAdminSettings"></EditAdmin>

            <div class="header">
                <h2>{{ getCurrentUser.last_name }} {{ getCurrentUser.first_name }}</h2>
                <nav>
                    <img class="icon" src="../../../public/img/settings.svg" alt="Настройки" title="Редактировать профиль"
                        @click="this.isOpenAdminSettings = true">
                </nav>
            </div>
            <div class="info1">
                <ul>
                    <li> <span>Роль</span><br>
                        {{ getCurrentUser.role }}</li>
                    <li> <span>Номер телефона</span><br>
                        {{ getCurrentUser.phone_number }}</li>
                    <li> <span>Email</span><br>
                        {{ getCurrentUser.email }}</li>
                </ul>
            </div>
            <div class="info2"></div>


        </main>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import EditAdmin from './EditAdmin.vue';

export default {
    components: { EditAdmin },
    data() {
        return {
            isOpenAdminSettings: false,
        }
    },
    mounted() { this.$store.dispatch('checkAuthorization', this.$router) },
    computed: { ...mapGetters(['getCurrentUser']) },
}
</script>

<style scoped>
nav {
    display: flex;
    align-items: center;
}

main {
    display: grid;
    grid-template: auto 300px / 25% 1fr;
    grid-template-areas:
        'header header'
        'info1 info2'
    ;
    gap: 10px;
    overflow-wrap: break-word;
}

main>* {
    background-color: var(--color_background-3_white);
    padding: 10px;
    border-radius: 10px;
}

.header {
    grid-area: header;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.info1 {
    grid-area: info1;
}

.info1 ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.info1 span {
    color: var(--color_accent_lightBlue);
}

.info2 {
    grid-area: info2;
}
</style>