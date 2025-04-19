// Хранилище администратора
import axios from 'axios';

export default {
    actions: {
        async checkAuthorization(context, router) {
            console.log('Проверка авторизации');

            await axios.post('/server/authorization')
                .then((result) => {
                    // console.log(result);
                    context.commit('updateCurrentUser', result.data[0])
                })
                .catch((error) => {
                    console.log(error);
                    document.cookie = 'ACCESS_TOKEN = ; max-age=-1 ; path=/'
                    context.commit('updateCurrentUser', {})
                    router.push('/auth')
                })
        }
    },
    mutations: {
        updateCurrentUser(state, result) {
            state.CURRENT_USER = result
        }
    },
    state: {
        CURRENT_USER: {}
    },
    getters: {
        getCurrentUser(state) {
            return state.CURRENT_USER
        }
    }
}