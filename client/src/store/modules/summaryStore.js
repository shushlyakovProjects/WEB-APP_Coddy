// Основное хранилище
import axios from 'axios';

export default {
    actions: {
        async downloadSummaryFromDataBase(context) {
            context.commit('updateMessageSuccess', { info: 'Загрузка предыдущей сводки...', isReady: false })
            await axios.post('/server/from-mentor/downloadSummaryFromDataBase')
                .then((result) => { context.commit('updatePreviousSummary', result.data) })
                .catch((error) => { console.log(error); context.commit('updateMessageError', error.response.data) })
        },
        async uploadToDataBaseForSummary(context, data) {
            context.commit('updateMessageSuccess', { info: 'Отправка сводки в базу...', isReady: false })
            await axios.post('/server/from-admin/uploadToDataBaseForSummary', { data })
                .then((result) => { context.commit('updateMessageSuccess', { info: 'Сводка загружена в базу успешно!', isReady: true }) })
                .catch((error) => { context.commit('updateMessageError', error.response.data) })
        },
    },
    mutations: {
        updatePreviousSummary(state, newInfo) {
            state.PREVIOUS_SUMMARY = newInfo[0]
            this.commit('updateMessageSuccess', { info: 'Информация получена!', isReady: true })
        },
        updateMessageError(state, info) {
            this.commit('updateMessageSuccess', { info: '', isReady: true })
            state.messages.error = info
            setTimeout(() => { state.messages.error = '' }, 3000)
        },
        updateMessageSuccess(state, { info, isReady }) {
            state.messages.success = info
            if (isReady) { setTimeout(() => { state.messages.success = '' }, 3000) }
        }
    },
    state: {
        PREVIOUS_SUMMARY: [],

        messages: {
            error: '',
            success: ''
        },
    },
    getters: {
        getPreviousSummary(state) {
            return state.PREVIOUS_SUMMARY
        }
    }
}