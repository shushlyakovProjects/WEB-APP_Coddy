<template>
    <div class="wrapper">
        <div class="window">
            <h2>Ментор CODDY</h2>

            <form @submit.prevent="authorization">
                <p class="small">Электронная почта</p>
                <input type="text" placeholder="Укажите email" v-model="dataOfUser.email" required>
                <p class="small">Пароль</p>
                <input type="password" placeholder="Укажите пароль" v-model="dataOfUser.password" required>

                <input type="submit" value="Авторизация">
            </form>

            <p class="small errorMessage">{{ messages.error }}</p>
            <p class="small successMessage">{{ messages.success }}</p>

        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            dataOfUser: {
                email: '',
                password: ''
            },
            messages: {
                error: '',
                success: ''
            }
        }
    },
    methods: {
        async authorization() {
            await axios.post('/server/authorization', this.dataOfUser)
                .then((result) => {
                    this.messages.error = ''
                    this.messages.success = 'Успешно'
                    this.$router.push('/mentor/lk')
                })
                .catch((error) => {
                    console.log(error);
                    this.messages.error = error.response.data
                    this.messages.success = ''
                })
        },
    },
}
</script>

<style scoped>
h2 {
    text-align: center;
    color: var(--color_accent_darkBlue);
    margin-bottom: 30px;
}

.wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.window {
    min-width: 500px;
    height: auto;
    box-shadow: 0 0 3px var(--color_accent_darkBlue);
    background-color: var(--color_background-1_white);
    border-radius: 10px;
    padding: 30px 60px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

input:not([type='submit']) {
    background-color: var(--color_background-3_white);
}
</style>