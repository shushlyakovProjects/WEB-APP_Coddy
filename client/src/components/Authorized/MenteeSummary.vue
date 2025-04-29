<template>
    <div>
        <main class="wrapper">

            <transition name="notification">
                <article class="notification" v-if="messages.error || messages.success">
                    <p>🔔 Уведомление</p>
                    <p class="small errorMessage">{{ messages.error }}</p>
                    <p class="small successMessage">{{ messages.success }}</p>
                </article>
            </transition>

            <header ref="summary_header">
                <div>
                    <h2>Сводка (Ментор = Шушляков Н)</h2>
                    <p>Прошла сводка: {{ getPreviousSummary.DateOfUpdate }}</p>
                </div>

                <nav>
                    <button @click="uploadToDataBaseForSummary()">Загрузить в базу</button>
                </nav>
            </header>

            <div class="summary_wrapper">
                <div class="summary__card">
                    <p>Всего менти на данный момент: {{ fields.countOfMentee }}</p>
                </div>

                <div class="summary__card">
                    <h3>С последней загрузки</h3>
                    <p>Менти новых: {{ getDifference(getPreviousSummary.CountOfMentee, fields.countOfMentee) }}</p>
                    <p>Менти исключено: НУЖНО СРАВНИВАТЬ текущих менти с тем, КТО ОТСУТСВУЕТ С ПРОШЛОЙ ЗАГРУЗКИ В
                        ТАБЛИЦУ mentees</p>
                    <p>Получено учеников: {{ fields.countOfNewEdUnits - getPreviousSummary.СountOfNewEdUnits }}</p>
                    <p>Проведено пробников: {{ fields.countOfNewTrials - getPreviousSummary.СountOfNewTrials }}</p>
                </div>

                <div class="summary__card">
                    <h3>Количество менти</h3>
                    <p>С постоянными учениками: {{ fields.countOfMenteeWithConstantUnits }}</p>
                    <p>Без постоянных учеников: {{ fields.countOfMenteeWithoutConstantUnits }}</p>
                    <p>Получили постоянных учеников: {{ getPreviousSummary.CountOfMenteeWithConstantUnits -
                        fields.countOfMenteeWithConstantUnits}}
                    </p>
                    <p>Занятых: {{ (fields.countOfMenteeWithConstantUnits / fields.countOfMentee * 100).toFixed(2) }}%
                    </p>
                </div>

                <div class="summary_before">
                    <h3>Дополнительно</h3>
                    <p>Всего постоянных учеников: {{ fields.countOfConstantUnits }}</p>
                    <p>Всего отправлено модулей на проверку: {{ fields.countOfPaidModules }}</p>
                    <P>Отправлено модулей на прошлую неделю: {{ getPreviousSummary.CountOfPaidModules }}</P>

                </div>

            </div>

        </main>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            // MENTEE_LIST: [],

            fields: {
                countOfMentee: 0,

                countOfNewMentee: 0,
                countOfNewEdUnits: 0,
                countOfNewTrials: 0,

                countOfMenteeWithConstantUnits: 0,
                countOfMenteeWithoutConstantUnits: 0,

                countOfConstantUnits: 0,
                countOfPaidModules: 0,
            },

            messages: {
                error: '',
                success: ''
            }
        }
    },
    mounted() {
        this.getMenteeData()
        this.updateFields()
        this.getSummaryFromDataBase()
    },
    computed: { ...mapGetters(['getMenteeListOnlyShushlyakov', 'getMessages', 'getPreviousSummary']) },
    watch: {
        getMenteeListOnlyShushlyakov() { this.updateFields() },
        getMessages: { handler() { this.messages = this.getMessages }, deep: true }
    },
    methods: {
        getSummaryFromDataBase() {
            this.$store.dispatch('downloadSummaryFromDataBase')
        },
        uploadToDataBaseForSummary() {
            const { countOfMentee, countOfNewEdUnits, countOfNewTrials, countOfMenteeWithConstantUnits, countOfConstantUnits, countOfPaidModules } = this.fields
            const data = { countOfMentee, countOfNewEdUnits, countOfNewTrials, countOfMenteeWithConstantUnits, countOfConstantUnits, countOfPaidModules }
            this.$store.dispatch('uploadToDataBaseForSummary', data)
        },
        updateFields() {
            const LIST = this.getMenteeListOnlyShushlyakov
            this.fields.countOfMentee = LIST.length

            // this.fields.countOfNewMentee = 0
            // this.fields.countOfNewEdUnits = 0

            this.fields.countOfConstantUnits = 0
            this.fields.countOfNewTrials = 0

            LIST.forEach(mentee => {
                this.fields.countOfConstantUnits += mentee.InfoEdUnits.CountConstantUnits
                this.fields.countOfNewTrials += mentee.InfoEdUnits.CountTrialUnitsForWeek

                if (mentee.InfoEdUnits.CountConstantUnits > 0) {
                    this.fields.countOfMenteeWithConstantUnits++
                } else {
                    this.fields.countOfMenteeWithoutConstantUnits++
                }
                // console.log(mentee);

            });

            // ПОЛУЧАТЬ ИНФОРМАЦИЮ С GOOGLE TABLE
            // this.fields.countOfPaidModules = 0

        },
        async getMenteeData() {
            if (this.getMenteeListOnlyShushlyakov.length == 0) { await this.$store.dispatch('downloadMenteeData') }
        },
        getDifference(oldVal = 0, newVal = 0) {
            return (newVal - oldVal) >= 0 ? '+' + (newVal - oldVal) : (newVal - oldVal)
        },
    },
}
</script>

<style scoped>
.wrapper header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.summary_wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>