<template>
    <div class="menteeCard" @click="closeMenteeCard">

        <main class="wrapper">

            <header>
                <h2>Просмотр карточки менти</h2>
                <nav>
                    <a :href='`https://coddy.t8s.ru/Profile/${selectedMentee.Id}`' title="Открыть CRM пользователя"
                        target="_blank">
                        <img class="icon" src="../../../public/img/CRM_profile.svg" alt="CRM">
                    </a>
                    <img class="icon" src="../../../public/img/close.svg" alt="Закрыть" title="Закрыть карточку"
                        @click="closeMenteeCard">
                </nav>

            </header>

            <!-- {{ selectedMentee }} -->

            <div class="fields">
                <div class="fields__item">

                    <div class="avatar">
                        <img :src="selectedMentee.hasOwnProperty('PhotoUrls') ?
                            'https://coddy.t8s.ru/' + selectedMentee.PhotoUrls[1] :
                            'https://coddy.t8s.ru/Content/themes/nwds/Images/no-photo-150x150.png'" alt="Аватар">
                    </div>
                    <div class="fio">
                        <h2>{{ selectedMentee.LastName }} {{ selectedMentee.FirstName }} {{ selectedMentee.MiddleName }}
                        </h2>
                    </div>
                    <div class="status">
                        <p class="small">ID: {{ selectedMentee.Id }}</p>
                        <p class="small">Статус: {{ selectedMentee.Status }}</p>
                        <p class="small">Работает с: {{ formatDate(selectedMentee.Created) }}</p>
                        <p class="small">Всего дней: {{ numberWorkDays(selectedMentee.Created) }}</p>
                    </div>
                    <div class="general">
                        <div class="general__part1">
                            <p class="small">Контактный номер: {{ selectedMentee.Mobile }}</p>
                            <p class="small">Email: {{ selectedMentee.EMail }}</p>
                        </div>
                        <div class="general_part2">
                            <p class="small">Адрес проживания: {{ selectedMentee.Address }}</p>
                            <p class="small">Образование/Работа: {{ selectedMentee.JobOrStudyPlace }} {{
                                selectedMentee.Position }}</p>
                        </div>
                    </div>

                </div>
            </div>

        </main>

    </div>
</template>

<script>
export default {
    props: ['selectedMentee'],
    data() {
        return {
            messages: {
                error: '',
                success: ''
            }
        }
    },
    mounted() {
        window.addEventListener('keydown', this.closeMenteeCard, { once: true })
    },
    methods: {
        closeMenteeCard(event) {
            if (event.key == 'Escape' || event.target.classList[0] == 'menteeCard' || event.target.alt == 'Закрыть') {
                this.$emit('closeMenteeCard');
                window.removeEventListener('keydown', this.closeMenteeCard, { once: true })
            }
        },
        formatDate(origDate) {
            const date = new Date(origDate)
            const day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate()
            const month = (date.getMonth() < 10) ? '0' + date.getMonth() : date.getMonth()
            const year = date.getFullYear()
            return `${day}.${month}.${year}`
        },
        numberWorkDays(origDate) {
            const date = new Date(origDate)
            const now = new Date()
            const numberWorkDays = Math.round((now - date) / 1000 / 60 / 60 / 24)
            return numberWorkDays
        },
    },

}
</script>

<style scoped>
@import url(settings.css);

.menteeCard {
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

.wrapper {
    max-height: 600px;
}
nav{
    display: flex;
    gap: 10px;
}
.fields__item {
    display: grid;
    grid-template: auto auto auto / auto 40vw;
    grid-template-areas:
        'avatar fio'
        'avatar general'
        'status general'
    ;
    gap: 10px;
    height: 100%;
}


.fields__item>div {
    padding: 10px;
    background-color: var(--color_background-3_white);
    border-radius: 10px;
}

.avatar {
    grid-area: avatar;
    padding: 0 !important;
    background-color: transparent !important;
    display: flex;
    justify-content: center;
}

.avatar img {
    border-radius: 10px;
    width: 200px;
    height: 200px;
    object-fit: contain;
}

.fio {
    grid-area: fio;
}

.status {
    grid-area: status;
}

.general {
    grid-area: general;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.general_part2 {
    max-height: 200px;
}
</style>