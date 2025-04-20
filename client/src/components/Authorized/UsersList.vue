<template>
    <div>
        <main class="wrapper">
            <AddUser @closeAddUser="isOpenAddUser = false" v-if="isOpenAddUser"></AddUser>

            <header>
                <h2>Пользователи</h2>
                <nav>
                    <img class="icon" src="../../../public/img/useradd.svg" alt="Добавить пользователя"
                        title="Добавить пользователя" @click="this.isOpenAddUser = true">
                </nav>
            </header>

            <div class="users">
                <div class="users__item" v-for="(item, index) in USERS_LIST" :key="index">
                    <p>{{ item.last_name }} {{ item.first_name }}</p>
                    <p>Контакты: {{ item.phone_number }}</p>
                    <p>Статус: {{ item.role }}</p>
                </div>

                <div class="loading" v-if="!USERS_LIST.length"></div>
            </div>

        </main>
    </div>
</template>

<script>
import axios from 'axios';
import AddUser from './AddUser.vue';

export default {
    components: { AddUser },
    data() {
        return {
            USERS_LIST: [],
            isOpenAddUser: false
        }
    },
    mounted() {
        this.downloadUsers()
    },
    methods: {
        async downloadUsers() {
            await axios.post('/server/from-admin/downloadUsers')
                .then((result) => {
                    this.USERS_LIST = result.data
                })
                .catch((error) => {
                    console.error(error);
                })
        }
    },
}
</script>

<style scoped>
.users {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
}

.users__item {
    border-radius: 10px;
    border: 1px solid var(--color_accent_gray);
    padding: 10px;
    display: grid;
    grid-template: repeat(2, auto) / repeat(3, 1fr);
}

.wrapper header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>