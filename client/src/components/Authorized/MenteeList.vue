<template>
    <div>
        <main class="wrapper">
            <MenteeCard @closeMenteeCard="selectedMentee = {}" v-if="selectedMentee.Id"
                :selectedMentee="selectedMentee"></MenteeCard>

            <transition name="notification">
                <article class="notification" v-if="messages.error || messages.success">
                    <p>🔔 Результат</p>
                    <p class="small errorMessage">{{ messages.error }}</p>
                    <p class="small successMessage">{{ messages.success }}</p>
                </article>
            </transition>


            <header>
                <div>
                    <h2>Список менти</h2>
                    <p>Найдено: {{ MENTEE_LIST.length }}</p>
                </div>

                <nav>
                    <div class="filtres-wrapper">
                        <img @click="getMentees()" class="likeButton icon" src="../../../public/img/delete.svg"
                            title="Отменить фильтрацию" alt="Отмена">
                        <button title="Настройка фильтров" @click="filterStart()">Применить фильтры</button>
                        <div class="filtres">

                            <div class="filtres__item">
                                <p class="small">ФИО</p>
                                <input type="text" v-model="filter.fioInclude" placeholder="Содержит...">
                            </div>

                            <div class="filtres__item">
                                <p class="small">Дисциплины</p>
                                <input type="text" v-model="filter.disciplines" placeholder="Преподает...">
                            </div>

                            <div class="filtres__item">
                                <p class="small">Количество учеников </p>
                                <div id="filter3">
                                    <label for="filter3_asc">↗️<input id="filter3_asc" type="radio" value="asc"
                                            name="sortOfEdUnits" v-model="filter.sortOfEdUnits"></label>
                                    <label for="filter3_desc">↘️<input id="filter3_desc" type="radio" value="desc"
                                            name="sortOfEdUnits" v-model="filter.sortOfEdUnits"></label>
                                </div>
                            </div>

                            <div class="filtres__item">
                                <p class="small">Дней работает </p>
                                <div id="filter4">
                                    <input type="text" placeholder="От" maxlength="3" v-model="filter.workDays.min">
                                    <input type="text" placeholder="До" maxlength="3" v-model="filter.workDays.max">
                                </div>
                            </div>

                            <label for="filter5" class="filtres__item">
                                <p class="small">Ментор Шушляков Н</p>
                                <input type="checkbox" id="filter5" v-model="filter.menteesOfShushlyakov">
                            </label>

                        </div>
                    </div>
                    <button @click="uploadToDataBaseForTracking()"
                        title="Отслеживать динамику с текущего момента">Загрузить в базу</button>
                </nav>

            </header>

            <div class="mentee">
                <div class="mentee__item" v-for="(item, index) in MENTEE_LIST" :key="index"
                    @click="this.selectedMentee = item">
                    <div>{{ index + 1 }}.</div>
                    <div>
                        <p>{{ item.LastName }}</p>
                        <p>{{ item.FirstName }}</p>
                    </div>
                    <div>
                        <p>Контакты: {{ item.Phone }}</p>
                        <p>Email: {{ item.EMail }}</p>
                    </div>
                    <div>
                        <p>Занятий за неделю: {{ item.InfoEdUnits.countAllEdUnits }}</p>
                        <p>Постоянных учеников: {{ item.InfoEdUnits.countConstantUnits }}</p>
                        <p>Пробников: {{ item.InfoEdUnits.countTrialUnits }}</p>
                    </div>
                    <div>
                        <p>Работает с: {{ formatDate(item.Created) }}</p>
                        <p>Всего: {{ numberWorkDays(item.Created) }} дней</p>
                        <p>Дисциплин: {{ item.Disciplines.length }}</p>
                    </div>
                    <nav>
                        <p class="errorMessage"
                            v-show="!item.hasOwnProperty('PhotoUrls') || !item.hasOwnProperty('JobOrStudyPlace')"
                            title="Отсутсвуют необходимые данные">❗️</p>

                        <a :href='`https://coddy.t8s.ru/Profile/${item.Id}`' title="Открыть CRM пользователя"
                            target="_blank">
                            <img class="icon" src="../../../public/img/CRM_profile.svg" alt="CRM">
                        </a>

                    </nav>
                </div>

                <div class="loading" v-if="!MENTEE_LIST.length"></div>
            </div>

        </main>
    </div>
</template>

<script>
import axios from 'axios';
import MenteeCard from './MenteeCard.vue';


export default {
    components: { MenteeCard },
    data() {
        return {
            MENTEE_LIST: [],
            selectedMentee: {},

            filter: {
                menteesOfShushlyakov: false, // Временный фильтр
                disciplines: '',
                fioInclude: '',
                gender: '',
                sortOfEdUnits: '', // asc - desc
                workDays: { min: 0, max: 360 }
            },
            messages: {
                error: '',
                success: ''
            }
        }
    },
    mounted() {
        this.getMentees()
    },
    methods: {
        async uploadToDataBaseForTracking() {
            await this.getMentees()

            let DATALIST_FORTRACKING = []

            this.MENTEE_LIST.forEach((mentee, index) => {
                // Постоянные ученики, Пробные уроки, Завершенные модули
                const { Disciplines, FirstName, LastName, Id, CountAllEdUnits, CountConstantUnits, CountTrialUnits } = mentee
                let DATA_FORTRACKING = { Id, LastName, FirstName, Disciplines, CountAllEdUnits, CountConstantUnits, CountTrialUnits }
                DATALIST_FORTRACKING.push(DATA_FORTRACKING)
                // console.log(DATA_FORTRACKING);
            })
            // console.log(DATALIST_FORTRACKING.length);

            await axios.post('/server/from-admin/uploadToDataBaseForTracking', { DATALIST_FORTRACKING })
                .then((result) => { this.messages.success = result.data })
                .catch((error) => { this.messages.error = error.response.data })

            setTimeout(() => { this.messages = { error: '', success: '' } }, 3000)
        },
        async getMentees() {
            this.filter = { menteesOfShushlyakov: false, disciplines: '', fioInclude: '', gender: '', sortOfEdUnits: '', workDays: { min: 0, max: 360 } }
            this.MENTEE_LIST = this.$store.getters.getMenteeList
            if (this.MENTEE_LIST.length == 0) {
                await this.$store.dispatch('downloadMentees')
                this.MENTEE_LIST = this.$store.getters.getMenteeList
            }
        },
        filterStart() {
            this.MENTEE_LIST = this.$store.getters.getMenteeListWithFiltres(this.filter)
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
header nav {
    display: flex;
    gap: 10px;
}

.mentee {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
}

.mentee__item {
    border-radius: 10px;
    border: 1px solid var(--color_accent_gray);
    padding: 10px;
    display: grid;
    grid-template-columns: 30px 1fr 2fr 2fr 2fr 50px;
    align-items: center;
    overflow-wrap: anywhere;
    gap: 20px;
    transition-duration: 0.3s;
    cursor: pointer;
}

.mentee__item nav {
    display: flex;
    justify-content: end;
    gap: 3px;
}

.mentee__item:hover {
    background-color: var(--color_background-4_white);
}

.filtres-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.filtres-wrapper button {
    z-index: 5;
}

.likeButton {
    margin-top: 10px;
    margin-right: 10px;
    padding: 3px;
    transform: translate(30px);
    opacity: 0;
    transition-duration: 0.3s;
}

.filtres-wrapper:hover .filtres {
    height: 300px;
}

.filtres-wrapper:hover .likeButton {
    transform: translate(0);
    opacity: 1;
}


.filtres {
    position: absolute;
    background-color: var(--color_background-4_white);
    box-shadow: 0 0 3px var(--color_accent_darkBlue);
    color: var(--color_accent_darkBlue);
    z-index: 5;
    display: flex;
    flex-direction: column;

    right: 0;
    top: 100%;

    border-radius: 10px 0 10px 10px;
    overflow: hidden;
    transition-duration: 0.5s;
    width: 30vw;
    height: 0;
}

.filtres__item {
    display: grid;
    grid-template-columns: 1fr auto;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border: 1px solid var(--color_background-2_white);
    border-radius: 10px;
    margin: 5px;
}

.wrapper header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#filter3 {
    display: flex;
    gap: 10px;
}

#filter4 {
    display: grid;
    grid-template-columns: repeat(2, 50px);
    gap: 10px;
}
</style>