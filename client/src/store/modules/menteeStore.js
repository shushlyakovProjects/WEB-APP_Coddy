// Хранилище данных о преподавателях на испытательном сроке
import axios from 'axios';

export default {
    actions: {
        async downloadMenteeData(context) {
            this.commit('updateMessageSuccess', { info: 'Загрузка данных...', isReady: false })
            await axios.post('/server/from-mentor/downloadMenteeData')
                .then((result) => { context.commit('updateMenteeList', result.data.MENTEES_LIST) })
                .catch((error) => { context.commit('updateMessageError', error.response.data) })
        },
        async downloadEveryTrialLesson(context, MENTEE_LIST) {
            const IDs_MENTEES_LIST = []
            MENTEE_LIST.forEach((item) => { IDs_MENTEES_LIST.push(item.Id) })
            await axios.post('/server/from-mentor/downloadEveryTrialLesson', { IDs_MENTEES_LIST })
                .then((result) => { context.commit('addTrialLessonsToMenteeList', result.data.TRIALS_LIST) })
                .catch((error) => { context.commit('updateMessageError', error.response.data) })
        },
        async uploadToDataBaseForTracking(context, MENTEE_LIST) {

            let DATALIST_FORTRACKING = []
            this.MENTEE_LIST.forEach((mentee, index) => {
                // Постоянные ученики, Пробные уроки, Завершенные модули
                const { Disciplines, FirstName, LastName, Id } = mentee
                const { CountAllEdUnits, CountConstantUnits, CountTrialUnitsForWeek, CountTrialLessonsForSixMonths } = mentee.InfoEdUnits
                let DATA_FORTRACKING = {
                    Id, LastName, FirstName, Disciplines, CountAllEdUnits,
                    CountConstantUnits, CountTrialUnitsForWeek, CountTrialLessonsForSixMonths
                }
                DATALIST_FORTRACKING.push(DATA_FORTRACKING)
            })

            await axios.post('/server/from-admin/uploadToDataBaseForTracking', { DATALIST_FORTRACKING })
                .then((result) => { this.commit('updateMessageSuccess', result.data) })
                .catch((error) => { this.commit('updateMessageError', error.response.data) })
        },
    },
    mutations: {
        updateMenteeList(state, newData) {
            state.MENTEE_LIST = newData
            this.commit('updateMessageSuccess', { info: 'Данные менти получены успешно!', isReady: true })
        },
        addTrialLessonsToMenteeList(state, TRIALS_LIST) {
            state.MENTEE_LIST.forEach(mentee => {
                mentee.InfoEdUnits.CountTrialLessonsForSixMonths = 0
                if (mentee.Id in TRIALS_LIST) {
                    for (let key in TRIALS_LIST) {
                        if (mentee.Id == key) {
                            mentee.InfoEdUnits.CountTrialLessonsForSixMonths = TRIALS_LIST[key]
                            continue
                        }
                    }
                }
            })
            this.commit('updateMessageSuccess', 'Данные по ПУ за полгода получены!')
            setTimeout(() => { state.messages.success = '' }, 3000)
        },
        updateMessageError(state, info) {
            state.messages.error = info
            setTimeout(() => { state.messages.error = '' }, 3000)
        },
        updateMessageSuccess(state, { info, isReady }) {
            state.messages.success = info
            if (isReady) { setTimeout(() => { state.messages.success = '' }, 3000) }
        }
    },
    state: {
        MENTEE_LIST: [],

        messages: {
            error: '',
            success: ''
        },

        // Временная модель (для фильтра)
        menteesIsNotOfShushlyakov: ['Мосеечева', 'Селезнев', 'Зимарев', 'Халлыев', 'Куликов', 'Каллио', 'Николаева', 'Дудкин',
            'Юдин', 'Петрова', 'Тихонова', 'Валиуллин', 'Бочкарев', 'Рест', 'Саковых', 'Носков', 'Сарычева', 'Почестнев', 'Проданов']
    },
    getters: {
        getMessages(state) { return state.messages },
        getMenteeList(state) { return state.MENTEE_LIST },
        getMenteeListWithFiltres: (state) => (filtres) => {
            const { menteesOfShushlyakov, disciplines, fioInclude, workDays, sortOfEdUnits, sortOfWorkTime } = filtres
            let filtredList = []

            filtredList = state.MENTEE_LIST.filter((elem) => {
                let check1 = menteesOfShushlyakov ? !state.menteesIsNotOfShushlyakov.includes(elem.LastName) : state.menteesIsNotOfShushlyakov.includes(elem.LastName)
                let check2 = `${elem.LastName} ${elem.FirstName}`.includes(fioInclude)

                let workDaysValue = Math.round((new Date() - new Date(elem.Created)) / 1000 / 60 / 60 / 24)
                let check3 = workDaysValue >= workDays.min && workDaysValue <= workDays.max

                let check4 = elem.Disciplines != undefined ? elem.Disciplines.join(', ').includes(disciplines) : true

                return check1 && check2 && check3 && check4
            })

            if (sortOfEdUnits == 'asc') { filtredList.sort((a, b) => a.InfoEdUnits.CountAllEdUnits - b.InfoEdUnits.CountAllEdUnits) }
            if (sortOfEdUnits == 'desc') { filtredList.sort((a, b) => b.InfoEdUnits.CountAllEdUnits - a.InfoEdUnits.CountAllEdUnits) }


            if (sortOfWorkTime == 'asc') {
                filtredList.sort((a, b) => {
                    const date_a = new Date(a.Created)
                    const date_b = new Date(b.Created)
                    const now = new Date()
                    const numberWorkDays_a = Math.round((now - date_a) / 1000 / 60 / 60 / 24)
                    const numberWorkDays_b = Math.round((now - date_b) / 1000 / 60 / 60 / 24)

                    return numberWorkDays_a - numberWorkDays_b
                })
            }
            if (sortOfWorkTime == 'desc') {
                filtredList.sort((a, b) => {
                    const date_a = new Date(a.Created)
                    const date_b = new Date(b.Created)
                    const now = new Date()
                    const numberWorkDays_a = Math.round((now - date_a) / 1000 / 60 / 60 / 24)
                    const numberWorkDays_b = Math.round((now - date_b) / 1000 / 60 / 60 / 24)

                    return numberWorkDays_b - numberWorkDays_a
                })
            }

            // console.log(filtredList);

            return filtredList
        },
        getMenteeListOnlyShushlyakov(state) {
            const MenteeListOnlyShushlyakov = state.MENTEE_LIST.filter((mentee) => {
                return !state.menteesIsNotOfShushlyakov.includes(mentee.LastName)
            })
            return MenteeListOnlyShushlyakov
        }
    }
}