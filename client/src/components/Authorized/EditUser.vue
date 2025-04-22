<template>
    <div class="userSettings" @click="closeUserSettings">

        <main class="wrapper">

            <header>
                <h2>Редактирование <br> пользователя</h2>
                <img class="icon" src="../../../public/img/close.svg" alt="Закрыть" title="Закрыть настройки"
                    @click="closeUserSettings">
            </header>

            <form class="fields" @submit.prevent="editUser">
                <div class="fields__item">
                    <p>Email</p>
                    <input type="email" placeholder="Укажите email" v-model="infoSelectedUser.email">
                </div>
                <div class="fields__item">
                    <p>Пароль</p>
                    <input type="text" placeholder="Укажите пароль" v-model="infoSelectedUser.password">
                </div>
                <div class="fields__item">
                    <p>Номер телефона</p>
                    <input type="text" placeholder="Укажите номер телефона" v-model="infoSelectedUser.phone_number">
                </div>
                <div class="fields__item">
                    <p>Имя</p>
                    <input type="text" placeholder="Укажите имя" v-model="infoSelectedUser.first_name">
                </div>
                <div class="fields__item">
                    <p>Фамилия</p>
                    <input type="text" placeholder="Укажите фамилию" v-model="infoSelectedUser.last_name">
                </div>
                <div class="fields__item">
                    <p>Роль</p>
                    <select placeholder="Укажите роль" v-model="infoSelectedUser.role">
                        <option value="admin">Администратор</option>
                        <option value="moderator">Модератор</option>
                    </select>
                </div>

                <input type="submit" value="Обновить пользователя">
                <p class="small errorMessage">{{ messages.error }}</p>
                <p class="small successMessage">{{ messages.success }}</p>
            </form>

        </main>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['selectedUser'],
    data() {
        return {
            infoSelectedUser: {
                email: '',
                password: '',
                phone_number: '',
                first_name: '',
                last_name: '',
                role: ''
            },
            hiddenFields: ['user_id'],
            messages: {
                error: '',
                success: ''
            }
        }
    },
    mounted() {
        window.addEventListener('keydown', this.closeUserSettings, { once: true })
        this.getFieldsCurrentUser()
    },
    methods: {
        closeUserSettings(event) {
            if (event.key == 'Escape' || event.target.classList[0] == 'userSettings' || event.target.alt == 'Закрыть') {
                this.$emit('closeUserSettings');
                window.removeEventListener('keydown', this.closeUserSettings, { once: true })
            }
        },
        getFieldsCurrentUser() {
            for (let key in this.selectedUser) {
                if (key == 'password') {
                    this.infoSelectedUser[key] = ''
                }
                else if (this.hiddenFields.indexOf(key) == -1) {
                    this.infoSelectedUser[key] = this.selectedUser[key]
                }
            }
        },
        async editUser() {
            this.infoSelectedUser.user_id = this.selectedUser.user_id
            await axios.post('/server/from-admin/edit-user', this.infoSelectedUser)
                .then((result) => {
                    this.messages.error = ''
                    this.messages.success = 'Успешно'
                    this.$emit('closeUserSettings');
                    this.$emit('downloadUsers')
                    this.$store.dispatch('checkAuthorization', this.$router)
                })
                .catch((error) => {
                    console.log(error);
                    this.messages.error = error.response.data
                    this.messages.success = ''
                })
        }
    },

}
</script>

<style scoped>
@import url(settings.css);

.userSettings {
    position: fixed;
    z-index: 10;

    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    background-color: var(--color_background-5_grayTransparent);
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(3px);
}
</style>