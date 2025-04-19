<template>
    <div>
        <main>
            <h2>Список пользователей приложения</h2>

            <div class="users">
                <div class="users__item" v-for="(item, index) in USERS_LIST" :key="index">
                    <p>Фамилия: {{ item.last_name }}</p>
                    <p>Имя: {{ item.first_name }}</p>
                    <p>Контакты: {{ item.phone_number }}</p>
                    <p>Статус: {{ item.role }}</p>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            USERS_LIST: [
                { last_name: 'Иванов', first_name: 'Иван', phone_number: '89998887766', role: 'moderator' },
                { last_name: 'Иванов', first_name: 'Иван', phone_number: '89998887766', role: 'moderator' },
                { last_name: 'Иванов', first_name: 'Иван', phone_number: '89998887766', role: 'moderator' },
                { last_name: 'Иванов', first_name: 'Иван', phone_number: '89998887766', role: 'moderator' },
            ]
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
    grid-template: repeat(2, 40px) / repeat(4, 1fr);
}
</style>