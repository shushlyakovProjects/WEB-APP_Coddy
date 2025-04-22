<template>
    <div>
        <main class="wrapper">
            <MenteeCard @closeMenteeCard="selectedMentee = {}" v-if="selectedMentee.Id"
                :selectedMentee="selectedMentee"></MenteeCard>
            <!-- <EditUser @closeUserSettings="isOpenUserSettings = false" @downloadMentees="downloadMentees" v-if="isOpenUserSettings"
                :selectedUser="this.selectedUser"></EditUser> -->

            <header>
                <div>
                    <h2>Список менти</h2>
                    <p>Найдено: {{ MENTEE_LIST.length }}</p>
                </div>

                <div class="filtres-wrapper">
                    <button @click="filterStart()">Применить фильтры</button>
                    <nav class="filtres">

                        <div class="filtres__item">
                            <p class="small">ФИО</p>
                            <input type="text" v-model="filter.fioInclude" placeholder="Содержит...">
                        </div>

                        <label for="filter2" class="filtres__item">
                            <p class="small">Ментор Шушляков Н</p>
                            <input type="checkbox" id="filter2" v-model="filter.menteesOfShushlyakov">
                        </label>

                        <div class="filtres__item">
                            <p class="small">Дней работает </p>
                            <div id="filter3">
                                <input type="text" placeholder="От" maxlength="3" v-model="filter.workDays.min">
                                <input type="text" placeholder="До" maxlength="3" v-model="filter.workDays.max">
                            </div>
                        </div>

                    </nav>
                </div>

            </header>

            <div class="mentee">
                <div class="mentee__item" v-for="(item, index) in MENTEE_LIST" :key="index"
                    @click="this.selectedMentee = item">
                    <div>{{ index + 1 }}.</div>
                    <div>
                        <p>{{ item.LastName }} {{ item.FirstName }}</p>
                    </div>
                    <div>
                        <p>Контакты: {{ item.Phone }}</p>
                        <p>Email: {{ item.EMail }}</p>
                    </div>
                    <div>
                        <p>Работает с: {{ formatDate(item.Created) }}</p>
                        <p>Всего: {{ numberWorkDays(item.Created) }} дней</p>
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
import MenteeCard from './MenteeCard.vue';


export default {
    components: { MenteeCard },
    data() {
        return {
            MENTEE_LIST: [],
            // isOpenAddUser: false,
            // isOpenMenteeCard: false,
            selectedMentee: {},

            filter: {
                // Временный фильтр
                menteesOfShushlyakov: false,
                fioInclude: '',
                workDays: { min: 0, max: 360 }
            }
        }
    },
    async mounted() {
        this.MENTEE_LIST = this.$store.getters.getMenteeList
        console.log(this.MENTEE_LIST.length);
        if (this.MENTEE_LIST.length == 0) {
            await this.$store.dispatch('downloadMentees')
            this.MENTEE_LIST = this.$store.getters.getMenteeList
        }
    },
    methods: {
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
    grid-template-columns: 30px 1fr 2fr 1fr 40px;
    align-items: center;
    overflow-wrap: anywhere;
    gap: 20px;
    transition-duration: 0.3s;
    cursor: pointer;
}

.mentee__item:hover {
    background-color: var(--color_background-4_white);
}

.mentee__item nav {
    justify-self: end;
    display: flex;
    gap: 5px;
}

.filtres-wrapper {
    position: relative;
}

.filtres-wrapper:hover .filtres {
    height: 200px;
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
    display: grid;
    grid-template-columns: repeat(2, 50px);
    gap: 10px;
}
</style>