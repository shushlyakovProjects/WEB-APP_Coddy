<template>
    <div>
        <main class="wrapper">
            <AddUser @closeAddUser="isOpenAddUser = false" v-if="isOpenAddUser"></AddUser>
            <EditUser @closeUserSettings="isOpenUserSettings = false" @downloadUsers="downloadUsers" v-if="isOpenUserSettings"
                :selectedUser="this.selectedUser"></EditUser>

            <header>
                <h2>Пользователи</h2>
                <nav>
                    <img class="icon" src="../../../public/img/useradd.svg" alt="Добавить пользователя"
                        title="Добавить пользователя" @click="this.isOpenAddUser = true">
                </nav>
            </header>

            <div class="users">
                <div class="users__item" v-for="(item, index) in USERS_LIST" :key="index">
                    <div><p>{{ item.last_name }} {{ item.first_name }}</p></div>
                    <div>
                        <p>Контакты: {{ item.phone_number }}</p>
                        <p>Email: {{ item.email }}</p>
                    </div>
                    <div>
                        <p>Статус: {{ item.role }}</p>
                    </div>
                    <nav>
                        <img class="icon" src="../../../public/img/settings.svg" alt="Настройки" v-if="item.role!='admin'"
                            title="Найстройки пользователя"
                            @click="this.isOpenUserSettings = true; this.selectedUser = item">
                    </nav>
                </div>

                <div class="loading" v-if="!USERS_LIST.length"></div>
            </div>

        </main>
    </div>
</template>

<script>
import axios from 'axios';
import AddUser from './AddUser.vue';
import EditUser from './EditUser.vue';

export default {
    components: { AddUser, EditUser },
    data() {
        return {
            USERS_LIST: [],
            isOpenAddUser: false,
            isOpenUserSettings: false,
            selectedUser: {}
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
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
}
.users__item nav{
    justify-self: end;
}

.wrapper header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>