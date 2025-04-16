<template>
    <div class="wrapper">
        <div class="window">
            <h2>Регистрация администратора</h2>

            <form @submit.prevent="registration">
                <p class="small">Фамилия</p>
                <input type="text" placeholder="Укажите вашу фамилию" v-model="dataOfUser.last_name" required>
                <p class="small">Имя</p>
                <input type="text" placeholder="Укажите ваше имя" v-model="dataOfUser.first_name" required>
                <p class="small">Номер телефона</p>
                <input type="text" placeholder="Укажите номер телефона" v-model="dataOfUser.phone_number" required>
                <p class="small">Почта</p>
                <input type="text" placeholder="Укажите электронную почту" v-model="dataOfUser.email" required>
                <p class="small">Пароль</p>
                <input type="password" placeholder="Укажите пароль" v-model="dataOfUser.password" required>
                <p class="small">Подтвердите пароль</p>
                <input type="password" placeholder="Укажите пароль повторно" v-model="checkPassword" required>


                <input type="submit" value="Регистрация">
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
                password: '',
                phone_number: '',
                first_name: '',
                last_name: '',
            },
            messages: {
                error: '',
                success: ''
            },

            checkPassword: ''
        }
    },
    methods: {
        async registration() {
            if (this.dataOfUser.password == this.checkPassword) {

                await axios.post('/server/registration', this.dataOfUser)
                    .then((result) => {
                        console.log(result);
                        this.messages.error = ''
                        this.messages.success = result.data
                        this.$router.push('/auth')
                    })
                    .catch((error) => {
                        this.messages.success = ''
                        if (error.status == 403) {
                            this.messages.error = error.response.data
                        } else {
                            console.log(error);
                            this.messages.error = 'Ошибка базы данных'
                        }
                    })
            } else {
                this.messages.error = 'Пароли не совпадают'
            }

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